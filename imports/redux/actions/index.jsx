export const SHOW_MODAL = 0, HIDE_MODAL = 1, SET_RADIUS = 2, SET_CENTER = 3, LOGIN_USER = 4, LOGOUT_USER = 5,
  ADD_BLACKLIST = 6, ADD_FAVOURITES = 7, REMOVE_BLACKLIST = 8, REMOVE_FAVOURITES = 9;

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

export function addBlacklist(blacklist) {
  return {
    type: ADD_BLACKLIST,
    blacklist
  }
}

export function addFavourites(favourite) {
  return {
    type: ADD_FAVOURITES,
    favourite
  }
}

export function removeBlacklist(blacklistToRemove){
  return {
    type: REMOVE_BLACKLIST,
    blacklist
  }
}

export function removeFavourites(favouriteToRemove){
  return {
    type: REMOVE_FAVOURITES,
    favouriteToRemove
  }
}
