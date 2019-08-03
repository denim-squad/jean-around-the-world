import React from 'react';
import { Map, GoogleApiWrapper, Marker, Polyline, InfoWindow } from 'google-maps-react';
import { connect } from 'react-redux';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class ResultsMapContainer extends React.Component {

    constructor() {
      super();
      this.state = {
        showingInfoWindow: false,
        activeMarker: {},
      };
    }

    setActiveMarker = (props, marker, e) => {
      this.setState({
        activeMarker: marker,
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
      const triangleCoords = [
        {lat: 25.774, lng: -80.190},
        {lat: 18.466, lng: -66.118},
        {lat: 32.321, lng: -64.757},
        {lat: 25.774, lng: -80.190}
      ];
      return <Map
          google = {this.props.google}
          zoom = {14}
          style = {mapStyles}
          initialCenter = {this.props.initialCenter}
          onClick={this.closeActiveMaker}>
          {triangleCoords.map((coord) => {
            return <Marker position={coord} onClick={this.setActiveMarker} name={'Current location'}/>
          })}
          <Polyline
            path={triangleCoords}
            strokeColor="#FF5D47"
            strokeOpacity={0.8}
            strokeWeight={2} />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <div>
              <h1>ya YEET</h1>
            </div>
        </InfoWindow>
      </Map>
    }
}

const mapStateToProps = (state) => {
	return {
      initialCenter: state.map.initialCenter,
  };
}

export default connect(mapStateToProps)(GoogleApiWrapper({
  apiKey: ("") // paste API key here each time, DO NOT COMMIT.
})(ResultsMapContainer));
