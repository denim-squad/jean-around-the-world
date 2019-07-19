import { Meteor } from 'meteor/meteor'
export default API_KEY = process.env.API_KEY;
console.log("process.env: ", process.env);
console.log("meteor.settings:", Meteor.settings);