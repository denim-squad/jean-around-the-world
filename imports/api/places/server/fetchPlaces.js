import { createClient } from '@google/maps';
import { Meteor } from 'meteor/meteor';

const googleMapsClient = createClient({
  key: Meteor.settings.API_KEY || Meteor.settings.public.API_KEY, 
  Promise: Promise
});

export default function fetchPlacesFromServer(location, radius, priceRange, type) {
  const { minprice, maxprice } = priceRange;
  return googleMapsClient.placesNearby({
    location,
    radius,
    minprice,
    maxprice,
    type
  }).asPromise();
}