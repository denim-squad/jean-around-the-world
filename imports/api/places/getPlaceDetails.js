/* eslint-disable consistent-return */
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { GET_PLACE_DETAILS_NAME } from './methods';

const getPlaceDetailsSchema = new SimpleSchema({
  id: String,
  fields: { type: Array, optional: true },
  'fields.$': String,
});

export default new ValidatedMethod({
  name: GET_PLACE_DETAILS_NAME,
  validate: getPlaceDetailsSchema.validator(),
  run({ id, fields }) {
    if (!this.isSimulation) {
      const API_KEY = Meteor.settings.API_KEY || 'could not find private key';
      const url = 'https://maps.googleapis.com/maps/api/place/details/json?'
      + `placeid=${id}&fields=${fields}&key=${API_KEY}`;
      try {
        const details = HTTP.get(url);
        if (details.statusCode >= 400 || details.content.errorMessage) {
          throw new Meteor.Error(details);
        }
        return details.data.result;
      } catch (error) {
        throw new Meteor.Error('error in getPlaceDetails API call:', error);
      }
    }
  },
});
