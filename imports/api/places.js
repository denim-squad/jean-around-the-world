import { getNearbyPlacesFromServer } from '../../server/main';
const fetch = require('node-fetch');

/**
 * TODO TRYING TEMP HACKY FIX
 */
export default function getNearbyPlaces(location, radius, budgetRange, type) {
  return getNearbyPlacesFromServer(location, radius, budgetRange, type);
}
