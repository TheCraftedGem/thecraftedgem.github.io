import React from "react"
import './About.css'

class About extends React.Component{
  render(){
    return(
    <div className="about">
      <header class="info-details">

    <h1 class="title-name">Kate Kim</h1>
    <h2><a href="https://github.com/1030tue" target="_blank" className="nice-link"><i className="github square icon"></i></a>
    <a href="https://www.linkedin.com/in/katekim5809" target="_blank" className="nice-link"><i class="linkedin icon"></i></a></h2>
    <div class="contact-info">
      <a class="links" href="mailto:katekim5809@gmail.com">katekim5809@gmail.com</a>
    </div>
  </header>
      <h2 class="category-titles">Summary</h2><hr/>
      <p class="category-description-main">Full-stack web developer.
      Practical experience in Ruby on Rails, JavaScript, and React-Redux, with a background in learning technologies. While I discovered web development through teaching math with a program called GSP (Geometer’s Sketch Pad), I bring well-rounded skills from the meticulous study of web development at Flatiron School that will guide me to success.</p>

      <h2 class="category-titles">Skills</h2><hr/>
      <div class="category-description">
        <ul>
          <li>Html5 / CSS3</li>
          <li>JavaScript / React / Redux</li>
          <li>Heroku / AWS</li>
          <li>Git / GitHub</li>
          <li>Photoshop / Illustrator</li>
        </ul>
      </div>

    <div class="container">
      <h2 class="category-titles">Projects</h2>
      <hr/>
      <p><a href="http://www.pleaselike.com/" class="nice-link">projectname.com</a></p>
      <p class="category-description">Augue lacus viverra vitae congue eu consequat ac felis. Id diam maecenas ultricies mi eget mauris pharetra et ultrices. Et tortor consequat id porta nibh. Leo integer malesuada nunc vel risus commodo viverra maecenas. Tortor at risus viverra adipiscing at in tellus integer. </p>

      <p><a href="http://www.ismycomputeron.com/" class="nice-link">projectname.com</a></p>
      <p class="category-description">Ut ornare lectus sit amet est placerat. Facilisis volutpat est velit egestas. Enim diam vulputate ut pharetra sit. Sed adipiscing diam donec adipiscing tristique risus nec feugiat in. Suscipit adipiscing bibendum est ultricies. Ut consequat semper viverra nam libero. Mauris in aliquam sem fringilla ut morbi tincidunt.</p>

      <p><a href="http://fallingfalling.com/" class="nice-link">projectname.com</a></p>
      <p class="category-description">Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor. Integer id quam.</p>
    </div>

    <div class="container">
      <h2 class="category-titles">Professional Expirience</h2><hr/>

      <p class="primary-titles prof-expirience">Good Company <span class="location">| New York, NY</span></p>
      <p class="category-details">6/2019 - 10/2025 | Someposition </p>
      <p class="category-description">
        Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante. Nulla quam. Aenean laoreet. Vestibulum nisi lectus, commodo ac, facilisis ac, ultricies eu, pede. Ut orci risus, accumsan porttitor, cursus quis, aliquet eget, justo. Sed pretium blandit orci. Ut eu diam at pede suscipit sodales. Aenean lectus elit, fermentum non, convallis id, sagittis at, neque. Nullam mauris orci, aliquet et, iaculis et, viverra vitae, ligula. Nulla ut felis in purus aliquam imperdiet.
      </p>
    </div>
    </div>
    )
  }
}

export default About
