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

// uses redux-thunk
export function getPlaces() {
  return async (dispatch, getState) => {
    console.log("in getPlaces action");
    dispatch(requestPlacesStart());
    const state = getState();
    const { budgetRange, typesAndQuantities, blacklist } = state.placeSearch;
    const { radius, initialCenter } = state.map;
    const typesAndResults = new Map();

    console.log("before forEach, typesAndQuantities:", typesAndQuantities);
    
    let callCounter = typesAndQuantities.size;
    typesAndQuantities.forEach((quantity, type, map) => {
        Meteor.call(FETCH_PLACES_NAME, 
          {initialCenter, radius, budgetRange, type}, (error, result) => {
            console.log("in async callback");
            if (error) {
              console.log("error in async callback:", error);
              dispatch(receivePlacesFailure(error));
              return;
            }
            console.log("no error in callback, result:", result);
            typesAndResults.set(type, result.data.results);
            callCounter--;
            if (callCounter < 1) {
              console.log("in last async callback, typesAndResults:", typesAndResults);
              dispatch(receivePlacesSuccess(typesAndResults));
            }
          });
    });
    // TODO filter results

    // try {
    //   const listOfPlaces = convertPlacesPromisesToValidList(placesPromises, quantities, blacklist);
    //   dispatch(receivePlacesSuccess(listOfPlaces));
    // } catch (error) {
    //   dispatch(receivePlacesFailure(error));
    // }
  }
}

/**
 * Given an array of place API response promises from getNearbyPlaces,
 * how many of each type, and the list of blacklisted places,
 * returns an array of valid places with the correct number of each type.
 * If any promise returns an error, immediately throws the error.
 * @param {Array} places
 * @param {Array} quantities
 * @param {Array} blacklist
 */
async function convertPlacesPromisesToValidList(places, quantities, blacklist = []) {
  const listOfPlaces = [];
  console.log("in convertPlacesPromisesToValidList, placesPromises:", places);

  places.forEach(async (promise, promiseIndex) => {
    const response = await promise;
    if (response.error) {
      throw response.error;
    }
    const json = await response.json();
    const results = json.body.results;
    const quantity = quantities[promiseIndex];

    for (let i = 0; i < quantity && i < results.length; i++) {
      let isBlacklisted = false;
      for (const blacklistedName of blacklist) {
        if (results[i].name.includes(blacklistedName)) {
          isBlacklisted = true;
          break;
        }
      }
      isBlacklisted ?
        quantity++ // need to get another item
        : listOfPlaces.push(results[i]);
    }
  });

  await Promise.all(places);
  return listOfPlaces;
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
