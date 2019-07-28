import React from "react";
import { connect } from "react-redux";

class Report extends React.Component{
state={
  trips:null
}

getTrips(){
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/trips`)
    .then(res => res.json())
    .then(data =>{
      this.setState({
        trips: data
      })
    })
  }

componentDidMount(){
  this.getTrips()
}

findTrips=()=>{
  console.log(this.state);
  if(this.state.trips){
    return this.state.trips.filter(t=>t.period_id===this.props.currentClass.id)}else{return null}
}

findBathroom=()=>{
  if(this.findTrips()){
    return this.findTrips().filter(t=>t.destination==="🧻").length}else{return "No one"}
}

findNurse=()=>{
  if(this.findTrips()){
    return this.findTrips().filter(t=>t.destination==="💊").length}else{return "No one"}
}

findEmergency=()=>{
  if(this.findTrips()){
    return this.findTrips().filter(t=>t.destination==="Emergency").length}else{return "No one"}
}

alltrips=()=>{
  if(this.findTrips()){
    return this.findTrips().length}else{return "No one"}
}

table=()=>{
let myDate = new Date();
let today = myDate.getFullYear() + "-" +0+(myDate.getMonth()+1) + "-" + myDate.getDate();
let trips = !this.findTrips()? null: this.findTrips().filter((t=>t.created_at.split('T')[0] === today))
return trips
}


renderTable=(student)=>{
  return(
  "  // {student.firstname} {student.lastname} {student.trips}"
  )
}

render(){
console.log(this.table());
    return(
      <div className='report'>
      <hr/>
      <h3>You just had</h3>
      <h2> {this.props.currentClass.classname} </h2>

      <h3> Duration: {this.props.timer? `${this.props.timer}sec.` : `${this.props.currentClass.duration}min.`} </h3>
      <h3>  {this.findBathroom()} went to bathroom.</h3>
      <h3>  {this.findNurse()} went to nurse.</h3>
      <h3>  {this.findEmergency()} had emargency.</h3>
      <h3>Total {this.alltrips()} {this.alltrips()>1? "students":"student"} went out.</h3>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentClass: state.bathroomReducer.curr_class,
    brStudents: state.bathroomReducer.brStudents,
    timer: state.bathroomReducer.timer,
    state: state
  };
};


// export default Report

export default connect(mapStateToProps)(Report);
