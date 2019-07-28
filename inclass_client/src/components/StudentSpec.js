import React from "react";
import StudentUpdate from "./StudentUpdate"


class StudentSpec extends React.Component {
  state={
    clicked: false
  }

  handleClick=()=>{
    this.setState({
      clicked: !this.state.clicked
    })
  }

  renderStudent=(student)=>{
    if(!this.state.clicked){
    return (
            <div className="StudentSpec">
                {student.firstname}{'  '}{student.lastname}
                <br/>
                {student.email}
                <br/>
                Parent/Guardian Info
                <br/>
                {student.guardians_name}
                ,{' '}{student.relationship_to_student}
                <br/>
                {student.guardians_email}
                <br/>
                {student.guardians_phone}
                <br/>
                <button onClick={this.handleClick}>update</button>
            </div>
    )} else if(!!this.state.clicked) {
     return  <StudentUpdate student={student}/>
    }
  }



  render(){
    return(
      <React.Fragment>
        <div className="popup">
          {this.renderStudent(this.props.student)}
        </div>
      </React.Fragment>
    )
  }
}


export default StudentSpec
