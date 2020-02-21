import axios from 'axios';

export function getUsers() {
  return async dispatch => {
    try {
      dispatch({
        type: 'GET_USER_REQUEST',
      });
      const data = await axios({
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/users',
      });
      if (data.status === 200) {
        dispatch({
          type: 'GET_USER_SUCCESS',
          payload: data.data,
        });
      } else {
        dispatch({
          type: 'GET_USER_ERROR',
          payload: 'error',
        });
      }
    } catch (error) {
      dispatch({
        type: 'GET_USER_ERROR',
        payload: error,
      });
    }
  };
}
