import { Meteor } from 'meteor/meteor'
export default API_KEY = Meteor.settings.public.API_KEY;
console.log("process.env: ", process.env);
console.log("meteor.settings:", Meteor.settings);