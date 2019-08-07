/* eslint-disable comma-dangle */
import { combineReducers } from 'redux';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
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
  UPDATE_BUDGET,
  SAVE_PREVIOUS_TRAVEL,
  DELETE_PREVIOUS_TRAVEL,
  SIGNUP_USER_ERROR,
  CALENDAR,
} from '../actions/index';
import { LOGIN } from '../../ui/shared_components/navbar/navbar';
import {
  MIN_RADIUS,
  DEFAULT_RATING,
  DEFAULT_BUDGET_RANGE,
} from '../../constants';

const initialMapState = {
  radius: MIN_RADIUS,
  initialCenter: {
    lat: 49.263749,
    lng: -123.247480,
  },
};

const initialModalState = {
  isModalShown: false,
  modalKind: LOGIN,
};

const initialUserState = {
  isSignedIn: false,
  blacklist: [],
  favourites: [],
  previousTravels: [],
  fullName: '',
  email: '',
  userId: '',
};

const initialPlaceSearchState = {
  isFetchingPlaces: false,
  typesAndQuantities: [],
  minimumAcceptableRating: DEFAULT_RATING,
  budgetRange: DEFAULT_BUDGET_RANGE,
  places: [],
  error: undefined,
};

function modalReducer(state = initialModalState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        isModalShown: true,
        modalKind: action.kind,
      };
    case HIDE_MODAL:
      return { ...state, isModalShown: false };
    default:
      return state;
  }
}
function userReducer(state = initialUserState, action) {
  switch (action.type) {
    case LOGIN_USER: {
      const userQuery = Meteor.users.find({ 'emails.address': action.email }).fetch();
      const userInfo = userQuery[0];
      if (userInfo) {
        return {
          ...state,
          userId: userInfo._id,
          email: action.email,
          isSignedIn: true,
          fullName: `${userInfo.profile.firstName} ${userInfo.profile.lastName}`,
          blacklist: userInfo.profile.preferences.blacklist,
          favourites: userInfo.profile.preferences.favourites,
          previousTravels: userInfo.profile.previousTravels
        };
      }
      return state;
    }
    case LOGOUT_USER:
      return {
        ...state, isSignedIn: false, fullName: '', userId: '', email: '', blacklist: [], favourites: [],
      };
    case SIGNUP_USER: {
      return {
        ...state,
        userId: action.userId,
        email: action.email,
        isSignedIn: true,
        fullName: `${action.firstName} ${action.lastName}`,
        blacklist: [],
        favourites: [],
        previousTravels: [],
      };
    }
    case SIGNUP_USER_ERROR:
      alert(action.error);
      return {
        ...state, isSignedIn: false, fullName: '', userId: '', email: '', blacklist: [], favourites: [],
      };
    case ADD_BLACKLIST: {
      const matchedUsers = Meteor.users.update({ _id: state.userId }, { $push: { 'profile.preferences.blacklist': action.blacklist } });
      if (matchedUsers === 0) {
        // TODO: create better error handling
        console.log('Error Updating Blacklist for User');
      }
      const updatedInfo = Meteor.users.find({ _id: state.userId }).fetch();
      const info = updatedInfo[0];
      return { ...state, blacklist: info.profile.preferences.blacklist };
    }
    case REMOVE_BLACKLIST: {
      const removedBlacklistUsers = Meteor.users.update({ _id: state.userId }, { $pull: { 'profile.preferences.blacklist': action.blacklistToRemove } });
      if (removedBlacklistUsers === 0) {
        // TODO: create better error handling
        console.error('Error Removing From Blacklist');
      }
      const updatedUsers = Meteor.users.find({ _id: state.userId }).fetch();
      const updatedRemoveInfo = updatedUsers[0];
      return { ...state, blacklist: updatedRemoveInfo.profile.preferences.blacklist };
    }
    case ADD_FAVOURITES: {
      const matchedUsers = Meteor.users.update({ _id: state.userId }, { $push: { 'profile.preferences.favourites': action.favourite } });
      if (matchedUsers === 0) {
        // TODO: create better error handling
        console.error('Error Updating Favourites for User');
      }
      const updatedInfo = Meteor.users.find({ userId: state.userId }).fetch();
      const info = updatedInfo[0];
      return { ...state, favourites: info.profile.preferences.favourites };
    }
    case REMOVE_FAVOURITES: {
      const matchedUsers = Meteor.users.update({ _id: state.userId }, { $pull: { 'profile.preferences.favourites': action.favouriteToRemove } });
      if (!matchedUsers) {
        // TODO: create better error handling
        console.error('Error Removing From Favourites');
      }
      const updatedInfo = Meteor.users.find({ _id: state.userId }).fetch();
      const info = updatedInfo[0];
      return { ...state, favourites: info.profile.preferences.favourites };
    }
    case SAVE_PREVIOUS_TRAVEL: {
      // may not be able to save to meteor a javascript object -- TEST THIS
      const matchedUsers = Meteor.users.update({ _id: state.userId }, { $push: { 'profile.previousTravels': action.prevTravel } });
      if (!matchedUsers) {
        // TODO: create better error handling
        console.error('Error Saving Travel');
      }
      const updatedInfo = Meteor.users.find({ userId: state.userId }).fetch();
      const info = updatedInfo[0];
      return { ...state, previousTravels: info.profile.previousTravels };
    }
    case DELETE_PREVIOUS_TRAVEL: {
      const matchedUsers = Meteor.users.update({ _id: state.userId }, { $pull: { 'profile.previousTravels': action.toDeleteTravel } });
      if (matchedUsers == 0) {
        // TODO: create better error handling
        console.error('Error Deleting Travel');
      }
      const updatedInfo = Meteor.users.find({ userId: state.userId }).fetch();
      const info = updatedInfo[0];
      return { ...state, previousTravels: info.profile.previousTravels };
    }
    default:
  }
  return state;
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
        places: action.places,
      };
    case RECEIVE_PLACES_FAILURE:
      return {
        ...state,
        isFetchingPlaces: action.isFetchingPlaces,
        error: action.error,
      };
    case SET_PLACE_TYPE_AND_QUANTITY: {
      /**
       * Unsure if this check will work, but trying to fix intermittent errors
       * relating to previous app state causing typesAndQuantities to be an unknown object
       */
      if (!Array.isArray(state.typesAndQuantities)) {
        // eslint-disable-next-line no-param-reassign
        state = initialPlaceSearchState;
      }
      const changedTypesAndQuantities = state.typesAndQuantities.filter(
        typeAndQuantity => typeAndQuantity.type !== action.placeType,
      );
      changedTypesAndQuantities.push({
        type: action.placeType,
        quantity: action.quantity,
      });
      return {
        ...state,
        typesAndQuantities: changedTypesAndQuantities,
      };
    }
    case REMOVE_PLACE_TYPE: {
      const filteredTypesAndQuantities = state.typesAndQuantities.filter(
        typeAndQuantity => typeAndQuantity.type !== action.placeType,
      );
      return {
        ...state,
        typesAndQuantities: filteredTypesAndQuantities,
      };
    }
    case UPDATE_RATING:
      return {
        ...state,
        minimumAcceptableRating: action.rating,
      };
    case UPDATE_BUDGET:
      return {
        ...state,
        budgetRange: action.budgetRange,
      };
    default:
      return state;
  }
}

export default combineReducers({
  modal: modalReducer,
  user: userReducer,
  map: mapReducer,
  placeSearch: placeSearchReducer,
});
