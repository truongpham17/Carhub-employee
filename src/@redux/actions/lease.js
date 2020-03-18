import { INITIAL_CALLBACK, ENDPOINTS, STATUS, METHODS } from 'Constants/api';
import { query } from 'services/api';
import {
  GET_LEASE_FAILURE,
  GET_LEASE_REQUEST,
  GET_LEASE_SUCCESS,
  SET_SELECT_LEASE,
  UPDATE_LEASE_ITEM_FAILURE,
  UPDATE_LEASE_ITEM_REQUEST,
  UPDATE_LEASE_ITEM_SUCCESS,
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

export const updateLeaseStatus = (
  { id, status },
  callback = INITIAL_CALLBACK
) => async dispatch => {
  try {
    dispatch({
      type: UPDATE_LEASE_ITEM_REQUEST,
    });
    const result = await query({
      method: METHODS.patch,
      endpoint: `${ENDPOINTS.lease}/${id}`,
      data: { status },
    });
    if (result.status === 200) {
      dispatch({ type: UPDATE_LEASE_ITEM_SUCCESS, payload: result.data });
      callback.onSuccess();
    }
  } catch (error) {
    dispatch({
      type: UPDATE_LEASE_ITEM_FAILURE,
      payload: error,
    });
    callback.onFailure();
  }
};
