import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import logo from '../logo.svg';

import { fetchCurrentTeacher } from '../actions/teacher'

const withAuth =  (WrappedComponent) => {
  class AuthorizedComponent extends React.Component {
    componentDidMount() {
      console.log('%c INSIDE COMPONENT DID MOUNT FOR AUTH HOC', 'color: purple')
      if (localStorage.getItem('jwt') && !this.props.loggedIn) this.props.fetchCurrentTeacher()
    }

    // repeatStringNumTimes=(string, times)=>{
    //   var repeatedString = "";
    //   while (times > 0) {
    //     repeatedString += string;
    //     times--;
    //   }
    //   return repeatedString;
    // }
    loading=()=>{
      return(
        <div className="App-logo-div">
        <img src={logo} className="App-logo" alt="logo" />
        <h2 style={{paddingLeft:"5em"}}> &nbsp;&nbsp;&nbsp; Loading...</h2>
        </div>
      )
    }

    render() {
      console.log('%c INSIDE RENDER FOR HOC', 'color: green')
      if (localStorage.getItem('jwt') && this.props.loggedIn) {
        return <WrappedComponent />
      } else if (localStorage.getItem('jwt') && (this.props.authenticatingTeacher || !this.props.loggedIn)) {
        return (
          this.loading()
          )
      } else {
        return <Redirect to="/teacher/login" />
      }
    }
  }

  const mapStateToProps = (reduxStoreState) => {
    return {
      loggedIn: reduxStoreState.teacherReducer.loggedIn,
      authenticatingTeacher: reduxStoreState.teacherReducer.authenticatingTeacher
    }
  }

  const mapDispatchToProps =  (dispatch) => {
    return {
      fetchCurrentTeacher: () => dispatch(fetchCurrentTeacher()),
    }
  }


  return connect(mapStateToProps, { fetchCurrentTeacher })(AuthorizedComponent)
}

export default withAuth
