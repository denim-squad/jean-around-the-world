import React from 'react';
import './navbar.css';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import Geocode from 'react-geocode';
import { BootstrapButton } from '../MUI/button/bootstrapButton';
import { CssTextField } from '../MUI/textfield/cssTextfield';
import { StyledSlider } from '../MUI/slider/styledSlider';
import { setRadius, setMapCenter } from '../../../redux/actions/index';
import { API_KEY, MIN_RADIUS, MAX_RADIUS } from '../../../constants';

import LoadingSpinner from '../loading/loadingSpinner';

const history = createBrowserHistory({ forceRefresh: true });

class MapQuery extends React.Component {
  constructor() {
    super();
    Geocode.setApiKey(API_KEY);
    this.loadingSpinner = React.createRef();
  }

  handleSearch = (event) => {
    const query = event.target.value;
    Geocode.fromAddress(query).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        this.props.setMapCenter({ lat, lng });
      },
      (error) => {
        console.error(error);
      },
    );
  }

  changeRadius = (event, value) => {
    this.props.setRadius(value);
  };

  goToPreferencesPage = async () => {
    this.loadingSpinner.current.style.display = 'block';
    await setTimeout(() => {
      this.loadingSpinner.current.style.display = 'none';
      history.push('/preferences');
    }, 2800);
  }

  render() {
    return (
      <div className="map-query-container">
        <LoadingSpinner ref={this.loadingSpinner} />
        <div>
          {/* spacing */}
        </div>
        <div className="query-label-text">
        RADIUS
        </div>
        <StyledSlider
          value={this.props.radius}
          min={MIN_RADIUS}
          max={MAX_RADIUS}
          onChange={this.changeRadius}
          aria-labelledby="radius slider"
          className="slider"
        />
        <div className="query-label-text">
        LOCATION
        </div>
        <div>
          <CssTextField
            className="address-field"
            placeholder="1111 East Mall, V6T 1T7"
            margin="none"
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                this.handleSearch(event);
              }
            }}
          />
        </div>
        <BootstrapButton
          disabled={this.props.isLocationEmpty}
          variant="contained"
          size="small"
          color="primary"
          onClick={this.goToPreferencesPage}
        >
        START
        </BootstrapButton>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  radius: state.map.radius,
});

export default connect(mapStateToProps, { setRadius, setMapCenter })(MapQuery);
