import React from 'react';
import Navbar from '../../shared_components/navbar/navbar';
import AboutPageTextContainer from './components/aboutPageTextContainer';
import './about.page.css'

class AboutPage extends React.Component {
  constructor() {
    super();
    console.log("process:", process);
    console.log("process.env:", process.env);
    console.log("process.env.API_KEY:", process.env.API_KEY);
    console.log("meteor settings:", Meteor.settings);
  }

  render() {
    return (
      <div>
        <Navbar />
        <AboutPageTextContainer />
      </div>
    );
  }
}

export default AboutPage;
