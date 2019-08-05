import React from 'react';
import '../results.page.css';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import { BootstrapButton } from '../../../shared_components/MUI/button/bootstrapButton';
import CalendarContainer from './calendar-container';
import { showModal, CALENDAR } from '../../../.././redux/actions';

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

  openModal = (kind) => () => {
    this.props.showModal(kind);
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
            onClick={this.openModal(CALENDAR)}>
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
            color="primary">
            REROLL
            </BootstrapButton>
        </div>
        {
          (this.props.modal.modalKind === CALENDAR) && <CalendarContainer/>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    places: state.placeSearch.places,
    modal: state.modal
  }
}

export default connect(mapStateToProps, { showModal })(ResultsButtons);
