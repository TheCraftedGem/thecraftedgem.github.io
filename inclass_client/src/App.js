import React from 'react';

import { connect } from "react-redux";
import { Route, Switch, withRouter } from 'react-router-dom'
import './App.css';
import NavBar from "./Containers/NavBar";
import NewStudentForm from "./Components/NewStudentForm";
import About from "./Components/About"
// import ClassPage from "./Containers/ClassPage";
import Home from "./Containers/Home";
import TeacherContainer from "./Containers/TeacherContainer"
import StudentsContainer from "./Containers/StudentsContainer"

// import StudentsContainer from "./Containers/StudentsContainer"

// import {saveTeacher} from './actions';
import Signup from "./Components/Signup"
import Login from "./Components/Login"
import NewPeriod from "./Components/NewPeriod"


// <Route exact path='/class' render={() => <ClassPage
// periods={this.state.periods}/>} />


class App extends React.Component{
  render(){
    console.log('%c APP Props: ', 'color: firebrick', this.props)
    return(
      <div>
        <NavBar />
          <Switch>
           <Route exact path='/teacher' component={TeacherContainer} setCurrentTeacher={this.setCurrentTeacher}/>

           <Route exact path='/teacher/new' component={Signup} />
           <Route exact path='/teacher/login' component={Login} />
           <Route path='/class/new' render={(routeProps) => <NewPeriod {...routeProps} />} />
           <Route exact path='/students/new' component={NewStudentForm} />
           <Route exact path='/' component={Home} />
           <Route exact path="/about" component={About} />
           <Route path="/class" component={StudentsContainer}/>
           </Switch>

      </div>
    )
  }
}


const mapStateToProps = state => {
  console.log(state.teacherReducer);
  return {
    currentTeacher:state.teacherReducer.teacher,
    currentClass: state.bathroomReducer.curr_class,
    state:state
  };
};

export default withRouter(connect()(App))
