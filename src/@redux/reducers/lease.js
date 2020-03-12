import {
  GET_LEASE_REQUEST,
  GET_LEASE_SUCCESS,
  GET_LEASE_FAILURE,
  SET_SELECT_LEASE,
} from '@redux/constants/lease';

const INITIAL_STATE = {
  loading: false,
  leases: [],
  total: 0,
  selectedId: null,
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case GET_LEASE_REQUEST:
      return { ...state, loading: true };
    case GET_LEASE_SUCCESS:
      return { ...state, loading: false, ...action.payload };
    case GET_LEASE_FAILURE:
      return { ...state, loading: false };
    case SET_SELECT_LEASE:
      return { ...state, selectedId: action.payload };
    default:
      return { ...state };
  }
};
