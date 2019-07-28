import React from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import SMSForm from './SMSForm';

// import { btnDisabled } from '../actions/bathroom';
// import { Button } from 'semantic-ui-react'

class TripCard extends React.Component {
  constructor() {
    super();
    this.state = {
      elapsedTime: null,
      second: null
    };

    this.countUp = this.countUp.bind(this);
    this.startCounting = this.startCounting.bind(this);

    this.countSec = this.countSec.bind(this);
    this.startSec=this.startSec.bind(this);
  }

  //Pause
  handleClick=()=>{
    clearInterval(this.state.minuteCounter)
    clearInterval(this.state.secondCounter)
  }


//Minutes
  startCounting() {
    this.setState({minuteCounter: setInterval(this.countUp, 1000)})
  }
  countUp() {
    // if(this.state.running){
      this.setState(({ elapsedTime }) => ({ elapsedTime: elapsedTime + 1 }));
    // }
  }


//Seconds
  countSec() {
    this.setState(({ second }) => ({ second: second + 1 }));
  }
  startSec() {
    this.setState({ secondCounter: setInterval(this.countSec, 1000) });
  }


  componentDidMount(){
    this.startCounting();
    this.startSec();
  }

  componentWillUnmount() {
    clearInterval(this.state.minuteCounter)
    clearInterval(this.state.secondCounter)
  }


  minutes=()=>{
      return `${Math.floor(this.state.elapsedTime/60)}`
  }

  seconds=()=>{
    // console.log("hi", this.state.elapsedTime);
    // this.props.cardTimer(this.state.elapsedTime)
    if(!this.state.second){
      return "0"
    }else if(this.state.second<60){
      return this.state.second
    }else{
      this.setState({
        second: 0
      })
    }
  }

  handleClick =(e) => {
    e.preventDefault()
  }



  renderStudent=(student)=>{
      let destination = this.props.student.trips[this.props.student.trips.length-1].destination

      let tripCardstyle;
          switch (destination) {
            case "Emergency":
              tripCardstyle = {backgroundColor: 'rgb(232, 132, 119)'}
              break;
            default:
              tripCardstyle = {backgroundColor: 'rgb(220, 234,162)'}
          }

      return (
        <div className="TripCard" style={tripCardstyle}>
          <h5>
            <span className={this.state.elapsedTime>20 ? "blink": ""} style={this.state.elapsedTime>15 ? {color:"#ff0000 "}: null}>
              {destination==="Emergency"? "⛔️":destination}{student.firstname}{' '}{student.lastname.charAt(0)}.{' '}
              has been out for {'  '}
              <span className="timer">
                 {this.minutes()}:{this.seconds()}
                 </span>
            {' '}
            </span>
          </h5>
             <button data-id={this.props.student.id} onClick={(e) => {
              this.props.cancelTimer(parseInt(e.target.dataset.id))} }>BACK</button>

              <Popup trigger={<span><button>TEXT</button></span>} position="bottom">
              <SMSForm/>
              </Popup>

              <Popup trigger={<span>  {destination==="Emergency"? <button>🚩ASK HELP</button>:null}</span>} position="bottom">
              <SMSForm/>
              </Popup>
        </div>
      )
  }



  render(){
    if(!this.props.student.trips) return null;
    return(
      <React.Fragment>
      {this.renderStudent(this.props.student)}
      </React.Fragment>
    )
  }

}


const mapStateToProps = state => {
  // console.log('hey',state.bathroomReducer.timer);
  return {
    cardTimer: state.bathroomReducer.cardTimer,
    state: state
  };
};


export default connect(mapStateToProps)(TripCard);


// export default connect(null,{ btnDisabled })(TripCard);
// export default TripCard
