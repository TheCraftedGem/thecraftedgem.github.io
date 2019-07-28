import React from 'react';
import {connect} from 'react-redux'
import { withRouter } from "react-router-dom";
import { addStudent } from "../actions/bathroom"

class Dropdown extends React.Component{
  state={
    all: []
  }

  componentDidMount() {
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/students`)
      .then(res=>res.json())
      .then(data => {
        this.setState({
          all: data
        })
      })
    }


  allNotInCass=()=>{
    let id = this.props.currentClass.id
    return this.state.all.filter(s=>!s.enrolledClasses.map(c=>c.id).includes(id))
  }

  handleChange=(e)=>{
    console.log(e.target.value)
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/enrolls`, {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            period_id: this.props.currentClass.id,
            student_id: e.target.value
          })
        }).then(res=>res.json())
        .then(data=>{
          // console.log("dropdown",data);
          this.props.addStudent(this.state.all.find(s=>s.id===data.student_id))
          this.props.history.push("/class")})
  }


  render(){
    // debugger
    // console.log(this.props);
    let optionItems = this.allNotInCass().map((stdnt) =>
               <option value={stdnt.id}>{stdnt.firstname}{' '}{stdnt.lastname}</option>)
    return(
      <div>
        <select onChange={this.handleChange} className="sort">
         <option label="Add Student"></option>
          {optionItems}
        </select>
      </div>
    )
  }
}


const mapStateToProps = state =>{
  return {
    currentClass: state.bathroomReducer.curr_class,
    state: state
  }
}


export default connect(mapStateToProps,{addStudent})(withRouter(Dropdown));
