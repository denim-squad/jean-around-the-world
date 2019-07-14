import { createClient } from '@google/maps';

const googleMapsClient = createClient({
  key: '', 
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
 * @param {number} price 0 <= price <= 4; Google supports a min/max price lvl but
 * since our current behaviour is to only select one, setting both to the same
 * @param {string} type https://developers.google.com/places/supported_types
 */
export default function getNearbyPlaces(location, radius, price, type) {
  return googleMapsClient.placesNearby({
    location,
    radius,
    minprice: price,
    maxprice: price,
    type
  }).asPromise()
}
