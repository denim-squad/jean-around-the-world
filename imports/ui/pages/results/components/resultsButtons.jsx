import React from 'react';
import '../results.page.css';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import { savePrevTravel } from '../../../../redux/actions/index';
import { BootstrapButton } from '../../../shared_components/MUI/button/bootstrapButton';

const history = createBrowserHistory({ forceRefresh: true });

class ResultsButtons extends React.Component {
  goToHomePage = async () => {
    // this.loadingSpinner.current.style.display = 'block';
    await setTimeout(() => {
      // this.loadingSpinner.current.style.display = 'none';
      history.push('/');
    }, 2800);
  }

  displayPlaces = () => {
    /**
     * TODO: I want to keep this console log until we do something
     * with the data on this page, as a quick smoke test
     */
    console.log('this.props.places:', this.props.places);
    const { places } = this.props;
  }

  saveTrip = () => {
    this.props.savePrevTravel({
      name: 'test',
      places: this.props.places,
    });
  }

  render() {
    return (
      <div className="results-container">
      WE FOUND JUST THE TRIP FOR YOU!
        <div className="results-buttons-container">
          <div>
            {/* todo major styling, decisions about how to format, what to display, etc */}
            { this.displayPlaces() }
          </div>
          <BootstrapButton
            className="save-trip-button"
            variant="contained"
            size="small"
            color="primary"
            onClick={this.saveTrip()}
          >
          SAVE TRIP
          </BootstrapButton>
          <div>
            {/* spacing  */}
          </div>
          <BootstrapButton
            className="add-calendar-button"
            variant="contained"
            size="small"
            color="primary"
          >
          ADD TO CALENDAR
          </BootstrapButton>
          <div>
            {/* spacing  */}
          </div>
          <BootstrapButton
            className="new-trip-button"
            variant="contained"
            size="small"
            color="primary"
            onClick={this.goToHomePage}
          >
          NEW TRIP
          </BootstrapButton>
          <div>
            {/* spacing  */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ places: state.placeSearch.places });

export default connect(mapStateToProps, { savePrevTravel })(ResultsButtons);
