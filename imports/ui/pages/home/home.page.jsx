import React from 'react';
import MapContainer from './components/mapContainer';
import Navbar from '../../shared_components/navbar/navbar';

class HomePage extends React.Component {
    render() {
        return <div>
            <Navbar isHomePage />
            {/* <MapContainer /> */}
        </div>
    }
}

export default HomePage;
