import { Meteor } from 'meteor/meteor';
import { FETCH_PLACES_NAME } from '../../api/places/methods';

export const SHOW_MODAL = 0;
export const HIDE_MODAL = 1;
export const SET_RADIUS = 2;
export const SET_CENTER = 3;
export const LOGIN_USER = 4;
export const LOGOUT_USER = 5;
export const ADD_BLACKLIST = 6;
export const REMOVE_BLACKLIST = 7;
export const ADD_FAVOURITES = 8;
export const REMOVE_FAVOURITES = 9;
export const LOGIN = 10;
export const SIGNUP = 11;
export const SIGNUP_USER = 12;
export const REQUEST_PLACES_START = 13;
export const RECEIVE_PLACES_SUCCESS = 14;
export const RECEIVE_PLACES_FAILURE = 15;
export const SET_PLACE_TYPE_AND_QUANTITY = 16;
export const REMOVE_PLACE_TYPE = 17;
export const UPDATE_RATING = 18;
export const UPDATE_BUDGET = 19;
export const SAVE_PREVIOUS_TRAVEL = 20;
export const DELETE_PREVIOUS_TRAVEL = 21;
export const SIGNUP_USER_ERROR = 22;
export const SAVE_PREVIOUS_TRAVEL_FAILURE = 23;
export const DELETE_PREVIOUS_TRAVEL_FAILURE = 24;
export const GET_PREVIOUS_TRAVEL = 25;
export const CALENDAR = 26;

export function showModal(kind) {
  return {
    type: SHOW_MODAL,
    kind,
  };
}

export function hideModal() {
  return {
    type: HIDE_MODAL,
  };
}

export function setRadius(radius) {
  return {
    type: SET_RADIUS,
    radius,
  };
}

export function setMapCenter(coords) {
  return {
    type: SET_CENTER,
    coords,
  };
}

export function loginUser(email) {
  return {
    type: LOGIN_USER,
    email,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}

function signupUserSuccess(userId, firstName, lastName, email) {
  return {
    type: SIGNUP_USER,
    userId,
    firstName,
    lastName,
    email,
  };
}

function signupUserFailure(error) {
  return {
    type: SIGNUP_USER_ERROR,
    error
  }
}

export function signupUser(firstname, lastname, email, password) {
  return (dispatch) => {
    const query = Meteor.users.find({ 'emails.address': email }).fetch();
    const userExists = query[0];
    if (userExists) {
      dispatch(signupUserFailure('An account with this email already exists. Proceed to login to continue.'));
    } else {
      Accounts.createUser({
        email: email,
        password: password,
        profile: {
          firstName: firstname,
          lastName: lastname,
          previousTravels: [],
          preferences: { blacklist: [], favourites: [] },
        },
      }, (err) => {
        if (err) {
          dispatch(signupUserFailure(err));
        } else {
          const userInfo = Meteor.users.find({ 'emails.address': email }).fetch();
          const newUser = userInfo[0];
          dispatch(signupUserSuccess(newUser._id, firstname, lastname, email));
        }
      });
    }
  }
}

export function addBlacklist(blacklist) {
  return {
    type: ADD_BLACKLIST,
    blacklist,
  };
}

export function addFavourites(favourite) {
  return {
    type: ADD_FAVOURITES,
    favourite,
  };
}

export function removeBlacklist(blacklistToRemove) {
  return {
    type: REMOVE_BLACKLIST,
    blacklistToRemove,
  };
}

export function removeFavourites(favouriteToRemove) {
  return {
    type: REMOVE_FAVOURITES,
    favouriteToRemove,
  };
}

function savePrevTravelSuccess() {
  return {
    type: SAVE_PREVIOUS_TRAVEL,
  };
}

function savePrevTravelFailure(errMessage) {
  return {
    type: SAVE_PREVIOUS_TRAVEL_FAILURE,
    errMessage,
  };
}

export function savePrevTravel(prevTravel, userId) {
  return (dispatch) => {
    Meteor.users.update({ _id: userId },
      { $push: { 'profile.previousTravels': prevTravel } },
      (err, matchedUsers) => {
        if (err || matchedUsers === 0) {
          dispatch(savePrevTravelFailure(err));
        } else {
          dispatch(savePrevTravelSuccess());
        }
      });
  };
}

function deletePrevTravelSuccess(toDeleteTravelName) {
  return {
    type: DELETE_PREVIOUS_TRAVEL,
    toDeleteTravelName,
  };
}

function deletePrevTravelFailure(errMessage) {
  return {
    type: DELETE_PREVIOUS_TRAVEL_FAILURE,
    errMessage,
  };
}

export function deletePrevTravel(toDeleteTravelName, userId) {
  return (dispatch) => {
    Meteor.users.update({ _id: userId },
      { $pull: { 'profile.previousTravels': { name: toDeleteTravelName } } },
      (err, matchedUsers) => {
        if (err || matchedUsers === 0) {
          dispatch(deletePrevTravelFailure(err));
        } else {
          dispatch(deletePrevTravelSuccess());
        }
      });
  };
}

export function getPrevTravel(travelName, userId) {
  return {
    type: GET_PREVIOUS_TRAVEL,
    travelName,
    userId,
  };
}

function requestPlacesStart() {
  return {
    type: REQUEST_PLACES_START,
    isFetchingPlaces: true,
  };
}


function receivePlacesSuccess(places) {
  return {
    type: RECEIVE_PLACES_SUCCESS,
    isFetchingPlaces: false,
    places,
  };
}

function receivePlacesFailure(error) {
  return {
    type: RECEIVE_PLACES_FAILURE,
    isFetchingPlaces: false,
    error,
  };
}

/**
 * Uses Redux-Thunk as an async action that dispatches other actions.
 * This will set placeSearch.places to an array of objects with the format
 * { type, results }, where results is an array of Google nearby place search results.
 * format for results can be found at https://bit.ly/2LRd8YD
 */
export function getPlaces() {
  return (dispatch, getState) => {
    dispatch(requestPlacesStart());
    const state = getState();
    const { budgetRange, typesAndQuantities, blacklist } = state.placeSearch;
    const { radius, initialCenter } = state.map;
    const typesAndResults = [];

    let callCounter = typesAndQuantities.length;
    typesAndQuantities.forEach((singleTypeAndQuantity) => {
      const { type } = singleTypeAndQuantity;

      Meteor.call(FETCH_PLACES_NAME,
        {
          initialCenter, radius, budgetRange, type,
        }, (error, result) => {
          if (error) {
            dispatch(receivePlacesFailure(error));
            return;
          }
          typesAndResults.push({
            type,
            results: result.data.results,
          });
          callCounter -= 1;
          if (callCounter < 1) {
            dispatch(receivePlacesSuccess(typesAndResults));
          }
        });
    });
  };
}

export function setPlaceTypeAndQuantity(placeType, quantity) {
  return {
    type: SET_PLACE_TYPE_AND_QUANTITY,
    placeType,
    quantity,
  };
}

export function removePlaceType(placeType) {
  return {
    type: REMOVE_PLACE_TYPE,
    placeType,
  };
}

export function updateRating(rating) {
  return {
    type: UPDATE_RATING,
    rating,
  };
}

export function updateBudget(budgetRange) {
  return {
    type: UPDATE_BUDGET,
    budgetRange,
  };
}
