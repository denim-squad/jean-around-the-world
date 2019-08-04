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
  run(id, fields) {
    if (!this.isSimulation) {
      const url = 'https://maps.googleapis.com/maps/api/place/details/output';
      const API_KEY = Meteor.settings.API_KEY || 'could not find private key';
      try {
        const result = HTTP.call('GET', url, { API_KEY, id, fields });
        if (result.statusCode >= 400 || result.content.errorMessage) {
          throw new Meteor.Error('error in API call: ', result);
        }
        return result;
      } catch (error) {
        throw new Meteor.Error(error);
      }
    } else {
      console.log('id:', id, 'fields:', fields);
    }
  },
});
