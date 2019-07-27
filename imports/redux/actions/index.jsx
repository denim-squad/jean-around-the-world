export const SHOW_MODAL = 0, HIDE_MODAL = 1;
export const SET_RADIUS = 2, SET_CENTER = 3;
export const LOGIN_USER = 4, LOGOUT_USER = 5;
export const ADD_BLACKLIST = 6, REMOVE_BLACKLIST = 7;
export const ADD_FAVOURITES = 8, REMOVE_FAVOURITES = 9;
export const LOGIN = 10, SIGNUP = 11;
export const SIGNUP_USER = 12;

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

export function loginUser(email, password) {
  return {
    type: LOGIN_USER,
    email,
    password
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

export function removeBlacklist(blacklistToRemove){
  return {
    type: REMOVE_BLACKLIST,
    blacklistToRemove
  };
}

export function removeFavourites(favouriteToRemove){
  return {
    type: REMOVE_FAVOURITES,
    favouriteToRemove
  };
}
