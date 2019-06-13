import { combineReducers } from 'redux';
import { SHOW_MODAL, HIDE_MODAL } from '../actions/index';

const initialState = {
  isModalShown: false
  // todo
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

export default combineReducers({
  login: loginReducer
});
