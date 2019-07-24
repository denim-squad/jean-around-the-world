import Meteor from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { FETCH_PLACES_NAME } from '../methods.js';
import { HTTP } from 'meteor/http';
import { API_KEY } from '../../constants/index.js';
import { promisify } from 'util';

const fetchPlacesSchema = new SimpleSchema({
  location: Object,
  'location.lat': { type: Number, min: 1, max: 50000 },
  'location.lng': { type: Number, min: 1, max: 50000 },
  budgetRange: Object,
  'budgetRange.minprice': { type: SimpleSchema.Integer, min: 0, max: 4 },
  'budgetRange.maxprice': { type: SimpleSchema.Integer, min: 0, max: 4 },
  type: String
});

export const fetchPlaces = new ValidatedMethod({
  name: FETCH_PLACES_NAME,
  validate: fetchPlacesSchema.validator(),
  run({ location, radius, budgetRange, type }) {
    const [minprice, maxprice] = budgetRange;
    const { lat, lng } = location;
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
      // `key=${API_KEY}&location=${lat},${lng}&radius=${radius}&type=${type}&minprice=${minprice}&maxprice=${maxprice}`;
    const params = {
      key: API_KEY,
      location: [ lat, lng ],
      radius,
      type,
      minprice,
      maxprice
    };
    
    const httpPromise = promisify(HTTP.call);
    return httpPromise('GET', url, params);
  }
});