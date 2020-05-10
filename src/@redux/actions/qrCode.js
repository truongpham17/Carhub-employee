import {
  SET_QR_CODE_INFO,
  SET_TRANSACTION_INFO,
  CONFIRM_TRANSACTION_REQUEST,
  CONFIRM_TRANSACTION_SUCCESS,
  CONFIRM_TRANSACTION_FAILURE,
  CHECK_AVAILABLE_CAR_REQUEST,
  CHECK_AVAILABLE_CAR_SUCCESS,
  CHECK_AVAILABLE_CAR_FAILURE,
  GET_TRANSACTION_REQUEST,
  GET_TRANSACTION_SUCCESS,
  GET_TRANSACTION_FAILURE,
} from '@redux/constants/qrCode';
import { INITIAL_CALLBACK, STATUS, METHODS } from 'Constants/api';
import { query } from 'services/api';

export function setQRCodeInfo(info) {
  return {
    type: SET_QR_CODE_INFO,
    payload: info,
  };
}

export const getTransationInfo = dispatch => async data => {
  try {
    dispatch({ type: GET_TRANSACTION_REQUEST });
    // console.log('data at qr code: ', data);
    const result = await query({ endpoint: `${data.type}/${data.id}` });
    if (result.status === STATUS.OK) {
      dispatch({ type: GET_TRANSACTION_SUCCESS });
      console.log(result.data.customer);
      return { ...result.data, transactionType: data.type };
    }
    dispatch({ type: GET_TRANSACTION_FAILURE });
  } catch (error) {
    dispatch({ type: GET_TRANSACTION_FAILURE });
  }
};

export const setTransactionInfo = dispatch => data =>
  dispatch({
    type: SET_TRANSACTION_INFO,
    payload: data,
  });

export const confirmTransaction = dispatch => async (
  { id, type, toStatus, licensePlates, message },
  callback = INITIAL_CALLBACK
) => {
  try {
    dispatch({ type: CONFIRM_TRANSACTION_REQUEST });
    const result = await query({
      endpoint: `${type}/transaction/${id}`,
      method: METHODS.patch,
      data: { toStatus, licensePlates, message },
    });
    if (result.status === STATUS.OK) {
      dispatch({ type: CONFIRM_TRANSACTION_SUCCESS, payload: result.data });
      callback.onSuccess();
    }
  } catch (error) {
    dispatch({
      type: CONFIRM_TRANSACTION_FAILURE,
      payload: error.response.data,
    });
    callback.onFailure();
  }
};

export const checkAvailableCar = dispatch => async (
  { id, rentalId },
  callback = INITIAL_CALLBACK
) => {
  try {
    dispatch({ type: CHECK_AVAILABLE_CAR_REQUEST });
    const result = await query({
      endpoint: `car/checkAvailableCar/${id}/${rentalId}`,
    });
    if (result.status === STATUS.OK) {
      dispatch({ type: CHECK_AVAILABLE_CAR_SUCCESS, payload: result.data });
      callback.onSuccess(result.data);
    } else {
      dispatch({ type: CHECK_AVAILABLE_CAR_FAILURE });
      callback.onFailure();
    }
  } catch (error) {
    dispatch({
      type: CHECK_AVAILABLE_CAR_FAILURE,
      payload: error.response.data,
    });
    callback.onFailure(error.response.data);
  }
};
