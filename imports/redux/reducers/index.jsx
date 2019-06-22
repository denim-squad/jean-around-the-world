import { combineReducers } from 'redux';
import {
  SHOW_MODAL,
  HIDE_MODAL,
  SET_RADIUS,
  SET_CENTER ,
  LOGIN_USER,
  LOGOUT_USER,
  GET_PREFERENCES,
  ADD_BLACKLIST,
  ADD_FAVOURITES,
  REMOVE_BLACKLIST,
  REMOVE_FAVOURITES } from '../actions/index';
import { LOGIN, SIGNUP } from '../../ui/shared_components/navbar/navbar';

// TODO: remove this later
const userInfos = [
  { email: "john.sastrillo@gmail.com", firstName: "John", lastName: "Sastrillo",
    preferences: {
      blacklist: ["Wendys"],
      favourites: ["McDonalds", "Marutama", "Coco", "Hailin's Room XD", "Tacofino"]
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

const initialMapState = {
  radius: 1000,
  initialCenter: {
    lat: 49.263749,
    lng: -123.247480
  }
}

const initialModalState = {
  isModalShown: false,
  modalKind: LOGIN
}

const initialUserState = {
  isSignedIn: false,
  blacklist: [],
  favourites: [],
  fullName: "",
  email: ""
}

function modalReducer(state = initialModalState, action) {
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

function userReducer(state = initialUserState, action) {
  switch (action.type) {
    case LOGIN_USER:
      let userInfo = userInfos.find((info) => {
        return info.email === action.email;
      });
      if(userInfo){
        return { ...state,
          email: action.email,
          isSignedIn: true,
          fullName: `${userInfo.firstName} ${userInfo.lastName}`,
          blacklist: userInfo.preferences.blacklist,
          favourites: userInfo.preferences.favourites
        };
      }
      alert("Invalid login info. Try Again.");
      break; //TODO: remove after reducer refactor
    case LOGOUT_USER:
      return { ...state, isSignedIn: false, fullName: "", email: "", blacklist: [], favourites: [] };
    case ADD_BLACKLIST:
      let addedBlacklist = state.blacklist.slice();
      addedBlacklist.push(action.blacklist);
      return { ...state, blacklist: addedBlacklist };
    case REMOVE_BLACKLIST:
      let updatedBlacklist = Array.filter((value, index, array) => {
        return action.blacklistToRemove !== value;
      })
      return { ...state, blacklist: updatedBlacklist };
    case ADD_FAVOURITES:
      let addedFavourites = state.favourites.slice();
      addedFavourites.push(action.favourite);
      return { ...state, favourites: addedFavourites };
    case REMOVE_FAVOURITES:
      let updatedFavourites = Array.filter((value, index, array) => {
        return action.favouriteToRemove !== value;
      })
      return { ...state, favourites: updatedFavourites };
    default:
      return state;
  }
}

function mapReducer(state = initialMapState, action) {
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
  user: userReducer,
  map: mapReducer,
});
