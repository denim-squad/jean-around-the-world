import { Meteor } from 'meteor/meteor';
import { FETCH_PLACES_NAME } from '../../api/places/methods';
import { types } from 'util';

export const
  SHOW_MODAL = 0,
  HIDE_MODAL = 1,
  SET_RADIUS = 2,
  SET_CENTER = 3,
  LOGIN_USER = 4,
  LOGOUT_USER = 5,
  ADD_BLACKLIST = 6,
  REMOVE_BLACKLIST = 7,
  ADD_FAVOURITES = 8,
  REMOVE_FAVOURITES = 9,
  LOGIN = 10,
  SIGNUP = 11,
  SIGNUP_USER = 12,
  REQUEST_PLACES_START = 13,
  RECEIVE_PLACES_SUCCESS = 14,
  RECEIVE_PLACES_FAILURE = 15,
  SET_PLACE_TYPE_AND_QUANTITY = 16,
  REMOVE_PLACE_TYPE = 17,
  UPDATE_RATING = 18,
  UPDATE_BUDGET = 19;

export function showModal(kind) {
  return {
    type: SHOW_MODAL,
    kind
  };
}

export function hideModal() {
  return {
    type: HIDE_MODAL
  };
}

export function setRadius(radius) {
  return {
    type: SET_RADIUS,
    radius
  };
}

export function setMapCenter(coords) {
  return {
    type: SET_CENTER,
    coords
  };
}

export function loginUser(email) {
  return {
    type: LOGIN_USER,
    email
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER
  };
}

export function signupUser(firstName, lastName, email, password) {
  return {
    type: SIGNUP_USER,
    firstName,
    lastName,
    email,
    password
  };
}

export function addBlacklist(blacklist) {
  return {
    type: ADD_BLACKLIST,
    blacklist
  };
}

export function addFavourites(favourite) {
  return {
    type: ADD_FAVOURITES,
    favourite
  };
}

export function removeBlacklist(blacklistToRemove) {
  return {
    type: REMOVE_BLACKLIST,
    blacklist
  };
}

export function removeFavourites(favouriteToRemove) {
  return {
    type: REMOVE_FAVOURITES,
    favouriteToRemove
  };
}

/**
 * Uses Redux-Thunk as an async action that dispatches other actions.
 * This will set placeSearch.places to an array of objects with the format
 * { type, results }, where results is an array of Google nearby place search results.
 * format for results can be found at https://bit.ly/2LRd8YD
 */
export function getPlaces() {
  return async (dispatch, getState) => {
    dispatch(requestPlacesStart());
    const state = getState();
    const { budgetRange, typesAndQuantities, blacklist } = state.placeSearch;
    const { radius, initialCenter } = state.map;
    const typesAndResults = [];

    let callCounter = typesAndQuantities.length;
    typesAndQuantities.forEach((singleTypeAndQuantity) => {
      const { type } = singleTypeAndQuantity;

      Meteor.call(FETCH_PLACES_NAME,
        { initialCenter, radius, budgetRange, type }, (error, result) => {
          if (error) {
            dispatch(receivePlacesFailure(error));
            return;
          }
          typesAndResults.push({
            type, 
            results: result.data.results
          });
          callCounter--;
          if (callCounter < 1) {
            dispatch(receivePlacesSuccess(typesAndResults));
          }
        });
    });
  }
}

function requestPlacesStart() {
  return {
    type: REQUEST_PLACES_START,
    isFetchingPlaces: true
  }
}


function receivePlacesSuccess(places) {
  return {
    type: RECEIVE_PLACES_SUCCESS,
    isFetchingPlaces: false,
    places
  }
}

function receivePlacesFailure(error) {
  return {
    type: RECEIVE_PLACES_FAILURE,
    isFetchingPlaces: false,
    error
  }
}

export function setPlaceTypeAndQuantity(placeType, quantity) {
  return {
    type: SET_PLACE_TYPE_AND_QUANTITY,
    placeType,
    quantity
  }
}

export function removePlaceType(placeType) {
  return {
    type: REMOVE_PLACE_TYPE,
    placeType
  }
}

export function updateRating(rating) {
  return {
    type: UPDATE_RATING,
    rating
  }
}

export function updateBudget(budgetRange) {
  return {
    type: UPDATE_BUDGET,
    budgetRange
  }
}
