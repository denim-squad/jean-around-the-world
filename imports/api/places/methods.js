import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Meteor } from 'meteor/meteor';
import { receiveLogs } from '../../redux/actions'

export const FETCH_PLACES_NAME = 'fetchPlaces';

const fetchPlacesSchema = new SimpleSchema({
  initialCenter: Object,
  radius: SimpleSchema.Integer,
  budgetRange: [SimpleSchema.Integer, SimpleSchema.Integer],
  type: String
});

export const fetchPlaces = new ValidatedMethod({
  name: FETCH_PLACES_NAME,
  validate: null,
  run({
    initialCenter,
    radius,
    budgetRange,
    type,
    dispatch
  }) {
    if (this.isSimulation) {
      // TODO Simulation code for the client (optional)
      console.log("In client method call, parameters:", initialCenter, radius, budgetRange, type);
    } else if (this.isServer) {
      const { fetchPlacesFromServer } = require('./server/fetchPlaces');
      dispatch(receiveLogs("in fetchPlaces method"));
      console.log("in fetchPlaces method");
      const resultsAsPromise = fetchPlacesFromServer(initialCenter, radius, budgetRange, type);
      dispatch(receiveLogs("resultsAsPromise:", resultsAsPromise));
      console.log("resultsAsPromise:", resultsAsPromise);
      return resultsAsPromise;
    }
  }
});