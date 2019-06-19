import React from 'react';
import { Map, GoogleApiWrapper, Marker, Circle } from 'google-maps-react';
import { connect } from 'react-redux';

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
      const markerCoords = {
        lat: this.state.activeMarker.lat,
        lng: this.state.activeMarker.lng
      };
      return <Map
        google = {this.props.google}
        zoom = {16}
        style = {mapStyles}
        initialCenter = {this.props.initialCenter}
        onClick={this.setMarkerLocation}>
          <Marker
            position={{ lat: markerCoords.lat, lng: markerCoords.lng }}
          /> 
          <Circle
            radius={this.props.radius}
            center={markerCoords}
            strokeColor='transparent'
            onClick={this.setMarkerLocation}
            fillColor='#FFB26B'
            fillOpacity={0.4}
          />
    </Map>
    }
}

const mapStateToProps = (state) => {
	return { 
        radius: state.map.radius,
        initialCenter: state.map.initialCenter
  };
}
 
export default connect(mapStateToProps)(GoogleApiWrapper({
  apiKey: ('') // paste API key here each time, DO NOT COMMIT.
})(MapContainer));
