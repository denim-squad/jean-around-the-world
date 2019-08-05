import { Meteor } from 'meteor/meteor';
import { FETCH_PLACES_NAME } from '../../api/places/methods';
import filterResults from '../../api/places/filterResults';

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
export const UPDATE_PLACES = 22;

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

export function signupUser(firstName, lastName, email, password) {
  return {
    type: SIGNUP_USER,
    firstName,
    lastName,
    email,
    password,
  };
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

export function savePrevTravel(prevTravel) {
  return {
    type: SAVE_PREVIOUS_TRAVEL,
    prevTravel,
  };
}

export function deletePrevTravel(toDeleteTravel) {
  return {
    type: DELETE_PREVIOUS_TRAVEL,
    toDeleteTravel,
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
    const { budgetRange, typesAndQuantities, minimumAcceptableRating } = state.placeSearch;
    const { radius, initialCenter } = state.map;
    const { blacklist } = state.user;
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
          const results = filterResults(result.data.results, minimumAcceptableRating, blacklist);
          typesAndResults.push({
            type,
            results,
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

export function updatePlaces(places) {
  return {
    type: UPDATE_PLACES,
    places,
  };
}
