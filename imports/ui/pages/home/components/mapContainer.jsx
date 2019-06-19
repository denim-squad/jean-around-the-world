import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends React.Component {

    constructor() {
      super();
      this.state = {
        activeMarker: {},
      };
    }

    setMarkerLocation = (e, map, coord) => {
      const { latLng } = coord;
      this.setState({
        activeMarker: {
          lat: latLng.lat(), 
          lng: latLng.lng()
        }
      });
    }

    render() {
      return <Map
        google = {this.props.google}
        zoom = {16}
        style = {mapStyles}
        initialCenter = {{
          lat: 49.263749,
          lng: -123.247480
        }}
        onClick={this.setMarkerLocation}
    >
      <Marker
        position={{ lat: this.state.activeMarker.lat, lng: this.state.activeMarker.lng }}
      />
    </Map>
    }
}
 
export default GoogleApiWrapper({
  apiKey: ('') // paste API key here each time, DO NOT COMMIT.
})(MapContainer)

