import { query } from 'services/api';
import { METHODS } from 'Constants/api';

export const GET_BOOKS_REQUEST = 'get-books-request';
export const GET_BOOKS_SUCCESS = 'get-books-success';
export const GET_BOOKS_FAILURE = 'get-books-failure';

export const ADD_BOOKS_REQUEST = 'add-books-request';
export const ADD_BOOKS_SUCCESS = 'add-books-success';
export const ADD_BOOKS_FAILURE = 'add-books-failure';

export const getBooks = () => async dispatch => {
  try {
    dispatch({ type: GET_BOOKS_REQUEST });
    const data = await query({ endpoint: 'book', method: METHODS.get });
    if (data.status === 200) {
      dispatch({ type: GET_BOOKS_SUCCESS, payload: data.data });
    } else {
      dispatch({
        type: GET_BOOKS_FAILURE,
      });
    }
  } catch (error) {
    dispatch({ type: GET_BOOKS_FAILURE, payload: error });
  }
};

export const addBook = ({ title, description }, callback) => async dispatch => {
  try {
    dispatch({ type: ADD_BOOKS_REQUEST });
    const data = await query({
      endpoint: 'book',
      method: METHODS.post,
      data: { title, description },
    });
    if (data.status === 200) {
      dispatch({ type: ADD_BOOKS_SUCCESS, payload: data.data });
      callback.onSuccess();
    } else {
      dispatch({
        type: ADD_BOOKS_FAILURE,
      });
    }
  } catch (error) {
    dispatch({ type: ADD_BOOKS_FAILURE, payload: error });
  }
};
