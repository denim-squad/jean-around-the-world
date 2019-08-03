import React from 'react';
import '../results.page.css';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import { BootstrapButton } from '../../../shared_components/MUI/button/bootstrapButton';
import { updatePlaces } from '../../../../redux/actions';

const history = createBrowserHistory({ forceRefresh: true });

class ResultsButtons extends React.Component {
  goToHomePage = async () => {
    // this.loadingSpinner.current.style.display = 'block';
    await setTimeout(() => {
      // this.loadingSpinner.current.style.display = 'none';
      history.push('/');
    }, 2800);
  }

  isNotBlacklisted = (result, blacklist) => {
    // TODO more sophisticated filtering if time
    const { name } = result;
    return !blacklist.contains(name);
  }

  filterPlaces = () => {
    const { places, minimumAcceptableRating, blacklist } = this.props;
    const filteredPlaces = [];
    places.forEach((place) => {
      const filteredResults = places.results.filter(result => (
        minimumAcceptableRating <= result.rating && this.isNotBlacklisted(result, blacklist)
      ));
      filteredPlaces.push({ type: place.type, results: filteredResults });
    });
    this.props.updatePlaces(filteredPlaces);
  }

  componentDidMount() {
    this.filterPlaces();
  }

  displayPlaces = () => {
    /**
     * TODO: I want to keep this console log until we do something
     * with the data on this page, as a quick smoke test
     */
    console.log('this.props.places:', this.props.places);
  }

  render() {
    return (
      <div className="results-container">
        WE FOUND JUST THE TRIP FOR YOU!
        <div className="results-buttons-container">
          <div>
            {/* todo major styling, decisions about how to format, what to display, etc */}
            {this.displayPlaces()}
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
