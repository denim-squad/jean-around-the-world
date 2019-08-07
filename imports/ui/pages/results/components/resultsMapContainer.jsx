/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Map, GoogleApiWrapper, Marker, Polyline, InfoWindow } from 'google-maps-react';
import { connect } from 'react-redux';
import { API_KEY } from '../../../../constants';

const mapStyles = {
  width: '100%',
  height: '100%',
};

const randomPlaces = [];

// Quadratic that returns a number between 5 for radius 1000 and 12 for radius 50000
// Rounds up
function decideRandomCount(radius) {
  return Math.ceil(1/350000000*(radius^2)-1/350000*(radius)+5);
}

function randomizePlaces(placesArray, count) {
  placesArray.forEach((googleAPIPlace) => {
    googleAPIPlace.results.forEach((resultPlace) => {
      resultPlace.forEach((result) => {
        if (decideShouldBeIncluded(count)) {
          randomPlaces.push({
            lat: result.location.lat,
            lng: result.location.lng,
            name: result.name,
            price: result.price_level,
            rating: result.rating,
            address: result.vicinity,
          })
          count--;
          if (count === 0) { return };
        };
      });
    });
  });
}

// TODO - make a more intensive algorithm if needed
function decideShouldBeIncluded(count) {
  return Math.random() < 0.436;
}

export class ResultsMapContainer extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        showingInfoWindow: false,
        activeMarker: {},
      };
      const randomCount = decideRandomCount(this.props.radius);
      this.randomizedPlaces = randomizePlaces(this.props.places, randomCount);
    }

    setActiveMarker = (props, marker, e) => {
      this.setState({
        activeMarker: marker,
        currentMarkerName: marker.name,
        showingInfoWindow: true
      });
    }

    closeActiveMaker = (props) => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        })
      }
    }

    render() {
      return <Map
          google = {this.props.google}
          zoom = {14}
          style = {mapStyles}
          initialCenter = {this.props.initialCenter}
          onClick={this.closeActiveMaker}>
          {randomPlaces.map((place) => {
            return <Marker position={{lat: place.lat, lng: place.lng}} onClick={this.setActiveMarker} name={place.name}/>
          })}
          <Polyline
            path={() => {
              const markerLocations = [];
              randomPlaces.forEach((place) => {
                markerLocations.push({
                  lat: place.lat,
                  lng: place.lng,
                });
              });
              return markerLocations;
            }}
            strokeColor="#FF5D47"
            strokeOpacity={0.8}
            strokeWeight={2} />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.currentMarkerName}</h1>
            </div>
        </InfoWindow>
      </Map>
    }
}

const mapStateToProps = (state) => {
	return {
      initialCenter: state.map.initialCenter,
      places: Array.from(state.placeSearch.places),
  };
}

export default connect(mapStateToProps)(GoogleApiWrapper({
  apiKey: API_KEY,
})(ResultsMapContainer));
