import {
  GET_BOOKS_SUCCESS,
  GET_BOOKS_FAILURE,
  GET_BOOKS_REQUEST,
  ADD_BOOKS_SUCCESS,
  ADD_BOOKS_FAILURE,
  ADD_BOOKS_REQUEST,
} from '@redux/actions/book';

const INITIAL_STATE = {
  books: [],
  error: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_BOOKS_SUCCESS:
      return { ...state, books: action.payload, loading: false };
    case GET_BOOKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_BOOKS_REQUEST:
      return { ...state, loading: true };
    case ADD_BOOKS_SUCCESS:
      return {
        ...state,
        books: [...state.books, action.payload],
        loading: false,
      };
    case ADD_BOOKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_BOOKS_REQUEST:
      return { ...state, loading: true };
    default:
      return state;
  }
};
