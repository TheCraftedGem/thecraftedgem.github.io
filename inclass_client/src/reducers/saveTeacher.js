import * as types from '../actions/ActionTypes';

const initialState = {
  activeTeacher: null
};


export default function saveTeacher(state=initialState, action){
    switch(action.type){
      case types.SAVE_TEACHER:
        return { ...state, activeTeacher: action.payload };
      default:
        return state;
    }
}
