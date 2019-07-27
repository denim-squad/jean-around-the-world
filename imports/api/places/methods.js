import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Meteor } from 'meteor/meteor';

export const FETCH_PLACES_NAME = 'fetchPlaces';

const fetchPlacesSchema = new SimpleSchema({
  initialCenter: Object,
  radius: SimpleSchema.Integer,
  budgetRange: [SimpleSchema.Integer, SimpleSchema.Integer],
  type: String
});

// export const fetchPlaces = new ValidatedMethod({
//   name: FETCH_PLACES_NAME,
//   validate: null,
//   run({
//     initialCenter,
//     radius,
//     budgetRange,
//     type
//   }) {
//     if (this.isSimulation) {
//       // TODO Simulation code for the client (optional)
//       console.log("In client method call, parameters:", initialCenter, radius, budgetRange, type);
//     } else if (this.isServer) {
//       import { fetchPlacesFromServer } from './server/fetchPlaces';
//       console.log("in fetchPlaces method");
//       const resultsAsPromise = fetchPlacesFromServer(initialCenter, radius, budgetRange, type);
//       console.log("resultsAsPromise:", resultsAsPromise);
//       return resultsAsPromise;
//     }
//   }
// });