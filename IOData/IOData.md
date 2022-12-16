
## ["IO", "Data >", " #{"String Interpolation "}", "& concat!"] |> IO.puts()
## => "IOData > String Interpolation & concat!"
The above lines might be a little confusing at first, especially if you’ve never dealt with IOData, but alas fear not, IOData might become one of your new favorite data types after reading this. IOData is a data type that can be used as a more efficient alternative to binaries especially when you need to concat or string interpolate pieces of data.

In order to truly grasp the benefits of IOData, we must be familiar with the idea of immutability, without understanding that first a lot of this article might not make too much sense. So lets first start off with some prerequisites that will make life in Elixir land a little easier, if you’re familiar with these concepts feel free to skip ahead.



# Prerequisites

- Mindset: Instead of asking “How to do X in Elixir?”, ask “How to solve Y in Elixir?”. In other words, don’t ask how to implement a particular solution, instead describe the problem at hand. Stating the problem gives more context and less bias for a correct answer.
- [Immutability In Elixir]([https://www.example.com](https://darioghilardi.com/immutability-in-elixir/))
- Terms
    - Bytes: are integers in range 0..255
    - Unicode: are integers in the range 0..0x10FFFF i.e. 0..17825776

- “String” == “Binary”

    - We’ll be using the terms binary and string interchangeably during this article, reason being that in Elixir strings are referred too as binaries but I understand if you’re new to Elixir the term binary might throw you off but think of it as it being a “string” in Elixir land. 

Biggest take away from the prerequisites should be the understanding that in order to deal with the fact that **data is immutable in Elixir**, and knowing we’re inevitably gonna need to manipulate data, how do we solve the immutability problem in Elixir? Well it’s pretty simple, we make copies of the data and manipulate that, but that solution comes at a cost, and the cost we pay is time and memory.

# Why IOData Should Be In Your Toolkit
```[?h, "el", ["l", [?o]], ”, I’m ”, "a IOList"]```

IOData exists because often you need to do many append operations on smaller chunks of binaries in order to create a bigger binary. However, **in Erlang and Elixir concatenating binaries will copy the concatenated binaries into a new binary**. This is a important thing to keep in mind. 

**The main use for IOData is to avoid unnecessary memory allocation and copying.** Let’s say you want to output a email, “#{username}@email.com” … well, you could create the whole string first and pass that to IO.puts which would then send the bytes on their way: 
```
IO.puts(username <> “@email.com”)
=> “username@gmail.com"
```
But **this is going to allocate memory for the whole binary**, copying the bytes from the literal and the contents of the user variable.  IO.puts/1 will then copy that out to some destination (e.g. the console). Seems wasteful from a memory point of view. It would be nice if you could just skip the intermediate allocation and copying. 

Well, that’s the point of IOData:
```
IO.puts [username, “@email”]
=> “username@gmail.com"
```
The output is the same in both cases, but **there is not intermediate allocation/copy of memory when using IOData!** IO.puts just pulls each item from the IOList passed to it and spits it straight out to console one chunk after the other. Much faster, and less memory used, with a bit of a caveat The speed improvement will be negligible if you’re just doing it once. If you do it a lot like on a webserver, then it will be faster. This is awesome for templating: **create an IOList of all the static strings with the variables at the right place, and then when you render the template the only copying needed is to the destination (file, socket, etc.).** Keep in mind that binaries can be shared in the BEAM transparently, and suddenly your templates, regardless of where they are called from, will often be sharing the bulk of their memory used for those static strings, even though the end output is customized with the interspersed variables. 

Phoenix uses this trick, and is one of the reasons it can be so fast. A lot of Elixir/Erlang functions and APIs accept IOData for this reason …
```
def email(username, domain) do
  username <> "@" <> domain
end
```
In this function, creating the email address will copy the username and domain binaries. Now imagine you want to use the resulting email inside another binary:
```
def welcome_message(name, username, domain) do
  "Welcome #{name}, your email is: #{email(username, domain)}"
end


IO.puts(welcome_message("Meg", "meg", "example.com"))
#=> "Welcome Meg, your email is: meg@example.com"
```
**Every time you concatenate binaries or use interpolation (#{}) you are making copies of those binaries.** However, in many cases you don't need the complete binary while you create it, but only at the end to print it out or send it somewhere. In such cases, you can construct the binary by creating IOData:
```
def email(username, domain) do
  [username, ?@, domain]
end

def welcome_message(name, username, domain) do
  ["Welcome ", name, ", your email is: ", email(username, domain)]
end

IO.puts(welcome_message("Meg", "meg", "example.com"))
#=> "Welcome Meg, your email is: meg@example.com"
```
Building IO data is cheaper than concatenating binaries. Concatenating multiple pieces of IOData just means putting them together inside a list since IOData can be arbitrarily nested, and that's a cheap and efficient operation. **Most of the IO-based APIs, such as :gen_tcp and IO, receive IOData** and write it to the socket directly without converting it to binary.

One drawback of IO data is that you can't do things like pattern match on the first part of a piece of IO data like you can with a binary, because you usually don't know the shape of the IO data. In those cases, you may need to convert it to a binary by calling iodata_to_binary/1, which is reasonably efficient since it's implemented natively in C. Other functionality, like computing the length of IO data, can be computed directly on the iodata by calling iodata_length/1.

We’re all familiar with the task of either combining binaries/strings via concat, inserting data into a binary via string interpolation, we wouldn’t be able to do some fundamental things if we couldn’t manipulate strings. 

### Nerves Specific Use Case: Circuits.I2C

The Circuits.I2C module is another place were IOData is commonly utilized, specifically Circuits.I2C.write/4, we know this by checking the type spec for the function. 

### Circuits.I2C.write(i2c_bus, address, data, opts \\ [])
@spec write(bus(), address(), iodata(), [opt()]) :: :ok | {:error, term()}

Notice how the 3rd argument for the write function accepts IOData. When writing data to your hardware we often use templates, and sometimes we need to manipulate the data before we write.
```
def write_to_board(first_binary, second_binary) do 
  data = first_binary <> “ “ <> second_binary
  Circuits.I2C.write(@bus, @address, data) 
  # …
end
```
We see we’re using concat above but we know there’s a better, faster way. We can use IOData like in the following example.
```
def write_to_board(first_binary, second_binary) do 
  Circuits.I2C.write(@bus, @address, [first_binary, “ “, second_binary]) 
  # …
end
```
If you look through the code in many Nerves libraries, the code in the example above us a common pattern you’ll see.

# Chardata
Now to move onto the next useful datatype Chardata! Erlang and Elixir also have the idea of chardata/0. Chardata is very similar to IO data: the only difference is that integers in IO data represent bytes while integers in chardata represent Unicode code points. 

### This means it can support Emojis.

Sometimes we might want to personalize our output with something other than text, emojis have become a part of our world and they can be useful for conveying meaning. And luckily we can use chordata to use emojis in our messages when needed. Here are a couple examples below. 
```
IO.puts(["This is a example of using chardata ", [129302]])              
=> This is a example of using chardata 🤖

IO.puts(["This is a example of using chardata “, 🤖])              
=> This is a example of using chardata 🤖
```
A common gotcha to be aware of is a argument error when using certain functions. The IO module provides the chardata_to_string/1 function for chardata as the "counter-part" of the iodata_to_binary/1 function for IO data. If you try to use iodata_to_binary/1 on chardata, it will result in an argument error. For example, let's try to put a code point that is not representable with one byte, like ?π, inside IO data:

```
IO.iodata_to_binary(["The symbol for pi is: ", ?π])
=> ** (ArgumentError) argument error
```

If we use chardata instead, it will work as expected:

IO.chardata_to_string(["The symbol for pi is: ", ?π])
=> "The symbol for pi is: π”
This seems pretty awesome, but where can you start using Chardata, well a good place might be with your Log Messages. Before we show some examples tho lets introduce a new data type, ANSIData!

# ANSIData

Elixir provides us the functionality to render ANSI escape sequences. ANSI escape sequences are characters embedded in text used to control formatting, color, and other output options on video text terminals. 

### Better Logs Using Chardata And ANSIData. 

The following most likely looks familiar, it’s a common pattern we use with the Logger Module, we create a message, and use string interpolation to complete the message.

The IO.ANSI Module is a tool we can use to help further customize your log messages, this lets you play with the color of your terminal. 

Logger already uses some Ansidata to color your error messages red, but sometimes you don’t wanna read through a sea of red you might need some data to stand out more we can use a combination of Chardata and ANSIData to accomplish this. 
```
# … This is a typical log message, you’re deleting a record and want a log to express that.

def delete_user(user) do 
  Logger.info("Deleting user from the system: #{inspect(user)}") 
  # …
end
```
Logger is pretty useful, especially when we need to log error messages. But sometimes we may want certain messages to stand out, we can use a combination of ANSIData, Chardata, and IOData to do this. 

In this message we have added Stop Sign to the beginning of the message and have colored the user white to stand out from all the red text.
```
def delete_user(user) do 
  Logger.error([[128721], “ Failed To Delete: “, IO.ANSI.white, inspect(user)]) 
end
```
Alloy Access > 2022/11/23 > [IOData, CharData, ANSIData] - The Best Data Types for Moving Data to People and Machines > Screen Shot 2022-11-23 at 11.20.48 AM.png

This is just one example of how you can utilize Chardata and ANSI in your applications, but the possibilities are endless. 

If you’d like to explore IOData abit more, I recommend playing around with this hex package.

IO Wrap

It creates a sigil macro that takes a string with embedded interpolations and makes it into IOData.

# In Conclusion

These datatypes can be pretty useful, not only can they help bring personality and expression to your code, they can bring some great performance benefits when used correctly. We hope to start seeing em being used more in the Elixir community. We mainly used log messages for the examples simply because Logger is a pretty common module but don’t think it’s the only place you can use these datatypes. Poke around your codebase and you might be surprised where you might be able to use IOData, Chardata, and ANSIdata. Cheers! Below are some useful resources that I used in putting this article together. 

### Useful Resources
- Understanding IODATA
- IO Docs
- IO.ANSI Docs
- Youtube Beam The Elixir IO List data type makes for very fast output
- Elixir and Erlang have a type called an iolist.
- Behind The Scenes Of File IO
- List Of Emojis
