import React from "react";

import {connect} from "react-redux"
import { deleteStudent } from '../actions/bathroom'

class StudentUpdate extends React.Component {
  state={

  }

  capitalize = (s) => {
   if (typeof s !== 'string'){ return ''}
   else{
     let splitStr = s.split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' '); }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })

  }

  handleSubmit = () => {
    this.studentUpdate(this.state)
  }


 studentUpdate=(input)=>{
  fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/students/${this.props.student.id}`,
  {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
     Accept: 'application/json'
  },
    body: JSON.stringify({
      firstname: !!input.firstname ? this.capitalize(input.firstname): this.props.student.fristname,
      lastname: !!input.lastname ? this.capitalize(input.lastname): this.props.student.lastname,
      email: input.email,
      gender: input.gender,
      guardians_name: this.capitalize(input.guardians_name),
      relationship_to_student: input.relationship_to_student,
      guardians_email: input.guardians_email,
      guardians_phone: input.guardians_phone
    })
  }).then(res => res.json())
  .then((data)=> {
    this.props.brStudents(data)
    this.props.updateClass(data)
  })
  }


  studentDelete=()=>{
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/students/${this.props.student.id}`,
    {method: 'DELETE'})
    this.props.deleteStudent(this.props.student)
  }



    renderForm=(student)=>{
      console.log(this.props.student.id);
    return (
              <React.Fragment>
                  <form onSubmit={this.handleSubmit}>
                    <div onChange={this.handleChange}>
                    <span>Update Student Info</span>
                    <input type="text" name="firstname" placeholder={student.firstname}/>{' '} <input type="text" name="lastname" placeholder={student.lastname}/>
                   <br/>
                   <input type="email" name="email" placeholder={student.email}/>
                   <br/>
                   <div>
                     <input name="gender" type="radio" value="female"/>
                     👩🏻‍🎓
                     <input name="gender" type="radio" value="male"/>
                     👨🏻‍🎓
                   </div>
                   Parent/Guardian Info
                   <br/>
                    <input type="text" name="guardians_name" placeholder={student.guardians_name}/>
                    <input type="text" name="relationship_to_student" placeholder={student.relationship_to_student}/>

                   <br/>
                   <input type="email" name="guardians_email" placeholder={student.guardians_email}/>

                   <br/>

                   <input type="text" name="guardians_phone" placeholder={student.guardians_phone}/>

                   <br/>
                   <input type="submit" />

                    </div>
                   </form>
                   <button onClick={this.studentDelete}>Delete Student</button>
              </React.Fragment>

    )
  }


  render(){
    console.log(this.props);
    return(
      <React.Fragment>
      {this.renderForm(this.props.student)}
      </React.Fragment>
    )
  }
}


export default connect(null, {deleteStudent})(StudentUpdate)
