import React from 'react';
import './navbar.css'
import { createBrowserHistory } from 'history';
import { BootstrapButton } from '../MUI/button/bootstrapButton';
import { CssTextField } from '../MUI/textfield/cssTextfield';
import { StyledSlider } from '../MUI/slider/styledSlider';
import { connect } from 'react-redux';
import { setRadius } from '../../../redux/actions/index';

const history = createBrowserHistory({forceRefresh: true});

class MapQuery extends React.Component {

    changeRadius = (event, value) => {
        this.props.setRadius(value);
    };

    goToPreferencesPage = async () => {
        // this.loadingSpinner.current.style.display = 'block';
        await setTimeout(() => {
            // this.loadingSpinner.current.style.display = 'none';
            history.push('/preferences');
        }, 2800);
    }

    render() {
        return <div className="map-query-container">
        <div>
            {/* spacing */}
        </div>
        <div className="query-label-text">
            RADIUS
        </div>
        <StyledSlider 
            value={this.props.radius}
            min={1000}
            max={80000}
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
            />
        </div>
        <BootstrapButton
            disabled={this.props.isLocationEmpty}
            variant="contained"
            size="small"
            color="primary"
            onClick={this.goToPreferencesPage}>
            START
        </BootstrapButton>
    </div>
    }
}

const mapStateToProps = (state) => {
	return { 
        radius: state.map.radius,
  };
}

export default connect(mapStateToProps, { setRadius })(MapQuery);
