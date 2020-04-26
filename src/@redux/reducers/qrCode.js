import {
  SET_QR_CODE_INFO,
  SET_TRANSACTION_INFO,
  CHECK_AVAILABLE_CAR_FAILURE,
  CHECK_AVAILABLE_CAR_REQUEST,
  CHECK_AVAILABLE_CAR_SUCCESS,
  GET_TRANSACTION_FAILURE,
  GET_TRANSACTION_REQUEST,
  GET_TRANSACTION_SUCCESS,
} from '@redux/constants/qrCode';

const INITIAL_STATE = {
  info: null,
  transactionInfo: {},
  loading: false,
  selectedCar: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_QR_CODE_INFO:
      return { ...state, info: action.payload };
    case SET_TRANSACTION_INFO:
      return { ...state, transactionInfo: action.payload };
    case GET_TRANSACTION_REQUEST:
      return { ...state, loading: true };
    case GET_TRANSACTION_SUCCESS:
      return { ...state, loading: false };
    case GET_TRANSACTION_FAILURE:
      return { ...state, loading: false };
    case CHECK_AVAILABLE_CAR_REQUEST:
      return { ...state, loading: true };
    case CHECK_AVAILABLE_CAR_SUCCESS:
      return { ...state, loading: false, selectedCar: action.payload };
    case CHECK_AVAILABLE_CAR_FAILURE:
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};
