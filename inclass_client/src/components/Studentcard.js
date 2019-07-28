import React from "react";
import StudentSpec from './StudentSpec';
import Popup from "reactjs-popup";
import { connect } from "react-redux";
import { Icon } from 'semantic-ui-react'


class StudentCard extends React.Component {


  handleColor=()=>{
  let myDate = new Date();
  let today = myDate.getFullYear() + "-" +0+(myDate.getMonth()+1) + "-" + myDate.getDate();
    if(this.props.student.trips.length===0 && this.props.student.inclass){
      return '#9edcdd'
    } else if(this.props.student.trips.filter(t=>t.created_at.split('T')[0] === today).length===1&& this.props.student.inclass){
      return '#f8e77f'
    } else if(!this.props.student.inclass){
      return '#e8ebed'
    } else if(this.props.student.trips.length===1&& this.props.student.inclass){
      return '#f8e77f'
    } else if(this.props.student.trips.length>1 && this.props.student.inclass){
      return '#ea8474'
    }
  }

  renderStudent=(student)=>{
    let btnStyle={
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      fontSize: '1.5em'
    }


    return (<div className="StudentCard" style={{backgroundColor: this.handleColor()}}>
              <div className="StudentSpec">
              <Popup trigger={<span><h4>{student.firstname}{'  '}{student.lastname}</h4>{student.gender.toLowerCase()==="female" ? "👩🏻‍🎓": "👨🏻‍🎓"}</span>} position="bottom">
                {close => (
                  <div>
                  <a className="close" onClick={close}>
                  <Icon name='window close' />
                  </a>
                    <div class="ui card">
                    <StudentSpec student={this.props.student}/>
                    </div>
                  </div>
                )}
                </Popup>

              </div>
              <div>
                {student.inclass ? "IN": "OUT"}
              </div>

              <div className="tripBtn" onClick={(e)=>this.props.handleClick(this.props.student, e)} >
                <input style={btnStyle} data-id={!student.id} type="button" name="destination" value="🧻" disabled={!student.inclass} />
                <input style={btnStyle} data-id={student.id} type="button" name="destination" value="💊" disabled={!student.inclass}/>
                <input style={
                {  backgroundColor: 'transparent',
                  borderColor: 'transparent'}
                } type="button" name="destination" value="Emergency" data-id={student.id} disabled={false}/>
              </div>

            </div>
          )
  }


  render(){
    return(
      <React.Fragment>
      {this.renderStudent(this.props.student)}
      </React.Fragment>
    )
  }
}




export default connect()(StudentCard);
// export default StudentCard
