import React from 'react';
import MapContainer from './components/mapContainer';
import Navbar from '../../shared_components/navbar/navbar';
import './home.page.css';

class HomePage extends React.Component {
  render() {
    return (
      <div className="home-page-container">
        <Navbar isHomePage />
        <MapContainer />
      </div>
    );
  }
}

export default HomePage;
