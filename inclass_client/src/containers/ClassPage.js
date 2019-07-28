import React from "react";
import Period from "../Components/Period"
import StudentsContainer from "./StudentsContainer"

import { Link } from "react-router-dom";


class ClassPage extends React.Component {
  state={
    clicked: ""
  }

  handleClickPeriod=(props)=>{
    let clicked = this.props.periods.find(p=>p.id = props.id)
    this.setState({
      clicked: clicked
    })
  }
// handleClickPeriod={this.handleClickPeriod}


  renderCards=()=>{
    if(!this.state.clicked){
      return this.props.periods.map(p => <Period period={p} key={p.id} />)
    }else{
     return <StudentsContainer
            AddNewStudent={this.props.AddNewStudent}
            period={this.state.clicked}/>
    }
  }

  render(){
    return(
    <div>
    {this.renderCards()}
    <br/>

    </div>
    )
  }
}


export default ClassPage
