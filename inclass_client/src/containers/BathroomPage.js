import React from "react";

import { connect } from "react-redux";

import { removeBrStudent, updateClass } from '../actions/bathroom'

import withAuth from '../hocs/withAuth'

import TripCard from '../Components/TripCard'

class BathroomPage extends React.Component {

  renderStudent=()=>{
    if(this.props.brStudents){
      return this.props.brStudents.map(s => <TripCard student={s} key={s.id} cancelTimer={this.cancelTimer}/>)
    }
  }

  cancelTimer=(id)=> {
      this.props.removeBrStudent(id);
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/students/updateTimer/${id}`,
      {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
         Accept: 'application/json'
      },
      body: JSON.stringify({
          inclass: true
      })
    }).then(res => res.json())
    .then((data)=> {
      this.props.updateClass(data)
    })

  }

  statusBar=()=>{
    if(!this.props.brStudents.length){
      return "You Are In Class"
    }else{
      if(this.props.brStudents.length>1){
        return(`${this.props.brStudents.length} students are out.`)
      }else{
        return(`${this.props.brStudents.length} student is out.`)
      }
    }
  }

  render(){
    return(
      <React.Fragment>
      <div className="brPage" style={{backgroundColor:"#d1dfde", float:"right"}}>
        <h3>{this.statusBar()}</h3>
        <div>{this.renderStudent()}</div>
      </div>
      </React.Fragment>
      )
  }
}


const mapStateToProps = state => {
  return {
    currentClass: state.bathroomReducer.curr_class,
    brStudents: state.bathroomReducer.brStudents,
  };
};



export default withAuth(connect(mapStateToProps, { removeBrStudent, updateClass })(BathroomPage));
