import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http'
import { FETCH_PLACES_NAME } from '../methods';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

function fetchPlacesFromServer(location, radius, budgetRange, type) {
  const [ minprice, maxprice ] = budgetRange;
  const { lat, lng } = location;
  const API_KEY = Meteor.settings.API_KEY || "could not find private key";
  
  const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' +
    `key=${API_KEY}&location=${lat},${lng}&radius=${radius}&type=${type}&minprice=${minprice}&maxprice=${maxprice}`;

  const result = HTTP.get(url);
  if (result.statusCode >= 400 || result.content.errorMessage) {
    throw new Meteor.Error(result.content.errorMessage);
  }
  return result;
}

const fetchPlacesSchema = new SimpleSchema({
  initialCenter: Object,
  'initialCenter.lat': Number,
  'initialCenter.lng': Number,
  radius: SimpleSchema.Integer,
  budgetRange: [ SimpleSchema.Integer, SimpleSchema.Integer ],
  type: String
});

export const fetchPlaces = new ValidatedMethod({
  name: FETCH_PLACES_NAME,
  validate: fetchPlacesSchema.validator(),
  run({
    initialCenter,
    radius,
    budgetRange,
    type
  }) {
    if (!this.isSimulation) {
      try {
        const result = fetchPlacesFromServer(initialCenter, radius, budgetRange, type);
        return result;
      } catch (error) {
        throw new Meteor.Error("error in API call", error)
      }
    }
  }
});