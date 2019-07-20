import getNearbyPlaces from './places';
import {
  assert,
  expect
} from 'chai';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  getPlaces,
  REQUEST_PLACES_START,
  RECEIVE_PLACES_SUCCESS,
  RECEIVE_PLACES_FAILURE
} from '../redux/actions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const location = {
    lat: 49.263749,
    lng: -123.247480
  },
  radius = 4000,
  budgetRange = [1, 3],
  type = 'meal_takeaway';

let results = [];
describe('getNearbyPlaces', () => {
  it('returns results in a promise', function () {
    const response = getNearbyPlaces(location, radius, budgetRange, type);
    expect(response).to.be.a('Promise');
    response.then((searchResponse) => {
      results = searchResponse.json.results;
      assert.isArray(results);
      assert.isNotEmpty(results, "results array was empty");
    })
      .catch(error => {
        throw error;
      })
  });

  it('only returns results with the specified type', function () {
    results.forEach((result) => {
      const filteredTypes = result.types.filter((resultType) => {
        return resultType === type; // type that was searched for
      });
      assert.isNotEmpty(filteredTypes);
    })
  });
})

const initialState = {
  map: {
    initialCenter: location
  },
  placeSearch: {
    radius,
    budgetRange,
    typesAndQuantities: [{
        type: 'meal_takeaway',
        quantity: 2
      },
      {
        type: 'cafe',
        quantity: 3
      }
    ],
    blacklist: [
      'subway'
    ]
  }
}

describe('getPlaces action function', function () {
  //todo figure out how to mock
  // it('dispatches failure on error', function () {
  //   let emptyStore = mockStore();
  //   try {
  //     emptyStore.dispatch(getPlaces());
  //   } catch (error) {

  //   }
  // })

  let store = mockStore(initialState);

  it('dispatches the correct actions on success', function () {
    store.dispatch(getPlaces());
    const expectedActions = [
      REQUEST_PLACES_START, RECEIVE_PLACES_SUCCESS
    ];
    store.getActions().map((action) => {
      expect(expectedActions).to.contain(action.type);
    })
  });
})

