import { combineReducers } from 'redux';
import { SHOW_MODAL, HIDE_MODAL, SET_RADIUS, SET_CENTER , LOGIN_USER, LOGOUT_USER} from '../actions/index';

const initialState = {
  isModalShown: false,
  radius: 1000,
  initialCenter: {
    lat: 49.263749,
    lng: -123.247480
  },
  username: 0,
  preferences: [],
  blacklist: [],
  userInfo: {}
}

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return { ...state, isModalShown: true };
    case HIDE_MODAL:
      return { ...state, isModalShown: false };
    case LOGIN_USER:
      return { ...state, isSignedIn: true, username: action.username};
    case LOGOUT_USER:
      return { ...state, isSignedIn: false, username: ""};
    default:
      return state;
  }
}

function mapReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RADIUS:
      return { ...state, radius: action.radius };
    case SET_CENTER:
      return { ...state, initialCenter: action.coords };
    default:
      return state;
  }
}

export default combineReducers({
  login: loginReducer,
  map: mapReducer,
});
