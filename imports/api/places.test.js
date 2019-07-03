import getNearbyPlaces from './places';
import chai from 'chai';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


describe('getPlaces', () => {
  
  it('returns results in a promise', function () {
    //todo
  });
  
  it('only returns results with the specified type', function () {
    //todo 
  });

  it('returns sum of quantities number of places', function () {
    //todo
  });
}) 
