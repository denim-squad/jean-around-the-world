import { fetchPlaces } from './fetchPlaces';
import { assert, expect } from 'chai';
import { Meteor } from 'meteor/meteor';

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
describe('fetchPlaces', (function() {
  
}))


