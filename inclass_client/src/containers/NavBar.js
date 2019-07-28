import React from "react";
import { Dropdown, Menu } from 'semantic-ui-react'

import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";




class NavBar extends React.Component {
  logOut = () => {
		localStorage.removeItem("jwt")}

    todayDate = ()=>{
      let newDate = new Date()
      let month = newDate.getMonth();
      let year = newDate.getFullYear();
      let newMon= ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      let date = newDate.getDate();
      switch(date.toString().split('').pop()) {
            case 1:
                return `0${newMon[month]} ${date}st, ${year}`;

            case 21:
                return `0${newMon[month]} ${date}st, ${year}`;

            case 31:
                return `0${newMon[month]} ${date}st, ${year}`;
            case 2:
                return `0${newMon[month]} ${date}nd, ${year}`;
            case 22:
                return `0${newMon[month]} ${date}nd, ${year}`;
            case 3:
                return `0${newMon[month]} ${date}rd, ${year}`;
            case 23:
                return `0${newMon[month]} ${date}rd, ${year}`;

            default:
                return `${newMon[month]} ${date}th, ${year}`;

        };

    }

  render(){
    return(
      <div className="topnav">

      <div className="navbar-name">
      <span><Link to ="/about">About</Link></span>

          <span> {this.props.teacher ? this.todayDate(''):null} </span>
              <span> <Link to="/teacher" style={{ textDecoration: 'none', color:'white'}}>{this.props.teacher ? this.props.teacher.fullname: null}</Link></span>

      </div>

        <div className="title">
          <Link to="/" style={{ textDecoration: 'none', color:'black'}}>  <h4>
          {this.props.teacher ? "In-Class": null}</h4> </Link>
        </div>
        <div className="navbar-name">
            <span> {!this.props.loggedIn ? null : <a href="http://localhost:3000/teacher/login" onClick={this.logOut} style={{ textDecoration: 'none', color:'white'}}> |LogOut| </a>}</span>
        </div>
        {!this.props.loggedIn ?
        <div className="navbar-name">
            <span> <Link to="/teacher/new" style={{ textDecoration: 'none', color:'white'}}>|SignUp|  </Link> </span>
        </div>
        : null }
      </div>
    )
  }
}


const mapStateToProps = ({ teacherReducer: loggedIn  }) => (
  loggedIn)


export default withRouter(connect(mapStateToProps)(NavBar))

// export default NavBar
