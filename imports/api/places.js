import { createClient } from '@google/maps';
import API_KEY from '../constants';

const googleMapsClient = createClient({
  key: "AIzaSyDJueLy9ZKUPA9pJhtUPykPysJdBZgT9NY", 
  Promise: Promise
});

/**
 * Makes a nearby places request.
 * Returns a promise with an array of results as response.json.results
 * note that Google only supports searching for one type at a time,
 * so if multiple types are needed, we'll need to do multiple calls
 * 
 * @param {LatLng} location 
 * @param {number} radius 0 < radius <= 50000
 * @param {Object} budgetRange 0 <= price <= 4;
 * I'd prefer that these be camelCase but following the api convention for simplicity
 * @param {number} budgetRange.minprice
 * @param {number} budgetRange.maxprice
 * @param {string} type https://developers.google.com/places/supported_types
 */
export default function getNearbyPlaces(location, radius, budgetRange, type) {
  console.log("in getNearbyPlaces, budgetRange:", budgetRange);
  const [ minprice, maxprice ] = budgetRange;
  return googleMapsClient.placesNearby({
    location,
    radius,
    minprice,
    maxprice,
    type
  }).asPromise();
}
