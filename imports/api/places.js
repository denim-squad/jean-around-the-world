const googleMapsClient = require('@google/maps').createClient({
    key: 'your API key here',
    Promise: Promise
  });

/**
 * Makes a nearby places request.
 * Returns a promise with an array of results as response.json.results
 * note that Google only supports searching for one type at a time,
 * so if multiple types are needed, we'll need to do multiple calls
 * 
 * @param {object} mapState 
 * @param {LatLng} mapState.center 
 * @param {number} mapState.radius 0 < radius <= 50000
 * @param {number} price 0 <= price <= 4; google supports a min/max price but
 * since our current behaviour is to only select one, setting both to the same
 * @param {string} type https://developers.google.com/places/supported_types
 */
export async function getNearbyPlaces(mapState, price, type) {
    return googleMapsClient.placesNearby({
        location: mapState.center,
        radius: mapState.radius,
        minPrice: price,
        maxPrice: price,
        type
    }).asPromise()
}