import { INITIAL_CALLBACK, ENDPOINTS, STATUS } from 'Constants/api';
import { query } from 'services/api';
import {
  GET_LEASE_FAILURE,
  GET_LEASE_REQUEST,
  GET_LEASE_SUCCESS,
  SET_SELECT_LEASE,
} from '../constants/lease';

export function getLeaseList(data, callback = INITIAL_CALLBACK) {
  return async dispatch => {
    try {
      dispatch({ type: GET_LEASE_REQUEST });
      const result = await query({ endpoint: 'lease' });
      if (result.status === STATUS.OK) {
        dispatch({ type: GET_LEASE_SUCCESS, payload: result.data });
        callback.success();
      }
    } catch (error) {
      dispatch({ type: GET_LEASE_FAILURE, payload: error });
      callback.failure();
    }
  };
}

export function setSelectedLease(_id) {
  return {
    type: SET_SELECT_LEASE,
    payload: _id,
  };
}
