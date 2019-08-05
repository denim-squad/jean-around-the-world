/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
  Map, GoogleApiWrapper,
} from 'google-maps-react';
import { connect } from 'react-redux';
import { API_KEY } from '../../../../constants';

const mapStyles = {
  width: '100%',
  height: '100%',
};

export class ResultsMapContainer extends React.Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: 49.263749,
          lng: -123.247480,
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  // TODO: return paths
});

export default connect(mapStateToProps)(GoogleApiWrapper({
  apiKey: API_KEY,
})(ResultsMapContainer));
