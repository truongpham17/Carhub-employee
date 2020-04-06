import {
  SET_QR_CODE_INFO,
  SET_TRANSACTION_INFO,
  CONFIRM_TRANSACTION_REQUEST,
  CONFIRM_TRANSACTION_SUCCESS,
  CONFIRM_TRANSACTION_FAILURE,
} from '@redux/constants/qrCode';
import { INITIAL_CALLBACK, STATUS, METHODS } from 'Constants/api';
import { query } from 'services/api';

export function setQRCodeInfo(info) {
  return {
    type: SET_QR_CODE_INFO,
    payload: info,
  };
}

export async function getTransationInfo(data) {
  try {
    // console.log('data at qr code: ', data);
    const result = await query({ endpoint: `${data.type}/${data.id}` });
    if (result.status === STATUS.OK) {
      return { ...result.data, transactionType: data.type };
    }
    return null;
  } catch (error) {
    return null;
  }
}

export function setTransactionInfo(data) {
  return {
    type: SET_TRANSACTION_INFO,
    payload: data,
  };
}

export const confirmTransaction = dispatch => async (
  { id, type, toStatus, licensePlates },
  callback = INITIAL_CALLBACK
) => {
  try {
    dispatch({ type: CONFIRM_TRANSACTION_REQUEST });
    const result = await query({
      endpoint: `${type}/transaction/${id}`,
      method: METHODS.patch,
      data: { toStatus, licensePlates },
    });
    if (result.status === STATUS.OK) {
      dispatch({ type: CONFIRM_TRANSACTION_SUCCESS, payload: result.data });
      callback.onSuccess();
    }
  } catch (error) {
    dispatch({ type: CONFIRM_TRANSACTION_FAILURE, payload: error });
    callback.onFailure();
  }
};
