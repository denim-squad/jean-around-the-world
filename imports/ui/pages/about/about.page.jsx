import React from 'react';
import Navbar from '../../shared_components/navbar/navbar';
import AboutPageTextContainer from './aboutPageTextContainer';
import './aboutPage'

class AboutPage extends React.Component {
    render() {
        return <div className="about-page-container">
            <Navbar />
            <AboutPageTextContainer />
        </div>
    }
}

export default AboutPage;
