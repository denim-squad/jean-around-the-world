import { createClient } from '@google/maps';
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http'

export default function fetchPlacesFromServer(location, radius, budgetRange, type) {
  const [ minprice, maxprice ] = budgetRange;
  const { lat, lng } = location;
  
  const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' +
    `key=${API_KEY}&location=${lat},${lng}&radius=${radius}&type=${type}&minprice=${minprice}&maxprice=${maxprice}`;

  return HTTP.get(url);
}

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