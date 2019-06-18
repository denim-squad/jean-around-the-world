import { combineReducers } from 'redux';
import { SHOW_MODAL, HIDE_MODAL, SET_RADIUS } from '../actions/index';

const initialState = {
  isModalShown: false,
  radius: 1000,
}

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return { ...state, isModalShown: true };
    case HIDE_MODAL:
      return { ...state, isModalShown: false };
    default:
      return state;
  }
}

function radiusReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RADIUS:
      return { ...state, radius: action.radius };
    default:
      return state;
  }
}

export default combineReducers({
  login: loginReducer,
  radius: radiusReducer,
});
