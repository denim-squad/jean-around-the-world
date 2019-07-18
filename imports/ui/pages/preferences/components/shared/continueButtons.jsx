import React from 'react';
import { createBrowserHistory } from 'history';
import '../../preferences.page.css';
import { BootstrapButton } from '../../../../shared_components/MUI/button/bootstrapButton';
import { CUSTOMIZE_STEP, BLACKLIST_STEP, REFINE_STEP } from '../../preferences.page';

const history = createBrowserHistory({forceRefresh: true});

class ContinueButtons extends React.Component {

    goToResultsPage = async () => {
        // this.loadingSpinner.current.style.display = 'block';
        await setTimeout(() => {
            // this.loadingSpinner.current.style.display = 'none';
            history.push('/results');
        }, 2800);
    }

    render() {
        return <div className="nav-buttons-container">
        {
            !(this.props.currentStep === CUSTOMIZE_STEP) ?
            <div
                className="back-button"
                onClick={this.props.previousStep}
                ></div> :
            <div>
                {/* spacing */}
            </div>
        }
        {
          // todo remove this check when implementing finished trip view
            !(this.props.currentStep === REFINE_STEP) &&
            <div
                className="next-button"
                onClick={this.props.nextStep}
                ></div>
        }
        {
           !(this.props.currentStep === CUSTOMIZE_STEP) &&
           !(this.props.currentStep === BLACKLIST_STEP) &&
           <BootstrapButton
               variant="contained"
               size="small"
               color="primary"
               onClick={this.goToResultsPage}>
               UNRAVEL THE TRAVEL
           </BootstrapButton>
        }

        </div>;
    }

}

export default ContinueButtons;
