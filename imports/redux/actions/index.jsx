import getNearbyPlaces from '../../api/places';

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
  REQUEST_LOCATIONS_START = 12,
  RECEIVE_LOCATIONS_SUCCESS = 13,
  RECEIVE_LOCATIONS_FAILURE = 14;

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

function requestLocationsStart() {
  return {
    type: REQUEST_LOCATIONS_START,
    isFetchingPlaces: true
  }
}


function receiveLocationsSuccess(locations) {
  return {
    type: RECEIVE_LOCATIONS_SUCCESS,
    isFetchingPlaces: false,
    locations
  }
}

function receiveLocationsFailure(error) {
  return {
    type: RECEIVE_LOCATIONS_FAILURE,
    isFetchingPlaces: false,
    error
  }
}

// uses redux-thunk
export function getPlaces() {
  return (dispatch, getState) => {
    dispatch(requestLocationsStart());
    const { location, radius, price, typesAndQuantities, blacklist } = getState();

    const listOfPlaces = [];
    Promise.all(
      typesAndQuantities.map(({ type, quantity }) => {
        return getNearbyPlaces(location, radius, price, type)
          .then((response) => {
            const results = response.json.results;
            // todo extract and change logic to something smarter if needed
            for (let i = 0; i < quantity; i++) {
              let isBlacklisted = false;
              for (const blacklistedName of blacklist) {
                if (results[i].name.contains(blacklistedName)) {
                  isBlacklisted = true;
                  break;
                }
              }
              isBlacklisted ?
                quantity++ // need to get another item
                : listOfPlaces.push(results[i]);
            }
          })
      })
    )
      .then(() => {
        dispatch(receiveLocationsSuccess(listOfPlaces));
      })
      .catch((error) => {
        dispatch(receiveLocationsFailure(error));
      })
  }
}