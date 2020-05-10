import { INITIAL_CALLBACK, ENDPOINTS, STATUS, METHODS } from 'Constants/api';
import { query } from 'services/api';
import {
  GET_RENTAL_FAILURE,
  GET_RENTAL_REQUEST,
  GET_RENTAL_SUCCESS,
  SET_SELECT_RENTAL,
  UPDATE_RENTAL_ITEM_REQUEST,
  UPDATE_RENTAL_ITEM_FAILURE,
  UPDATE_RENTAL_ITEM_SUCCESS,
} from '../constants/rental';

export function getRentalList(callback = INITIAL_CALLBACK) {
  return async dispatch => {
    try {
      dispatch({ type: GET_RENTAL_REQUEST });
      const result = await query({ endpoint: 'rental' });
      console.log(result.data);
      if (result.status === STATUS.OK) {
        dispatch({ type: GET_RENTAL_SUCCESS, payload: result.data });
        callback.success();
      }
    } catch (error) {
      dispatch({ type: GET_RENTAL_FAILURE, payload: error.response.data });
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

export const updateRentalStatus = dispatch => async (
  { id, status, note },
  callback = INITIAL_CALLBACK
) => {
  try {
    dispatch({
      type: UPDATE_RENTAL_ITEM_REQUEST,
    });
    const result = await query({
      method: METHODS.patch,
      endpoint: `${ENDPOINTS.rental}/${id}`,
      data: {
        data: { status, note },
        log: {
          type: 'DECLINE',

          title: 'Booking request decline',
          detail: id,
        },
      },
    });
    if (result.status === 200) {
      dispatch({ type: UPDATE_RENTAL_ITEM_SUCCESS, payload: result.data });
      callback.onSuccess();
    }
  } catch (error) {
    dispatch({
      type: UPDATE_RENTAL_ITEM_FAILURE,
      payload: error.response.data,
    });
    callback.onFailure();
  }
};
