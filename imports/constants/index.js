import { Meteor } from 'meteor/meteor'
export const API_KEY = String(Meteor.settings.public.API_KEY) || "AIza";

export const MIN_RADIUS = 1000;
export const MAX_RADIUS = 50000;

export const MIN_PRICE_LEVEL = 0;
export const MAX_PRICE_LEVEL = 4;
export const DEFAULT_BUDGET_RANGE = [1, 3];

export const MIN_RATING = 0;
export const MAX_RATING = 5;
export const DEFAULT_RATING = 3;

// mapping venue types from the preference step to valid api type strings
export const placeLabelToTypeMap = new Map([
  ['Coffee', 'cafe'],
  ['Bars', 'bar'],
  ['Restaurants', 'restaurant'],
  ['Hotels', 'lodging'],
  ['Parks', 'park'],
  ['Fast Food', 'meal_takeaway'],
  ['Nightclubs', 'night_club'],
  ['Bakeries', 'bakery']
]);