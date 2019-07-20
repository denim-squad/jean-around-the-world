import API_KEY from '../constants';
const fetch = require('node-fetch');

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
  const [minprice, maxprice] = budgetRange;
  const { lat, lng } = location;
  const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' +
    `key=${API_KEY}&location=${lat},${lng}&radius=${radius}&type=${type}&minprice=${minprice}&maxprice=${maxprice}`;
  
  console.log("url:", url);
  const response = fetch(url, {
    method: 'GET',
    mode: 'no-cors',
    credentials: 'include'
  });
  console.log(response);
  return response;
}
