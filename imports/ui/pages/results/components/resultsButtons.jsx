import React from 'react';
import '../results.page.css';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import { BootstrapButton } from '../../../shared_components/MUI/button/bootstrapButton';
import { updatePlaces } from '../../../../redux/actions';
import { GET_PLACE_DETAILS_NAME } from '../../../../api/places/methods';

const history = createBrowserHistory({ forceRefresh: true });

class ResultsButtons extends React.Component {
  constructor(props) {
    super(props);
    this.displayPlaces = this.displayPlaces.bind(this);
  }

  goToHomePage = async () => {
    this.loadingSpinner.current.style.display = 'block';
    await setTimeout(() => {
      this.loadingSpinner.current.style.display = 'none';
      history.push('/');
    }, 1400);
  }

  // isNotBlacklisted = (result, blacklist) => {
  //   // TODO more sophisticated filtering if time
  //   const { name } = result;
  //   return !blacklist.includes(name);
  // }

  // filterPlaces = () => {
  //   const { places, minimumAcceptableRating, blacklist } = this.props;
  //   console.log('this.props:', this.props);
  //   console.log('places:', places);
  //   const filteredPlaces = [];
  //   places.forEach((place) => {
  //     const filteredResults = place.results.filter(result => (
  //       minimumAcceptableRating <= result.rating && this.isNotBlacklisted(result, blacklist)
  //     ));
  //     filteredPlaces.push({ type: place.type, results: filteredResults });
  //   });
  //   this.props.updatePlaces(filteredPlaces);
  // }

  displayPlaces = () => {
    /**
     * TODO: I want to keep this console log until we do something
     * with the data on this page, as a quick smoke test
     */
    console.log('this.props.places:', this.props.places);
    const { places } = this.props;
    const firstPlace = places[0].results[0];
    if (firstPlace) {
      const id = firstPlace.place_id;
      const fields = ['formatted_address', 'icon', 'photo', 'url', 'website', 'opening_hours'];
      Meteor.call(GET_PLACE_DETAILS_NAME, { id, fields }, (error, details) => {
        if (error) console.log(error);
        console.log('details:', details);
      });
    }
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

const mapStateToProps = state => ({
  places: state.placeSearch.places,
  minimumAcceptableRating: state.placeSearch.minimumAcceptableRating,
  blacklist: state.user.blacklist,
});

const mapDispatchToProps = dispatch => ({
  updatePlaces: places => dispatch(updatePlaces(places)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultsButtons);
