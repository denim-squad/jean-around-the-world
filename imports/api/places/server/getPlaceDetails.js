/* eslint-disable consistent-return */
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { GET_PLACE_DETAILS_NAME } from '../methods';

const getPlaceDetailsSchema = new SimpleSchema({
  id: String,
  fields: { type: Array, optional: true },
});

export default new ValidatedMethod({
  name: GET_PLACE_DETAILS_NAME,
  validate: getPlaceDetailsSchema.validator(),
  run({
    id, fields,
  }) {
    if (!this.isSimulation) {
      const url = 'https://maps.googleapis.com/maps/api/place/details/output';
      try {
        const result = HTTP.call('GET', url, { id, fields });
        return result;
      } catch (error) {
        throw new Meteor.Error(error);
      }
    }
  },
});
