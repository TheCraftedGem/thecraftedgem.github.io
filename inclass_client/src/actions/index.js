import {SAVE_TEACHER} from './ActionTypes';

export function saveTeacher(teacher){
  return{
    type: SAVE_TEACHER,
    payload: teacher
  }
}
