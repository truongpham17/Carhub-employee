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
  DECLINE_LEASE_FAILURE,
  DECLINE_LEASE_REQUEST,
  DECLINE_LEASE_SUCCESS,
  ACCEPT_LEASE_FAILURE,
  ACCEPT_LEASE_REQUEST,
  ACCEPT_LEASE_SUCCESS,
} from '../constants/lease';

export const getLeaseList = dispatch => async (callback = INITIAL_CALLBACK) => {
  try {
    dispatch({ type: GET_LEASE_REQUEST });
    const result = await query({ endpoint: 'lease' });
    if (result.status === STATUS.OK) {
      dispatch({ type: GET_LEASE_SUCCESS, payload: result.data });
      callback.onSuccess();
    }
  } catch (error) {
    dispatch({ type: GET_LEASE_FAILURE, payload: error.response.data });
    callback.onFailure();
  }
};

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
      payload: error.response.data,
    });
    callback.onFailure();
  }
};

export const declineLeaseRequest = dispatch => async (
  { id, message },
  callback = INITIAL_CALLBACK
) => {
  try {
    dispatch({
      type: DECLINE_LEASE_REQUEST,
    });
    const result = await query({
      method: METHODS.patch,
      endpoint: `${ENDPOINTS.lease}/transaction/${id}`,
      data: { toStatus: 'DECLINED', message },
    });
    if (result.status === 200) {
      dispatch({ type: DECLINE_LEASE_SUCCESS, payload: result.data });
      callback.onSuccess();
    } else {
      dispatch({ type: DECLINE_LEASE_FAILURE });
    }
  } catch (error) {
    dispatch({
      type: DECLINE_LEASE_FAILURE,
      payload: error.response.data,
    });
    callback.onFailure();
  }
};

export const acceptLeaseRequest = dispatch => async (
  id,
  callback = INITIAL_CALLBACK
) => {
  try {
    dispatch({
      type: ACCEPT_LEASE_REQUEST,
    });
    const result = await query({
      method: METHODS.patch,
      endpoint: `${ENDPOINTS.lease}/transaction/${id}`,
      data: { toStatus: 'ACCEPTED' },
    });
    if (result.status === 200) {
      dispatch({ type: ACCEPT_LEASE_SUCCESS, payload: result.data });
      callback.onSuccess();
    } else {
      dispatch({ type: ACCEPT_LEASE_FAILURE });
      callback.onFailure();
    }
  } catch (error) {
    dispatch({
      type: ACCEPT_LEASE_FAILURE,
      payload: error.response.data,
    });
    console.log(error);
    callback.onFailure();
  }
};
