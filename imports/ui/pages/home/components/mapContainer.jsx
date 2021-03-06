import React from 'react';
import {
  Map, GoogleApiWrapper, Marker, Circle,
} from 'google-maps-react';
import { connect } from 'react-redux';
import { API_KEY } from '../../../../constants';
import { setMapCenter } from '../../../../redux/actions/index';

const mapStyles = {
  width: '100%',
  height: '100%',
};

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMarker: this.props.initialCenter,
    };
  }

  setMarkerLocation = (e, map, coord) => {
    const { latLng } = coord;
    this.setState({
      activeMarker: {
        lat: latLng.lat(),
        lng: latLng.lng(),
      },
    });
    this.props.setMapCenter({ lat: latLng.lat(), lng: latLng.lng() });
  }

  render() {
    const markerCoords = {
      lat: this.state.activeMarker.lat,
      lng: this.state.activeMarker.lng,
    };
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={this.props.initialCenter}
        center={this.props.initialCenter}
        onClick={this.setMarkerLocation}
      >
        <Marker
          position={{ lat: markerCoords.lat, lng: markerCoords.lng }}
        />
        <Circle
          radius={this.props.radius}
          center={markerCoords}
          strokeColor="transparent"
          onClick={this.setMarkerLocation}
          fillColor="#FFB26B"
          fillOpacity={0.4}
        />
      </Map>
    );
  }
}

const mapStateToProps = state => ({
  radius: state.map.radius,
  initialCenter: state.map.initialCenter,
});

export default connect(mapStateToProps, { setMapCenter })(GoogleApiWrapper({
  apiKey: (API_KEY),
})(MapContainer));
