export const SHOW_MODAL = 0, HIDE_MODAL = 1, SET_RADIUS = 2;


export function showModal() {
  return {
    type: SHOW_MODAL
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
