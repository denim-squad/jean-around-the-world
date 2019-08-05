import React from 'react';
import '../preferences.page.css';
import { CUSTOMIZE_STEP, BLACKLIST_STEP, REFINE_STEP } from '../preferences.page';

class StepIcon extends React.Component {
  render() {
    switch (this.props.currentStep) {
      case CUSTOMIZE_STEP:
        return (
          <div>
            <img src="/stepIcon-customize.svg" />
          </div>
        );
      case BLACKLIST_STEP:
        return (
          <div>
            <img src="/stepIcon-blacklist.svg" />
          </div>
        );
      case REFINE_STEP:
        return (
          <div>
            <img src="/stepIcon-refine.svg" />
          </div>
        );
      default:
        return (
          <div>
            <img src="/stepIcon-customize.svg" />
          </div>
        );
    }
  }
}

export default StepIcon;
