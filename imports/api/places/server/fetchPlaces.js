import { createClient } from '@google/maps';
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http'
import { FETCH_PLACES_NAME } from '../methods';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { receiveLogs } from '../../../redux/actions'


function fetchPlacesFromServer(location, radius, budgetRange, type) {
  console.log("in fetchPlacesFromServer");
  const [ minprice, maxprice ] = budgetRange;
  const { lat, lng } = location;
  const API_KEY = Meteor.settings.API_KEY || "could not find private key";
  
  const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' +
    `key=${API_KEY}&location=${lat},${lng}&radius=${radius}&type=${type}&minprice=${minprice}&maxprice=${maxprice}`;

  const result = HTTP.get(url);
  console.log(result);
  return { message: 'test', result };
}

const fetchPlacesSchema = new SimpleSchema({
  initialCenter: Object,
  radius: SimpleSchema.Integer,
  budgetRange: [ SimpleSchema.Integer, SimpleSchema.Integer ],
  type: String
});

export const fetchPlaces = new ValidatedMethod({
  name: FETCH_PLACES_NAME,
  validate: fetchPlacesSchema.validate(),
  run({
    initialCenter,
    radius,
    budgetRange,
    type
  }) {
    if (this.isSimulation) {
      // TODO Simulation code for the client (optional)
      console.log("In client method call, parameters:", initialCenter, radius, budgetRange, type, dispatch);
    } else {
      try {
        const result = fetchPlacesFromServer(initialCenter, radius, budgetRange, type);
        return result;
      } catch (error) {
        throw new Meteor.Error("error in API call", error)
      }
    }
  }
});

// const googleMapsClient = createClient({
//   key: Meteor.settings.API_KEY || "", 
//   Promise: Promise
// });

// export default function fetchPlacesFromServer(location, radius, budgetRange, type) {
//   const [ minprice, maxprice ] = budgetRange;
//   return googleMapsClient.placesNearby({
//     location,
//     radius,
//     minprice,
//     maxprice,
//     type
//   }).asPromise();
// }