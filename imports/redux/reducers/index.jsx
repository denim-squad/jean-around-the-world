import { combineReducers } from 'redux';
import {
  SHOW_MODAL,
  HIDE_MODAL,
  SET_RADIUS,
  SET_CENTER,
  LOGIN_USER,
  LOGOUT_USER,
  SIGNUP_USER,
  ADD_BLACKLIST,
  ADD_FAVOURITES,
  REMOVE_BLACKLIST,
  REMOVE_FAVOURITES,
  REQUEST_PLACES_START,
  RECEIVE_PLACES_SUCCESS,
  RECEIVE_PLACES_FAILURE,
  SET_PLACE_TYPE_AND_QUANTITY,
  REMOVE_PLACE_TYPE
} from '../actions/index';
import { LOGIN, SIGNUP } from '../../ui/shared_components/navbar/navbar';
import { UserInfo } from '../../../lib/userInfoCollection';
import {
  MIN_RADIUS,
  MIN_PRICE_LEVEL,
  MAX_PRICE_LEVEL,
} from '../../constants';

const initialMapState = {
  radius: MIN_RADIUS,
  initialCenter: {
    lat: 49.263749,
    lng: -123.247480
  }
};

const initialModalState = {
  isModalShown: false,
  modalKind: LOGIN
}

const initialUserState = {
  isSignedIn: false,
  blacklist: [],
  favourites: [],
  fullName: "",
  email: "",
  userId: ""
}

const initialPlaceSearchState = {
  isFetchingPlaces: false,
  places: [],
  priceRange: { minprice: MIN_PRICE_LEVEL, maxprice: MAX_PRICE_LEVEL },
  typesAndQuantities: new Map(),
  error: undefined
}

function modalReducer(state = initialModalState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
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
      let userQuery = UserInfo.find({ email: action.email, password: action.password }).fetch();
      let userInfo = userQuery[0];
      if (userInfo) {
        return {
          ...state,
          userId: userInfo._id,
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
      return { ...state, isSignedIn: false, fullName: "", userId: "", email: "", blacklist: [], favourites: [] };
    case SIGNUP_USER:
      let query = UserInfo.find({ email: action.email }).fetch();
      let userExists = query[0];
      if (userExists) {
        alert("An account with this email already exists. Proceed to login to continue.");
        break;
      }
      else {
        UserInfo.insert({
          email: action.email,
          firstName: action.firstName,
          lastName: action.lastName,
          password: action.password,
          preferences: { blacklist: [], favourites: [] }
        }, function (err) {
          if (err) {
            console.log(err);
          }
        });
        return {
          ...state,
          email: action.email,
          isSignedIn: true,
          fullName: `${action.firstName} ${action.lastName}`,
          blacklist: [],
          favourites: []
        }
      }
    case ADD_BLACKLIST:
      let matchedUsers = UserInfo.update({ _id: state.userId }, { $push: { "preferences.blacklist": action.blacklist } })
      if (matchedUsers === 0) {
        //TODO: create better error handling
        console.log("Error Updating Blacklist for User")
      }
      let updatedInfo = UserInfo.find({ _id: state.userId }).fetch();
      let info = updatedInfo[0];
      return { ...state, blacklist: info.preferences.blacklist };
    case REMOVE_BLACKLIST:
      //TODO: change this to use MongoToDelete
      let updatedBlacklist = Array.filter((value, index, array) => {
        return action.blacklistToRemove !== value;
      })
      return { ...state, blacklist: updatedBlacklist };
    case ADD_FAVOURITES:
      matchedUsers = UserInfo.update({ _id: state.userId }, { $push: { "preferences.favourites": action.favourite } })
      if (matchedUsers === 0) {
        //TODO: create better error handling
        console.log("Error Updating Favourites for User")
      }
      updatedInfo = UserInfo.find({ userId: state.userId }).fetch();
      info = updatedInfo[0];
      return { ...state, favourites: info.preferences.favourites };
    case REMOVE_FAVOURITES:
      //TODO: change this to use MongoToDelete
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

function placeSearchReducer(state = initialPlaceSearchState, action) {
  switch (action.type) {
    case REQUEST_PLACES_START:
      return { ...state, isFetchingPlaces: action.isFetchingPlaces };
    case RECEIVE_PLACES_SUCCESS:
      return {
        ...state,
        isFetchingPlaces: action.isFetchingPlaces,
        places: action.places
      };
    case RECEIVE_PLACES_FAILURE:
      return {
        ...state,
        isFetchingPlaces: action.isFetchingPlaces,
        error: action.error
      };
    case SET_PLACE_TYPE_AND_QUANTITY:
      return {
        ...state,
        typesAndQuantities: state.typesAndQuantities.set(action.placeType, action.quantity)
      };
    case REMOVE_PLACE_TYPE:
      return {
        ...state,
        typesAndQuantities: state.typesAndQuantities.delete(action.placeType)
      };
    default:
      return state;
  }
}

export default combineReducers({
  modal: modalReducer,
  user: userReducer,
  map: mapReducer,
  placeSearch: placeSearchReducer
});
