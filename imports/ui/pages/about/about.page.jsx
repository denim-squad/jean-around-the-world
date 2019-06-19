import React from 'react';
import Navbar from '../../shared_components/navbar/navbar';
import AboutPageTextContainer from './components/aboutPageTextContainer';
import './about.page.css'

class AboutPage extends React.Component {
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
