import { assert, expect } from 'chai';
import { Meteor } from 'meteor/meteor';
import { FETCH_PLACES_NAME } from '../methods';

if (Meteor.isServer) {
  const location = {
    lat: 49.263749,
    lng: -123.247480
  };
  const radius = 4000;
  const budgetRange = [1, 3];
  const type = 'meal_takeaway';

  let results = [];
  describe('fetchPlaces', function () {
    it('returns results in a promise', function () {
      const fetchPlaces = Meteor.methods(FETCH_PLACES_NAME);
      console.log("fetchPlaces:", fetchPlaces);
      const response = fetchPlaces.call(location, radius, budgetRange, type);
      console.log("response:", response);

      expect(response).to.be.a('Promise');
      response.then((searchResponse) => {
        results = searchResponse.data.results;
        assert.isArray(results);
        assert.isNotEmpty(results, "results array was empty");
      });
    });
  })
}



