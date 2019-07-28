import React from "react";

class AllStudentsPage extends React.Component{
  state={
    allstudents: ""
  }
  
  getAllStudents=()=>{
    fetch("http://localhost:4000/api/v1/students")
    .then(res=>res.json())
    .then(console.log)
  }

  componentDidMount(){
    this.getAllStudents()
  }


  render(){
    return(
      <div>
        render all!!!!
      </div>
    )
  }
}
export default AllStudentsPage;
