import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  FETCH_USER
} from './types';

const END_URL = 'http://localhost:3001/0';

export function fetchUser() {
  return function(dispatch) {
    axios.get(END_URL)
      .then(response => {
        dispatch({
    type: FETCH_USER,
    payload: response.data
        });
      });
  }
}








