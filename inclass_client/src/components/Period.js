import React from "react";
import { Icon } from 'semantic-ui-react'


const Period = (props) => {
const {period} = props

const capitalize=(s)=>{
 if (typeof s !== 'string'){ return ''}
 else{
   let splitStr = s.split(' ');
  for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' '); }
}

// const periodDelete=()=>{
//   fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/periods/${props.period.id}`,
//   {method: 'DELETE'});

//   console.log("jey",props)
//   console.log(document.getElementById(props.id))

// }


let num;
switch (period.period_num) {
  case 1: num = `${period.period_num}st`;
  break;
  case 2: num = `${period.period_num}nd`;
  break;
  case 3: num = `${period.period_num}rd`;
  break;
  default: num = `${period.period_num}th`
}


return (
  <React.Fragment>
     {/*period.teacher.name*/}
     <br/>
     <div className="periodCard" id={period.id}>

        <section onClick={()=>props.handleClick(props.period)}>
          <h4>
          <span style={{paddingLeft:"1em", paddingRight:".2em" }}> {num}</span>
          {' '}{' |'}
          <span style={{paddingLeft:".2em"}}> {capitalize(period.classname)} </span>
          <span> {period.duration} min</span>
          <span> {!!period.students.length? `${period.students.length}students `: null} </span>
          </h4>
        </section>

        <section className='trash'>
        <Icon name='trash alternate outline icon' id={period.id} onClick={props.periodDelete}/>
        </section>

    </div>
  </React.Fragment>
)
}

export default Period
