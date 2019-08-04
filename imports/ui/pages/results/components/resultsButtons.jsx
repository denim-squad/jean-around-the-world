import React from 'react';
import '../results.page.css';
import { createBrowserHistory } from 'history';
import { BootstrapButton } from '../../../shared_components/MUI/button/bootstrapButton';
import { connect } from 'react-redux';
import { GET_PLACE_DETAILS_NAME } from '../../../../api/places/methods'
import { Meteor } from 'meteor/meteor';

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
    console.log("this.props.places:", this.props.places);
    const places = this.props.places;
    const firstPlace = places[0].results[0];
    const id = firstPlace.id;
    const types = ['formatted_address', 'icon', 'photo', 'url', 'website', 'opening hours'];
    const params = [id, types];
    console.log("params:", params);
    Meteor.apply(GET_PLACE_DETAILS_NAME, params, { throwStubExceptions: false }, (error, details) => {
      if (error) console.log(error);
      console.log("details:", details);
    });
  }

  render() {
    return <div className="results-container">
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
          color="primary">
          SAVE TRIP
               </BootstrapButton>
        <div>
          {/* spacing  */}
        </div>
        <BootstrapButton
          className="add-calendar-button"
          variant="contained"
          size="small"
          color="primary">
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
          onClick={this.goToHomePage}>
          NEW TRIP
               </BootstrapButton>
        <div>
          {/* spacing  */}
        </div>
      </div>
    </div>;
  }
}

const mapStateToProps = (state) => {
  return { places: state.placeSearch.places }
}

export default connect(mapStateToProps)(ResultsButtons);
