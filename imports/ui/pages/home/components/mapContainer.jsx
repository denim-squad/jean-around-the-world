import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends React.Component {
    render() {
      return <Map
      className = "map-container"
      google = {this.props.google}
      zoom = {16}
      style = {mapStyles}
      initialCenter = {{
        lat: 49.263749,
        lng: -123.247480
      }}
    />
    }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyC8l_RclQtdU71m1hUZlQFE_LqAt7xQCPM') // paste API key here each time, DO NOT COMMIT.
})(MapContainer)

