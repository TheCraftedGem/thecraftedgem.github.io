import React from "react";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Report from "./Report"

import { connect } from "react-redux";
import { timer } from '../actions/bathroom';
// import { Modal } from 'semantic-ui-react'


class Second extends React.Component{
  constructor(){
   super();
   this.state={
    min: '',
    sec:'00',
    running:false,
    elapsedTime: 0,
  }
}

componentDidMount(){
  this.setState({
    min: Math.floor(this.props.currentClass.duration)
  })
}


confirm=()=>{
confirmAlert({
    title: 'Confirm to start',
    message: 'Will you start this class?',
    buttons: [
      {
        label: 'Yes',
        onClick: () => this.handleRealClick()
      },
      {
        label: 'No',
        onClick: () => this.initialisate()

      }
    ]
  });
};


confirmEnd=()=>{
confirmAlert({
    title: 'Confirm to End',
    message: 'Do you want to finish this class?',
    buttons: [
      {
        label: 'Yes',
        onClick: () => {clearInterval(this.timer)
                        this.props.timer(0)}
      },
      {
        label: 'No',
        onClick: () => this.handleRealClick()
      }
    ]
  });
};

handleRealClick(){
  this.handleClick();
  this.setState({min: this.state.min - 1, running: !this.state.running});
}


handleClick(){
  if(this.state.running){
    clearInterval(this.timer);
    this.setState({running: false});

  }else{
    this.timer=setInterval(()=>{
      this.props.timer(this.state.elapsedTime);
      var secNew = Number(this.state.sec);
      var secStringNew='';
      var minNew = this.state.min;
      if(secNew === 59){
        secStringNew='00';
        minNew--;
      }else{
        secNew++;
        if(secNew<9){
          secStringNew='0'+secNew;
        }else{
          secStringNew=secNew;
        }
      }
      this.setState({sec: secStringNew, min: minNew, running: true, elapsedTime: this.state.elapsedTime+1});
    },1000);
  }
}

initialisate(){
  let num = Math.floor(this.props.currentClass.duration)
  this.setState({sec: '00', min: num, running: false});
}

renderTime=()=>{
  if(60-this.state.sec === 60){
    return this.state.min + ": 00"
  }else{
    if(this.state.sec<51){
      return this.state.min +":" + (60 - this.state.sec)
    }else{
      return this.state.min +": 0"+(60 - this.state.sec)
    }
  }
}


render(){
  return(
    <div>
      <br/>
      <div className="clock">
      {this.renderTime()}
      <br/>
      {!this.state.running ? <button onClick={this.confirm}>Start</button> : <button onClick={()=>{
        clearInterval(this.timer);
        this.setState({running: false});}}>Pause</button>}
     <button onClick={()=>this.initialisate()}>Reset</button>
     <button onClick={this.confirmEnd.bind()}>End</button>
      </div>
 <br/> <br/> <br/>
     </div>

  )
}
}

const mapStateToProps = state => {
  return {
    currentClass: state.bathroomReducer.curr_class,
    state:state
  };
};


export default connect( mapStateToProps ,{ timer })(Second);
