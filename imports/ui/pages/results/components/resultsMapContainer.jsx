import React from 'react';
import { Map, GoogleApiWrapper, Marker, Polyline } from 'google-maps-react';
import { connect } from 'react-redux';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class ResultsMapContainer extends React.Component {

    constructor() {
      super();
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
          initialCenter = {this.props.initialCenter}>
          {triangleCoords.map((coord) => {
            return <Marker position={coord}/>
          })}
          <Polyline
          path={triangleCoords}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2} />
        </Map>
    }
}

const mapStateToProps = (state) => {
	return {
      //TODO: return paths
      initialCenter: state.map.initialCenter,
  };
}

export default connect(mapStateToProps)(GoogleApiWrapper({
  apiKey: ("") // paste API key here each time, DO NOT COMMIT.
})(ResultsMapContainer));
