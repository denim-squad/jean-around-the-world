export const SHOW_MODAL = 0, HIDE_MODAL = 1, SET_RADIUS = 2, SET_CENTER = 3, LOGIN_USER = 4, LOGOUT_USER = 5;

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

export function loginUser(username) {
  return {
    type: LOGIN_USER,
    username
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER
  };
}
