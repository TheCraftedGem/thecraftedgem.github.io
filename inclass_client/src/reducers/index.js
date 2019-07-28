import { combineReducers } from 'redux';
import saveTeacher from './saveTeacher';
import teacherReducer from './teacherReducer';
import bathroomReducer from './bathroomReducer';


const reducers = combineReducers({
  teacherReducer, saveTeacher, bathroomReducer
})

export default reducers;
