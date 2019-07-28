
// export const fetchCurrentClass = () => {
//   return (dispatch) => {
//     dispatch(authenticatingTeacher()) //tells the app we are fetching
//     fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/profile`, {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('jwt')}`
//       }
//     })
//       .then(response => response.json())
//       .then((JSONResponse) => dispatch(setCurrentTeacher(JSONResponse.teacher)))
//   }
// }



export const setCurrentClass = (periodInfo) => {
  return (dispatch) =>{
    dispatch({ type: 'SET_CURRENT_CLASS', payload: periodInfo })
  }
}


export const updateClass = (student) => ({
  type: 'UPDATE_CLASS',
  payload: student
})

export const brStudents = (student) => ({
  type: 'BR_STUDENTS',
  payload: student
})

export const timer = (time) => ({
  type: 'TIMER',
  payload: time
})

export const cardTimer = (time) => ({
  type: 'CARD_TIMER',
  payload: time
})

export const removeBrStudent = (studentId) => ({
  type: 'REMOVE_STUDENT_FROM_BR',
  payload: studentId
})

export const alltrips=(trips)=>({
  type: 'ALL_TRIPS',
  payload: trips
})


export const btnDisabled = (clicked) =>({
  type: 'BTN_DISABLED',
  payload: clicked
})


export const deleteStudent = (student)=>({
  type: "DELETE_STUDENT",
  payload: student
})


export const addStudent = (student)=>({
  type: "ADD_STUDENT",
  payload: student
})
