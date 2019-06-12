import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../imports/redux/reducers';
import RoutingPage from '../imports/ui/pages/routing.page';
import './main.css';

Meteor.startup(() => {
  ReactDOM.render(
    <Provider store={createStore(reducers)}>
    <RoutingPage />
    </Provider>,
    document.getElementById("react-target")
  );
});
