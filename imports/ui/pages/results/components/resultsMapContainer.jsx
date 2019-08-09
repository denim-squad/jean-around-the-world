/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
  Map, GoogleApiWrapper, Marker, Polyline, InfoWindow,
} from 'google-maps-react';
import { connect } from 'react-redux';
import { API_KEY } from '../../../../constants';

const mapStyles = {
  width: '100%',
  height: '100%',
};

const randomPlaces = [];
const orderedPlaces = [];
const polylineCoords = [];

// Quadratic that returns a number between 5 for radius 1000 and 12 for radius 50000
// Rounds up
function decideRandomCount(radius) {
  return Math.ceil(1 / 350000000 * (radius ** 2) - 1 / 350000 * (radius) + 5);
}

function randomizePlaces(placesArray, count) {
  let priority = 0.5;
  placesArray.forEach((googleAPIPlace) => {
    googleAPIPlace.results.forEach((result) => {
      if (count > 0 && decideShouldBeIncluded(count, priority)) {
        const alreadyExists = randomPlaces.find((places) => {
          places.name === result.name;
        });
        if (!alreadyExists) {
          priority = 1;
          randomPlaces.push({
            lat: result.geometry.location.lat,
            lng: result.geometry.location.lng,
            name: result.name,
            price: result.price_level,
            rating: result.rating,
            address: result.vicinity,
            place_id: result.place_id,
          });
          count--;
        }
      }
    });
    priority = 0.5;
  });
}

// TODO - make a more intensive algorithm if needed
function decideShouldBeIncluded(count, priority) {
  return Math.round(Math.random() * 100) >= Math.floor((-0.0645790481258 * count ** 2 + 0.651969445777 * count + 81.9579182846) * priority);
}

function orderPlacesForIdealPath() {
  if (randomPlaces.length > 0) {
    const anchor = randomPlaces.pop();
    orderedPlaces.push(anchor);
    while (randomPlaces.length > 0) {
      let minDistance = Infinity;
      let previousPlace = anchor;
      let minDistIdx = 0;
      let idx = 0;
      randomPlaces.forEach((place) => {
        distance = distanceBetweenCoor(place, previousPlace);
        if (distance < minDistance) {
          minDistance = distance;
          minDistIdx = idx;
        }
        idx++;
      })
      // splice returns an array with the closest place
      const closestPlace = randomPlaces.splice(minDistIdx, 1);
      if (closestPlace.length !== 0) {
        orderedPlaces.push(closestPlace[0]);
        previousPlace = closestPlace[0];
      }
    }
  }
}

function distanceBetweenCoor(place1, place2) {
  const lat1 = place1.lat;
  const lon1 = place1.lng;

  const lat2 = place2.lat;
  const lon2 = place2.lng;

  // haversine formula to find distance
  const pi = 0.017453292519943295; //pi / 180
  const cosine = Math.cos;
  const val = 0.5 - (cosine((lat2 - lat1) * pi) / 2)
    + cosine(lat1 * pi) * cosine(lat2 * pi) * ((1 - cosine((lon2 - lon1) * pi)) / 2);
  return 12742 * Math.asin(Math.sqrt(val)); // 2 * R; R = 6371 km
}

export class ResultsMapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      currentMarkerName: '',
    };
    const randomCount = decideRandomCount(this.props.radius);
    randomizePlaces(this.props.places, randomCount);
    orderPlacesForIdealPath();
    this.getPolyline();
  }

    setActiveMarker = (props, marker, e) => {
      this.setState({
        activeMarker: marker,
        currentMarkerName: marker.name,
        showingInfoWindow: true,
      });
    }

    closeActiveMaker = (props) => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          currentMarkerName: '',
          activeMarker: null,
        });
      }
    }

    getPolyline = () => {
      orderedPlaces.map((place) => {
        polylineCoords.push({
          lat: place.lat,
          lng: place.lng,
        });
      });
    }

    render() {
      return (
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={polylineCoords[0] ? polylineCoords[0] : this.props.initialCenter}
          onClick={this.closeActiveMaker}
        >
          {orderedPlaces.map(place => <Marker position={{ lat: place.lat, lng: place.lng }} onClick={this.setActiveMarker} name={place.name} />)}
          <Polyline
            path={polylineCoords}
            strokeColor="#FF5D47"
            strokeOpacity={0.8}
            strokeWeight={2}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1>{this.state.currentMarkerName}</h1>
            </div>
          </InfoWindow>
        </Map>
      );
    }
}

const mapStateToProps = state => ({
  initialCenter: state.map.initialCenter,
  places: state.placeSearch.places,
  radius: state.map.radius,
});

export default connect(mapStateToProps)(GoogleApiWrapper({
  apiKey: API_KEY,
})(ResultsMapContainer));
