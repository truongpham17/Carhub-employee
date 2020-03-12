import { INITIAL_CALLBACK, ENDPOINTS, STATUS } from 'Constants/api';
import { query } from 'services/api';
import {
  GET_RENTAL_FAILURE,
  GET_RENTAL_REQUEST,
  GET_RENTAL_SUCCESS,
  SET_SELECT_RENTAL,
} from '../constants/rental';

export function getRentalList(data, callback = INITIAL_CALLBACK) {
  return async dispatch => {
    try {
      dispatch({ type: GET_RENTAL_REQUEST });
      const result = await query({ endpoint: 'rental' });
      if (result.status === STATUS.OK) {
        dispatch({ type: GET_RENTAL_SUCCESS, payload: result.data });
        callback.success();
      }
    } catch (error) {
      dispatch({ type: GET_RENTAL_FAILURE, payload: error });
      callback.failure();
    }
  };
}

export function setSelectedRental(_id) {
  return {
    type: SET_SELECT_RENTAL,
    payload: _id,
  };
}
