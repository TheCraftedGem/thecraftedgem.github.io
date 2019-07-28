import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Period from "../Components/Period"
import { setCurrentClass } from '../actions/bathroom'
import { deletePeriod } from '../actions/teacher'
import withAuth from '../hocs/withAuth'


class TeacherContainer extends React.Component {
  state ={
    periods:null
  }

  handleClick=(props)=>{
    this.props.setCurrentClass(props);
    this.props.history.push('/class')
  }

  periodDelete = (e) => {
    console.log("1",this.props.currentTeacher.periods);
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/periods/${e.target.id}`,
      { method: 'DELETE' })
    this.props.deletePeriod(e.target.id)
    window.location.reload();
  }

  renderPeriodCards=()=>{
      let periods= [...this.props.currentTeacher.periods].sort((a,b)=>{
        return a.period_num - b.period_num });
        return periods.map(p => <Period period={p} key={p.id}
                            periodDelete={this.periodDelete}
                            handleClick={this.handleClick}/>)
  }



  render(){
    console.log("techaercon",this.props)
    return(
      <React.Fragment>
          <div className="period">{this.renderPeriodCards()}
              <br/> <br/>
            {this.props.currentClass? null:<Link to = "/class/new" > <button className="button" style={{width: "36.5em", margin: "auto", padding:".8em"}}> Create New Class </button> </Link>}
          </div>
      </React.Fragment>
      )
  }
}


const mapStateToProps = state => {
  return {
    currentTeacher: state.teacherReducer.teacher,
    currentClass: state.bathroomReducer.curr_class
  };
};


export default withAuth(connect(mapStateToProps,{ setCurrentClass, deletePeriod })(withRouter(TeacherContainer)));
