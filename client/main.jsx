import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import RoutingPage from '../imports/ui/pages/routing.page';
import './main.css';

Meteor.startup(() => {
  render(<RoutingPage />, document.getElementById("react-target"));
});
