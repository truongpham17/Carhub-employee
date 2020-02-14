import { query } from 'services/api';
import { ENDPOINTS, STATUS, INITIAL_CALLBACK } from 'Constants/api';
import {
  GET_TEST_REQUEST,
  GET_TEST_SUCCESS,
  GET_TEST_FAILURE,
} from '@redux/constants/user';

export function getTest(data, callback = INITIAL_CALLBACK) {
  return async dispatch => {
    try {
      dispatch({ type: GET_TEST_REQUEST });
      const result = await query({ endpoint: ENDPOINTS.user.get_test });
      if (result.status === STATUS.OK) {
        dispatch({ type: GET_TEST_SUCCESS, payload: result.data });
        callback.success();
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_TEST_FAILURE, payload: error });
      callback.failure();
    }
  };
}
