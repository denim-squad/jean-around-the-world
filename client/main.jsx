import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import HomePage from "../imports/ui/pages/home/home.page";

Meteor.startup(() => {
  render(<HomePage />, document.getElementById("react-target"));
});
