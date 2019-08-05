import React from 'react';
import { createBrowserHistory } from 'history';
import '../../preferences.page.css';
import { connect } from 'react-redux';
import { BootstrapButton } from '../../../../shared_components/MUI/button/bootstrapButton';
import { CUSTOMIZE_STEP, BLACKLIST_STEP, REFINE_STEP } from '../../preferences.page';
import { getPlaces } from '../../../../../redux/actions';
import LoadingSpinner from '../../../../shared_components/loading/loadingSpinner';

const history = createBrowserHistory({ forceRefresh: true });

class ContinueButtons extends React.Component {
  constructor() {
    super();
    this.loadingSpinner = React.createRef();
  }

  // TODO change after debugging
  goToResultsPage = async () => {
    this.props.getPlaces();
    this.loadingSpinner.current.style.display = 'block';
    await setTimeout(() => {
      this.loadingSpinner.current.style.display = 'none';
      history.push('/results');
    }, 25000);
  }

  render() {
    return (
      <div className="nav-buttons-container">
        <LoadingSpinner ref={this.loadingSpinner} />
        {
        !(this.props.currentStep === CUSTOMIZE_STEP)
          ? (
            <div
              className="back-button"
              onClick={this.props.previousStep}
            />
          )
          : (
            <div>
              {/* spacing */}
            </div>
          )
    }
        {
        !(this.props.currentStep === REFINE_STEP)
        && (
        <div
          className="next-button"
          onClick={this.props.nextStep}
        />
        )
    }
        {
       !(this.props.currentStep === CUSTOMIZE_STEP)
       && !(this.props.currentStep === BLACKLIST_STEP)
       && (
       <BootstrapButton
         variant="contained"
         size="small"
         color="primary"
         onClick={this.goToResultsPage}
       >
           UNRAVEL THE TRAVEL
       </BootstrapButton>
       )
    }
      </div>
    );
  }
}

const mapStateToProps = state => ({ places: state.placeSearch.places });

const mapDispatchToProps = dispatch => ({ getPlaces: () => dispatch(getPlaces()) });

export default connect(mapStateToProps, mapDispatchToProps)(ContinueButtons);
