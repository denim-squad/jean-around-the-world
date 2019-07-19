import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../imports/redux/reducers';
import RoutingPage from '../imports/ui/pages/routing.page';
import './main.css';

Meteor.startup(() => {
  ReactDOM.render(
    <Provider store={createStore(reducers, applyMiddleware(thunk))}>
      <RoutingPage />
    </Provider>,
    document.getElementById("react-target")
  );
});
