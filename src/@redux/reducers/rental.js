import {
  GET_RENTAL_FAILURE,
  GET_RENTAL_REQUEST,
  GET_RENTAL_SUCCESS,
  SET_SELECT_RENTAL,
} from '../constants/rental';

const INITIAL_STATE = {
  loading: false,
  rentals: [],
  total: 0,
  selectedId: null,
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case GET_RENTAL_REQUEST:
      return { ...state, loading: true };
    case GET_RENTAL_SUCCESS:
      return { ...state, loading: false, ...action.payload };
    case GET_RENTAL_FAILURE:
      return { ...state, loading: false };
    case SET_SELECT_RENTAL:
      return { ...state, selectedId: action.payload };
    default:
      return { ...state };
  }
};
