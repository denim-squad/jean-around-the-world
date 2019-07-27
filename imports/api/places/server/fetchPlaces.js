import { createClient } from '@google/maps';
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http'
import { FETCH_PLACES_NAME } from '../methods';

export default function fetchPlacesFromServer(location, radius, budgetRange, type) {
  console.log("in fetchPlacesFromServer");
  const [ minprice, maxprice ] = budgetRange;
  const { lat, lng } = location;
  
  const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' +
    `key=${API_KEY}&location=${lat},${lng}&radius=${radius}&type=${type}&minprice=${minprice}&maxprice=${maxprice}`;

  const result = HTTP.get(url);
  console.log(result);
  return 'test';
}

// Meteor.methods({
//   FETCH_PLACES_NAME: function(initialCenter, radius, budgetRange, type) {
//     if (this.isSimulation) {
//       // TODO Simulation code for the client (optional)
//       console.log("In client method call, parameters:", initialCenter, radius, budgetRange, type);
//     } else if (this.isServer) {
//       console.log("in fetchPlaces method, fetchPlacesFromServer:", fetchPlacesFromServer);
//       return fetchPlacesFromServer(initialCenter, radius, budgetRange, type);
//       // const resultsAsPromise = fetchPlacesFromServer(initialCenter, radius, budgetRange, type);
//       // console.log("resultsAsPromise:", resultsAsPromise);
//       // return resultsAsPromise;
//     }
//   }
// })

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