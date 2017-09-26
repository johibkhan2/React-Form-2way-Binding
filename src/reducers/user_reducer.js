import {
  FETCH_USER
} from '../actions/types';


export default function(state = {data:{} }, action) {

  switch(action.type) {
    case FETCH_USER:
      return { ...state, data: action.payload };  
  }

  return state;

}
