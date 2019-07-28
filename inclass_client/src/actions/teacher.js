export const loginTeacher = (email, password) => {
  return (dispatch) => {
    dispatch({ type: 'AUTHENTICATING_TEACHER' })
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/login`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
         Accept: 'application/json'
      },
      body: JSON.stringify({
        teacher: {
          email: email,
          password: password
        }
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
      .then(JSONResponse => {
        console.log('%c INSIDE YE OLDE .THEN', 'color: navy')
        localStorage.setItem('jwt', JSONResponse.jwt)
        dispatch({ type: 'SET_CURRENT_TEACHER', payload: JSONResponse.adopter })
      })
      .catch(r => r.json().then(e => dispatch({ type: 'FAILED_LOGIN', payload: e.message })))
  }
}


export const fetchCurrentTeacher = () => {
  return (dispatch) => {
    dispatch(authenticatingTeacher())
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(response => response.json())
      .then((JSONResponse) => dispatch(setCurrentTeacher(JSONResponse.teacher)))
  }
}

export const setCurrentTeacher = (teacherData) => ({
  type: 'SET_CURRENT_TEACHER',
  payload: teacherData
})

export const deletePeriod = (periodData) => ({
  type: 'DELETE_PERIOD',
  payload: periodData
})

export const failedLogin = (errorMsg) => ({
  type: 'FAILED_LOGIN',
  payload: errorMsg
})

export const authenticatingTeacher = () => ({ type: 'AUTHENTICATING_TEACHER' })





// export const signupTeacher = (fullname, email, password, confirmPassword, phone, subject) =>{
//   return dispatch => {
//       dispatch({ type: 'AUTHENTICATING_TEACHER' })
//     if (password === confirmPassword){
//         fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/signup`, { //TODO: move this to an adapter
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json'
//         },
//         body: JSON.stringify({
//           teacher: {
//               fullname: fullname,
//               email: email,
//               password: password,
//               confirmPassword: confirmPassword,
//               phone: phone,
//               subject: subject
//           }
//         })
//       })
//       .then(res => res.json())
//       .then((data) => {
//         console.log(data)
//         if (data.message){
//           alert(data.message);
//           this.props.history.push("/teacher/new")
//         } else {
//           // this.props.setCurrentTeacher(data)
//           this.props.dispatch({ type: 'SAVE_TEACHER', payload: data.teacher });
//           localStorage.setItem("jwt", data.jwt);
//           this.props.history.push("/teacher");
//           window.location.reload();
//         }
//       })
//     } else {
//       this.setState({
//         signupErrors: "Passwords don't match"
//       })
//     }
//   }
//   }
