import {
  SET_QR_CODE_INFO,
  GET_TRANSACTION_FAILURE,
  GET_TRANSACTION_REQUEST,
  GET_TRANSACTION_SUCCESS,
  SET_TRANSACTION_INFO,
} from '@redux/constants/qrCode';

const INITIAL_STATE = {
  info: null,
  transactionInfo: {},
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_QR_CODE_INFO:
      return { ...state, info: action.payload };
    case SET_TRANSACTION_INFO:
      return { ...state, transactionInfo: action.payload };
    default:
      return { ...state };
  }
};
