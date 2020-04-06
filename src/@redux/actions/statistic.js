import { INITIAL_CALLBACK, STATUS, METHODS } from 'Constants/api';
import { query } from 'services/api';
import {
  GET_HUB_CAR_FAILURE,
  GET_HUB_CAR_REQUEST,
  GET_HUB_CAR_SUCCESS,
  SET_SELECTED_CAR_MODEL,
  ADD_CAR_FAILURE,
  ADD_CAR_REQUEST,
  ADD_CAR_SUCCESS,
  UPDATE_CAR_FAILURE,
  UPDATE_CAR_REQUEST,
  UPDATE_CAR_SUCCESS,
  REMOVE_CAR_FAILURE,
  REMOVE_CAR_REQUEST,
  REMOVE_CAR_SUCCESS,
  SET_SELECTED_CAR,
  GET_CAR_FAILURE,
  GET_CAR_REQUEST,
  GET_CAR_SUCCESS,
  CHECK_AVAILABLE_CAR_REQUEST,
  CHECK_AVAILABLE_CAR_SUCCESS,
  CHECK_AVAILABLE_CAR_FAILURE,
} from '../constants/statistic';

export const getHubCarList = dispatch => async (
  callback = INITIAL_CALLBACK
) => {
  try {
    dispatch({ type: GET_HUB_CAR_REQUEST });
    const result = await query({ endpoint: 'car/hubCarList' });
    if (result.status === STATUS.OK) {
      const carModels = [];
      const { allCarFromHub } = result.data;
      const { hub } = result.data;
      if (!Array.isArray(allCarFromHub)) {
        throw new Error('error result ');
      }
      for (let i = 0; i < allCarFromHub.length; i++) {
        const car = allCarFromHub[i];

        const inCreaseHubCar = car.hub === hub._id ? 1 : 0;
        const inCreaseCurrentHubCar = car.currentHub === hub._id ? 1 : 0;
        const inCreaseCustomerCar = car.customer ? 1 : 0;
        const inCreaseCarFromOtherHub = inCreaseCurrentHubCar ? 0 : 1;
        const inCreaseLeaving = car.rental ? 1 : 0;
        const inCreaseComming = car.lease ? 1 : 0;

        const duplicateIndex = carModels.findIndex(
          carModel => carModel.carModel._id === car.carModel._id
        );
        if (duplicateIndex === -1) {
          carModels.push({
            carModel: car.carModel,
            hubQuantity: inCreaseHubCar,
            currentQuantity: inCreaseCurrentHubCar,
            customerQuantity: inCreaseCustomerCar,
            otherHubQuantity: inCreaseCarFromOtherHub,
            upCommingLeaving: inCreaseLeaving,
            upCommingReceive: inCreaseComming,
          });
        } else {
          const duplicateCarModel = carModels[duplicateIndex];
          duplicateCarModel.hubQuantity += inCreaseHubCar;
          duplicateCarModel.currentQuantity += inCreaseCurrentHubCar;
          duplicateCarModel.customerQuantity += inCreaseCustomerCar;
          duplicateCarModel.otherHubQuantity += inCreaseCarFromOtherHub;
          duplicateCarModel.upCommingLeaving += inCreaseLeaving;
          duplicateCarModel.upCommingReceive += inCreaseComming;
        }
      }

      dispatch({
        type: GET_HUB_CAR_SUCCESS,
        payload: { ...result.data, carModels },
      });
      callback.onSuccess();
    }
  } catch (error) {
    dispatch({ type: GET_HUB_CAR_FAILURE, payload: error });
    callback.onFailure();
  }
};

export const setSelectedCarModel = dispatch => _id =>
  dispatch({
    type: SET_SELECTED_CAR_MODEL,
    payload: _id,
  });

export const setSelectedCar = dispatch => _id =>
  dispatch({
    type: SET_SELECTED_CAR,
    payload: _id,
  });

export const addCar = dispatch => async (data, callback = INITIAL_CALLBACK) => {
  try {
    dispatch({ type: ADD_CAR_REQUEST });
    const result = await query({ endpoint: 'car', method: METHODS.post, data });
    if (result.status === STATUS.CREATED) {
      dispatch({ type: ADD_CAR_SUCCESS, payload: result.data });
      callback.onSuccess();
    } else {
      dispatch({ type: ADD_CAR_FAILURE });
      callback.onFailure();
    }
  } catch (error) {
    dispatch({ type: ADD_CAR_FAILURE, payload: error });
    callback.onFailure();
  }
};

export const updateCar = dispatch => async (
  { _id, ...data },
  callback = INITIAL_CALLBACK
) => {
  try {
    dispatch({ type: UPDATE_CAR_REQUEST });
    const result = await query({
      endpoint: `car/${_id}`,
      method: 'put',
      data,
    });
    if (result.status === STATUS.OK) {
      dispatch({ type: UPDATE_CAR_SUCCESS, payload: result.data });
      callback.onSuccess();
    } else {
      dispatch({ type: UPDATE_CAR_FAILURE });
      callback.onFailure();
    }
  } catch (error) {
    dispatch({ type: UPDATE_CAR_FAILURE, payload: error });
    callback.onFailure();
  }
};

export const removeCar = dispatch => async (
  id,
  callback = INITIAL_CALLBACK
) => {
  try {
    dispatch({ type: REMOVE_CAR_REQUEST });
    const result = await query({
      endpoint: `car/${id}`,
      method: 'put',
      data: { isActive: false },
    });
    if (result.status === STATUS.OK) {
      dispatch({ type: REMOVE_CAR_SUCCESS, payload: result.data });
      callback.onSuccess();
    } else {
      dispatch({ type: REMOVE_CAR_FAILURE });
      callback.onFailure();
    }
  } catch (error) {
    dispatch({ type: REMOVE_CAR_FAILURE, payload: error });
    callback.onFailure();
  }
};

export const getCar = dispatch => async (id, callback = INITIAL_CALLBACK) => {
  try {
    dispatch({ type: GET_CAR_REQUEST });
    const result = await query({
      endpoint: `car/${id}`,
    });
    if (result.status === STATUS.OK) {
      console.log(result.status);
      console.log(result.data);
      dispatch({ type: GET_CAR_SUCCESS, payload: result.data });
      callback.onSuccess(result.data);
    } else {
      dispatch({ type: GET_CAR_FAILURE });
      callback.onFailure();
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_CAR_FAILURE, payload: error });
    callback.onFailure();
  }
};

export const checkAvailableCar = dispatch => async (
  id,
  callback = INITIAL_CALLBACK
) => {
  try {
    dispatch({ type: CHECK_AVAILABLE_CAR_REQUEST });
    const result = await query({ endpoint: `car/checkAvailableCar/${id}` });
    if (result.status === STATUS.OK) {
      dispatch({ type: CHECK_AVAILABLE_CAR_SUCCESS, payload: result.data });
      callback.onSuccess(result.data);
    } else {
      dispatch({ type: CHECK_AVAILABLE_CAR_FAILURE });
      callback.onFailure();
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: CHECK_AVAILABLE_CAR_FAILURE, payload: error });
    callback.onFailure();
  }
};
