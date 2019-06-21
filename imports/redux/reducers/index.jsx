import { combineReducers } from 'redux';
import { SHOW_MODAL, HIDE_MODAL, SET_RADIUS, SET_CENTER , LOGIN_USER, LOGOUT_USER,
  GET_PREFERENCES, ADD_BLACKLIST, ADD_FAVOURITES, REMOVE_BLACKLIST, REMOVE_FAVOURITES } from '../actions/index';
import { LOGIN, SIGNUP } from '../../ui/shared_components/navbar/navbar';

let userInfos = [
  { email: "john.sastrillo@gmail.com", firstName: "John", lastName: "Sastrillo",
    preferences: {
      blacklist: [],
      favourites: []
    }
  },
  { email: "hailin.zhang@gmail.com", firstName: "Hailin", lastName: "Zhang",
    preferences: {
      blacklist: [],
      favourites: []
    }
  },
  { email: "jessica.wu@gmail.com", firstName: "Jessica", lastName: "Wu",
    preferences: {
      blacklist: [],
      favourites: []
    }
  },
  { email: "wesley.ferguson@gmail.com", firstName: "Wesley", lastName: "Ferguson",
    preferences: {
      blacklist: [],
      favourites: []
    }
  },
]

const initialState = {
  isModalShown: false,
  modalKind: LOGIN,
  radius: 1000,
  initialCenter: {
    lat: 49.263749,
    lng: -123.247480
  },
  isSignedIn: false,
  username: ""
}

function modalReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return { ...state,
        isModalShown: true,
        modalKind: action.kind
      };
    case HIDE_MODAL:
      return { ...state, isModalShown: false };
    default:
      return state;
  }
}

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      for (let userInfo of userInfos) {
        if (userInfo.email === action.email) {
          return { ...state,
            isSignedIn: true,
            username: `${userInfo.firstName} ${userInfo.lastName}`
          }
        }
      }
      alert("Invalid login info. Try Again.");
      break;
    case LOGOUT_USER:
      return { ...state, isSignedIn: false, username: ""};
    default:
      return state;
  }
}

function preferencesReducer(state = initialState, action){
  switch (action.type) {
    case GET_PREFERENCES:
      return []; //stub
    case ADD_BLACKLIST:
      return []; //stub
    case ADD_FAVOURITES:
      return []; //stub
    case REMOVE_BLACKLIST:
      return []; //stub
    case REMOVE_FAVOURITES:
      return []; //stub
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
  modal: modalReducer,
  login: loginReducer,
  map: mapReducer,
  preferences: preferencesReducer
});
