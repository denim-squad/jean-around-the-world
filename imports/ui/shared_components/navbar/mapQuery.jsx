import React from 'react';
import './navbar.css'
import { createBrowserHistory } from 'history';
import { BootstrapButton } from '../MUI/button/bootstrapButton';
import { CssTextField } from '../MUI/textfield/cssTextfield';
import { StyledSlider } from '../MUI/slider/styledSlider';

const history = createBrowserHistory({forceRefresh: true});

class MapQuery extends React.Component {

    constructor() {
        super();
        this.state = {
            value: 50,
        };
    }

    changeRadius = (event, value) => {
        this.setState({ value });
    };

    goToPreferencesPage = async () => {
        // this.loadingSpinner.current.style.display = 'block';
        await setTimeout(() => {
            // this.loadingSpinner.current.style.display = 'none';
            history.push('/preferences');
        }, 2800);
    }

    render() {
        const { value } = this.state;
        return <div className="map-query-container"> 
        <div>
            {/* spacing */}
        </div>
        <div className="query-label-text">
            RADIUS
        </div>
        <StyledSlider 
            value={value} 
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

export default MapQuery;
