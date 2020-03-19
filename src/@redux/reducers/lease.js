import {
  GET_LEASE_REQUEST,
  GET_LEASE_SUCCESS,
  GET_LEASE_FAILURE,
  SET_SELECT_LEASE,
  DECLINE_LEASE_FAILURE,
  DECLINE_LEASE_REQUEST,
  DECLINE_LEASE_SUCCESS,
  ACCEPT_LEASE_FAILURE,
  ACCEPT_LEASE_REQUEST,
  ACCEPT_LEASE_SUCCESS,
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
    case DECLINE_LEASE_REQUEST:
      return { ...state, loading: true };
    case DECLINE_LEASE_SUCCESS:
      return {
        ...state,
        leases: state.leases.filter(item => item._id !== action.payload._id),
        loading: false,
      };
    case DECLINE_LEASE_FAILURE:
      return { ...state, loading: false };
    case ACCEPT_LEASE_REQUEST:
      return { ...state, loading: true };
    case ACCEPT_LEASE_SUCCESS:
      return {
        ...state,
        leases: state.leases.filter(item => item._id !== action.payload._id),
        loading: false,
      };
    case ACCEPT_LEASE_FAILURE:
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};
