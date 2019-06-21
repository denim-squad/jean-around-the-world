import { combineReducers } from 'redux';
import { SHOW_MODAL, HIDE_MODAL, SET_RADIUS, SET_CENTER , LOGIN_USER, LOGOUT_USER,
  GET_PREFERENCES, ADD_BLACKLIST, ADD_FAVOURITES, REMOVE_BLACKLIST, REMOVE_FAVOURITES } from '../actions/index';

let userInfos = [
  { email: "john.sastrillo@gmail.com", firstName: "John", lastName: "Sastrillo",
    preferences: {
      blacklist: ["Wendys"],
      favourites: ["McDonalds", "Marutama", "Coco", "Hailin's Room XD", "Tacofino"]
    }},
  { email: "hailin.zhang@gmail.com", firstName: "Hailin", lastName: "Zhang",
    preferences: {
      blacklist: [],
      favourites: []
    }},
  { email: "jessica.wu@gmail.com", firstName: "Jessica", lastName: "Wu",
    preferences: {
      blacklist: [],
      favourites: []
    }},
  { email: "wesley.ferguson@gmail.com", firstName: "Wesley", lastName: "Ferguson",
    preferences: {
      blacklist: [],
      favourites: []
    }},
]

const initialState = {
  isModalShown: false,
  radius: 1000,
  initialCenter: {
    lat: 49.263749,
    lng: -123.247480
  },
  isSignedIn: false,
  blacklist: [],
  favourites: []
}

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return { ...state, isModalShown: true };
    case HIDE_MODAL:
      return { ...state, isModalShown: false };
    case LOGIN_USER:
      for(let userInfo of userInfos){
        if(userInfo.email === action.email){
          return { ...state, email: action.email, isSignedIn: true, username: `${userInfo.firstName} ${userInfo.lastName}`}
          break;
        }
      }
    case LOGOUT_USER:
      return { ...state, isSignedIn: false, username: "", email: ""};
    default:
      return state;
  }
}

function preferencesReducer(state = initialState, action){
  switch (action.type) {
    case LOGIN_USER:
    for(let userInfo of userInfos){
      if(userInfo.email === action.email){
        return { ...state, blacklist: userInfo.preferences.blacklist, favourites: userInfo.preferences.favourites}
        break;
      }
    }
    case ADD_BLACKLIST:
      let addedBlacklist = state.blacklist.slice();
      addedBlacklist.push(action.blacklist);
      return { ...state, blacklist: addedBlacklist}
    case ADD_FAVOURITES:
      let addedFavourites = state.favourites.slice();
      addedFavourites.push(action.favourite);
      return { ...state, favourites: addedFavourites}
    case REMOVE_BLACKLIST:
      let updatedBlacklist = array.filter(function(value, index, array){
        return action.blacklistToRemove != value;
      })
      return { ...state, blacklist: updatedBlacklist}
    case REMOVE_FAVOURITES:
      let updatedFavourites = array.filter(function(value, index, array){
        return action.favouriteToRemove != value;
      })
      return { ...state, favourites: updatedFavourites}
    case LOGOUT_USER:
      return { ...state, blacklist: [], favourites: []}
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
  preferences: preferencesReducer
});
