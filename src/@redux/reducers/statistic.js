import {
  GET_HUB_CAR_FAILURE,
  GET_HUB_CAR_REQUEST,
  GET_HUB_CAR_SUCCESS,
  SET_SELECTED_CAR_MODEL,
  SET_SELECTED_CAR,
  UPDATE_CAR_FAILURE,
  UPDATE_CAR_REQUEST,
  UPDATE_CAR_SUCCESS,
  REMOVE_CAR_FAILURE,
  REMOVE_CAR_REQUEST,
  REMOVE_CAR_SUCCESS,
} from '../constants/statistic';

const INITIAL_STATE = {
  allCarFromHub: [],
  loading: false,
  carModels: [],
  selectedCarModel: null,
  hub: {},
  selectedCar: null,
  loadingUpdateCar: false,
  loadingRemoveCar: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_HUB_CAR_REQUEST:
      return { ...state, loading: true };
    case GET_HUB_CAR_SUCCESS:
      return {
        ...state,
        loading: false,
        allCarFromHub: action.payload.allCarFromHub,
        carModels: action.payload.carModels,
        hub: action.payload.hub,
      };
    case GET_HUB_CAR_FAILURE:
      return { ...state, loading: false };
    case SET_SELECTED_CAR_MODEL:
      return { ...state, selectedCarModel: action.payload };
    case SET_SELECTED_CAR:
      return { ...state, selectedCar: action.payload };

    case UPDATE_CAR_REQUEST:
      return { ...state, loadingUpdateCar: true };
    case UPDATE_CAR_SUCCESS:
      return {
        ...state,
        loadingUpdateCar: false,
        allCarFromHub: state.allCarFromHub.map(item => {
          if (item._id === action.payload._id) {
            return { ...action.payload, carModel: item.carModel };
          }
          return item;
        }),
      };
    case UPDATE_CAR_FAILURE:
      return { ...state, loadingUpdateCar: false };

    case REMOVE_CAR_REQUEST:
      return { ...state, loadingRemoveCar: true };

    case REMOVE_CAR_SUCCESS:
      return {
        ...state,
        allCarFromHub: state.allCarFromHub.filter(
          item => item._id !== action.payload._id
        ),
        loadingRemoveCar: false,
      };

    case REMOVE_CAR_FAILURE:
      return { ...state, loadingRemoveCar: false };
    default:
      return { ...state };
  }
};
