/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
  Map, GoogleApiWrapper, Marker, Polyline, InfoWindow,
} from 'google-maps-react';
import { connect } from 'react-redux';
import { API_KEY } from '../../../../constants';
import { GET_PLACE_DETAILS_NAME } from '../../../../api/places/methods';
import SvgIcon from '@material-ui/core/SvgIcon';
import { addFavourites, removeFavourites } from '../../../../redux/actions/index';

const mapStyles = {
  width: '100%',
  height: '100%',
};

const randomPlaces = [];
export const orderedPlaces = [];
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
    const randomCount = decideRandomCount(this.props.radius);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      currentMarkerName: '',
      place_id: undefined,
      randomCount,
    };
    randomizePlaces(this.props.places, randomCount);
    orderPlacesForIdealPath();
    this.getPolyline();
  }

    setActiveMarker = (props, marker, e) => {
      if (this.props.isSignedIn && this.state.showingInfoWindow && this.state.place_id === marker.place_id) {
        this.toggleFavourites(this.state.currentMarkerName);
      } else {
        const fields = ['formatted_address', 'icon', 'url', 'website'];
        Meteor.call(GET_PLACE_DETAILS_NAME, { id: marker.place_id, fields }, (error, details) => {
          if (error) { console.error( error ) }
          this.setState({
            activeMarker: marker,
            currentMarkerName: marker.name,
            showingInfoWindow: true,
            formatted_address: details.formatted_address,
            icon: details.icon,
            url: details.url,
            website: details.website,
            place_id: marker.place_id,
          });
        });
      }
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

    toggleFavourites = (favourite) => {
      if (favourite) {
        this.props.favourites.includes(favourite) ?
        this.props.removeFavourites(favourite):
        this.props.addFavourites(favourite);
      }
    }

    // returns number between 8 for 5 random places and 14 for 20 random places
    handleZoom = () => {
      return Math.round(0.135218045113*this.state.randomCount**2 - 2.87013533835*this.state.randomCount + 24.9702255639);
    }

    render() {
      return (
        <Map
          google={this.props.google}
          zoom={this.handleZoom()}
          style={mapStyles}
          initialCenter={polylineCoords[0] ? polylineCoords[0] : this.props.initialCenter}
          onClick={this.closeActiveMaker}
        >
          {orderedPlaces.map(place =>
            <Marker
              position={{ lat: place.lat, lng: place.lng }}
              onClick={this.setActiveMarker}
              name={place.name}
              key={place.place_id}
              place_id={place.place_id} />)}
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
            <div className="popup-box">
              <div className="popup-title-container">
                { this.props.isSignedIn && (this.props.favourites.includes(this.state.currentMarkerName) ?
                <SvgIcon>
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </SvgIcon> :
                <SvgIcon>
                  <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>
                </SvgIcon>)}
                <h2 className="popup-title">{this.state.currentMarkerName}</h2>
              </div>
              <h4>{this.state.formatted_address}</h4>
              <div className="popup-description-container">
                <img src={this.state.icon}></img>
                <div className="popup-urls-container">
                  <a href={this.state.website}>Company Website</a>
                  <a href={this.state.url}>Google Map Location</a>
                </div>
              </div>
            </div>
          </InfoWindow>
        </Map>
      )
    }
}

const mapStateToProps = state => ({
  initialCenter: state.map.initialCenter,
  places: state.placeSearch.places,
  radius: state.map.radius,
  favourites: state.user.favourites,
  isSignedIn: state.user.isSignedIn,
});

export default connect(mapStateToProps, { addFavourites, removeFavourites })(GoogleApiWrapper({
  apiKey: API_KEY,
})(ResultsMapContainer));
