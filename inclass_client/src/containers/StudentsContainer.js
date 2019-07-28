import React from "react";
import StudentCard from "../Components/Studentcard"
import BathroomPage from "./BathroomPage"
import Second from "../Components/Second"
import Sort from "../Components/Sort"
import Dropdown from "../Components/Dropdown"

import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { brStudents, updateClass, alltrips } from '../actions/bathroom';

import withAuth from '../hocs/withAuth'


class StudentsContainer extends React.Component {
  state={
    searchInput:'',
    sortFirst:'',
    sortSecond:''
  }

  componentDidMount(){
    if(!this.props.currentClass){
      this.props.history.push('/teacher')
    }
    this.getAlltrips()
  }

  newStudntbtn = () =>{
    return (
      <Link to="/students/new">
      <button className="button">+ New Student</button>
      </Link>
    )
  }


  handleCardClick=(props, e)=>{
    if(!this.props.timer){
      alert("Start the timer first ")
    }else if(this.props.timer >= parseInt(this.props.currentClass.duration)*60 - 10*60){
      alert("This class has 10 minutes left!")
    }else{
    return(
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/students/${props.id}`,
      {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
         Accept: 'application/json'
      },
      body: JSON.stringify({
        inclass: !props.inclass,
        student_id: props.id,
        period_id: this.props.currentClass.id,
        destination: e.target.value
      })
    }).then(res => res.json())
    .then((data)=> {
      this.props.brStudents(data)
      this.props.updateClass(data)
    })
  )
}
  }

  getAlltrips=()=>{
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/trips`)
    .then(res=>res.json())
    .then(data=>this.props.alltrips(data))
  }


  handleSearch=(e)=>{
    this.setState({
      searchInput: e
    })
  }

  handleSortFirst=(e)=>{
    this.setState({
      sortFirst: e
    })
  }

  handleSortSecond=(e)=>{
    this.setState({
      sortSecond: e
    })
  }


  sortByFirstname=()=>{
    return [...this.props.currentClass.students].sort((a,b)=>{
      return a.firstname.localeCompare(b.firstname);
    })
  }

  sortByLastname=()=>{
    return this.props.currentClass.students.sort((a,b)=>{
      return a.lastname.localeCompare(b.lastname);
    })
  }


  renderSearch=()=>{
      if(!this.state.searchInput){return this.renderSort()
      }else{
        return this.renderSort().filter(s=>s.firstname.toLowerCase().includes(this.state.searchInput.toLowerCase())||s.lastname.toLowerCase().includes(this.state.searchInput.toLowerCase()))
      }
  }

  renderSort=()=>{
    if(this.state.sortFirst==="firstname"&&this.state.sortSecond==="atoz"){
      return this.sortByFirstname()
    }else if(this.state.sortFirst==="lastname"&&this.state.sortSecond==="atoz"){
      return this.sortByLastname()
    }else if(this.state.sortFirst==="lastname"&&this.state.sortSecond==="ztoa"){
      return [...this.props.currentClass.students].sort((b,a)=>{
        return a.lastname.localeCompare(b.lastname);
      })
    }else if(this.state.sortFirst==="firstname"&&this.state.sortSecond==="ztoa"){
      return [...this.props.currentClass.students].sort((b,a)=>{
        return a.firstname.localeCompare(b.firstname);
      })
    }else{
      return this.props.currentClass.students
    }
  }

  renderStudent=()=>{
      return this.renderSearch().map(s => <StudentCard student={s} key ={s.id} handleClick={this.handleCardClick}/>)
  }

  renderPeriod=()=>{
    let num = this.props.currentClass.period_num;
    switch (num) {
      case 1: return `${num}st`
      case 2: return `${num}nd`
      case 3: return `${num}rd`
      default: return `${num}th`
    }
  }


  render(){
    return(
    <React.Fragment>
    { this.props.currentClass ?
    <React.Fragment>
    <div className="StudentsContainerHeader">
    <h3>{!!this.props.currentClass ? `${this.renderPeriod()} period` : null}
     {' - '}
    {!!this.props.currentClass ? this.props.currentClass.classname : null}</h3>
    </div>
    <div className="StudentsContainer">
      <div className='tools'>
        <Second />
        <Sort handleSearch={this.handleSearch} handleSortFirst={this.handleSortFirst} handleSortSecond={this.handleSortSecond}/>
            <br/>
        {this.newStudntbtn()}
            <br/>
        <Dropdown/>
      </div>
      <div className="Cards-Container">
        {this.renderStudent()}
      </div>
    {this.props.timer?  <BathroomPage /> : null}   </div></React.Fragment> : null }

    </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  console.log("hello2", state)
  return {
    currentClass: state.bathroomReducer.curr_class,
    timer: state.bathroomReducer.timer,
    state: state
  };
};


export default withAuth(connect(mapStateToProps,{ brStudents, updateClass, alltrips })(withRouter(StudentsContainer)));
