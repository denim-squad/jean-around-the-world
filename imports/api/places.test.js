import getNearbyPlaces from './places';
import { assert, expect } from 'chai';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const location = {
  lat: 49.263749,
  lng: -123.247480
},
radius = 2000,
price = 1,
type = 'meal_takeaway';

let results = [];
describe('getPlaces', () => {
  it('returns results in a promise', function () {
    const response = getNearbyPlaces(location, radius, price, type);
    expect(response).to.be.a('Promise');
    response.then((searchResponse) => {
      results = searchResponse.json.results;
      assert.isArray(results);
      assert.isNotEmpty(results);
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
