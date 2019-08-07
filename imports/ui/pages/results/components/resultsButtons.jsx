import React from 'react';
import '../results.page.css';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import {
  updatePlaces,
  showModal,
  savePrevTravel,
  CALENDAR,
  SAVE_PREVIOUS_TRAVEL,
  LOGIN_TO_SAVE,
} from '../../../../redux/actions/index';
import { BootstrapButton } from '../../../shared_components/MUI/button/bootstrapButton';
import { GET_PLACE_DETAILS_NAME } from '../../../../api/places/methods';
import CalendarContainer from './calendar-container';
import SaveTravelName from './save-travel';
import LoginToSaveContainer from './login-to-save';
import LoadingSpinner from '../../../shared_components/loading/loadingSpinner';

const history = createBrowserHistory({ forceRefresh: true });

class ResultsButtons extends React.Component {
  constructor(props) {
    super(props);
    this.displayPlaces = this.displayPlaces.bind(this);
    this.loadingSpinner = React.createRef();
  }

  goToHomePage = async () => {
    this.loadingSpinner.current.style.display = 'block';
    await setTimeout(() => {
      this.loadingSpinner.current.style.display = 'none';
    }, 2800);
    history.push('/');
  }

  showSpecificModal = (kind) => {
    switch (kind) {
      case CALENDAR:
        return <CalendarContainer />
      case SAVE_PREVIOUS_TRAVEL:
        return <SaveTravelName />
      case LOGIN_TO_SAVE:
        return <LoginToSaveContainer />
    }
  }

  displayPlaces = () => {
    /**
     * TODO: I want to keep these console logs until we do something
     * with the data on this page, as a quick smoke test
     */
    const { places } = this.props;
    console.log('this.props.places:', places);

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

  openModal = kind => () => {
    if (!this.props.isSignedIn && kind === SAVE_PREVIOUS_TRAVEL) {
      // change this to a modal that links to login or signup
      this.props.showModal(LOGIN_TO_SAVE);
    } else {
      this.props.showModal(kind);
    }
  }

  render() {
    return (
      <div className="results-container">
        <LoadingSpinner ref={this.loadingSpinner} />
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
            onClick={this.openModal(SAVE_PREVIOUS_TRAVEL)}
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
            onClick={this.openModal(CALENDAR)}
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
          <BootstrapButton
            className="reroll-button"
            variant="contained"
            size="small"
            color="primary"
          >
            REROLL
          </BootstrapButton>
        </div>
        {
          this.showSpecificModal(this.props.modal.modalKind)
        }
      </div>
    );
  }
}


const mapStateToProps = state => ({
  places: state.placeSearch.places,
  minimumAcceptableRating: state.placeSearch.minimumAcceptableRating,
  blacklist: state.user.blacklist,
  isSignedIn: state.user.isSignedIn,
  userId: state.user.userId,
  modal: state.modal,
});

const mapDispatchToProps = dispatch => ({
  updatePlaces: places => dispatch(updatePlaces(places)),
  showModal: kind => dispatch(showModal(kind)),
  savePrevTravel: (places, userId) => dispatch(savePrevTravel(places, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultsButtons);
