import React from 'react';
import '../../preferences.page.css';
import { CUSTOMIZE_STEP, REFINE_STEP } from '../../preferences.page';

class ContinueButtons extends React.Component {

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
            
        </div>;
    }

}

export default ContinueButtons;
