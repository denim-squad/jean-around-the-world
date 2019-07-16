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
 * @param {Object} priceRange 0 <= price <= 4;
 * I'd prefer that these be camelCase but following the api convention for simplicity
 * @param {number} priceRange.minprice
 * @param {number} priceRange.maxprice
 * @param {string} type https://developers.google.com/places/supported_types
 */
export default function getNearbyPlaces(location, radius, priceRange, type) {
  const { minprice, maxprice } = priceRange;
  return googleMapsClient.placesNearby({
    location,
    radius,
    minprice,
    maxprice,
    type
  }).asPromise();
}
