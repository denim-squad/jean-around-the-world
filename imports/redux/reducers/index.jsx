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
  REMOVE_PLACE_TYPE,
  UPDATE_RATING,
  UPDATE_BUDGET
} from '../actions/index';
import { LOGIN } from '../../ui/shared_components/navbar/navbar';
import {
  MIN_RADIUS,
  DEFAULT_RATING,
  DEFAULT_BUDGET_RANGE
} from '../../constants';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

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
  typesAndQuantities: new Map(),
  minimumAcceptableRating: DEFAULT_RATING,
  budgetRange: DEFAULT_BUDGET_RANGE,
  places: [],
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
      let userQuery = Meteor.users.find({ 'emails.address': action.email }).fetch();
      let userInfo = userQuery[0];
      if (userInfo) {
        return {
          ...state,
          userId: userInfo._id,
          email: action.email,
          isSignedIn: true,
          fullName: `${userInfo.profile.firstName} ${userInfo.profile.lastName}`,
          blacklist: userInfo.profile.preferences.blacklist,
          favourites: userInfo.profile.preferences.favourites
        };
      }
    case LOGOUT_USER:
      return { ...state, isSignedIn: false, fullName: "", userId: "", email: "", blacklist: [], favourites: [] };
    case SIGNUP_USER:
      let query = Meteor.users.find({ 'emails.address': action.email }).fetch();
      let userExists = query[0];
      if (userExists) {
        alert("An account with this email already exists. Proceed to login to continue.");
        break;
      }
      else {
        const userId = Accounts.createUser({
          email: action.email,
          password: action.password,
          profile: {
            firstName: action.firstName,
            lastName: action.lastName,
            preferences: { blacklist: [], favourites: [] }
          }
        })
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
      let matchedUsers = Meteor.users.update({ _id: state.userId }, { $push: { "profile.preferences.blacklist": action.blacklist } })
      if (matchedUsers === 0) {
        //TODO: create better error handling
        console.log("Error Updating Blacklist for User")
      }
      let updatedInfo = Meteor.users.find({ _id: state.userId }).fetch();
      let info = updatedInfo[0];
      return { ...state, blacklist: info.profile.preferences.blacklist };
    case REMOVE_BLACKLIST:
      console.log("Reached Reducer");
      let removedBlacklistUsers = UserInfo.update({_id: state.userId}, {$pull:{"preferences.blacklist": action.blacklistToRemove}})
      if (removedBlacklistUsers === 0){
        console.log("Error Removing From Blacklist")
      }
      let updatedUsers = UserInfo.find({_id: state.userId}).fetch();
      let updatedRemoveInfo = updatedUsers[0];
      return { ...state, blacklist: updatedRemoveInfo.preferences.blacklist };
    case ADD_FAVOURITES:
      matchedUsers = Meteor.users.update({ _id: state.userId }, { $push: { "profile.preferences.favourites": action.favourite } })
      if (matchedUsers === 0) {
        //TODO: create better error handling
        console.log("Error Updating Favourites for User")
      }
      updatedInfo = Meteor.users.find({ userId: state.userId }).fetch();
      info = updatedInfo[0];
      return { ...state, favourites: info.profile.preferences.favourites };
    case REMOVE_FAVOURITES:
      matchedUsers = UserInfo.update({_id: state.userId}, {$pull:{"preferences.favourites": action.favouriteToRemove}})
      if (matchedUser === 0){
        console.log("Error Removing From Favourites")
      }
      updatedInfo = UserInfo.find({_id: state.userId}).fetch();
      info = updatedInfo[0];
      return { ...state, favourites: info.preferences.favourites };
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
    case UPDATE_RATING:
      return {
        ...state,
        minimumAcceptableRating: action.rating
      }
    case UPDATE_BUDGET:
      return {
        ...state,
        budgetRange: action.budgetRange
      }
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
