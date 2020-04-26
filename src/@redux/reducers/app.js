import { defaultFunction } from 'Utils/common';
import { SET_POPUP_DATA, CANCEL_POPUP } from '@redux/constants/app';
import {
  CONFIRM_TRANSACTION_FAILURE,
  CHECK_AVAILABLE_CAR_FAILURE,
} from '@redux/constants/qrCode';
import {
  RENTAL_NOT_FOUND_CAR,
  RENTAL_CAR_ALREADY_IN_USE,
} from 'Constants/errorCode';

const INITIAL_STATE = {
  popup: {
    title: '',
    description: '',
    onDecline: defaultFunction,
    onConfirm: defaultFunction,
    onClose: defaultFunction,
    modalVisible: false,
    popupType: null,
    grandResponder: false,
    acceptOnly: false,
    confirmLabel: 'Ok',
  },
};

const TEST = {
  popup: {
    popupType: 'prompt',
    modalVisible: true,
    title: 'hello',
    description: 'hello',
    onConfirm(data) {
      console.log(data);
    },
    onDecline(data) {
      console.log(data);
    },
  },
};

const ERROR = {
  title: 'Something went wrong!',
  description: 'Something went wrong, please try again!',
  modalVisible: true,
  popupType: 'error',
  grandResponder: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_POPUP_DATA:
      return {
        ...state,
        popup: {
          grandResponder: false,
          popupType: 'confirm',
          modalVisible: true,
          confirmLabel: 'Ok',
          ...action.payload,
        },
      };
    case CONFIRM_TRANSACTION_FAILURE:
      return { ...state, popup: ERROR };
    case CANCEL_POPUP:
      return { ...INITIAL_STATE };
    default:
      return { ...state };
  }
};
