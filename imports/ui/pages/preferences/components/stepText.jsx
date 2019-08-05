import React from 'react';
import '../preferences.page.css';
import { CUSTOMIZE_STEP, BLACKLIST_STEP, REFINE_STEP } from '../preferences.page';

class StepText extends React.Component {
  render() {
    return (
      <div className="step-text-container">
        <div className="step-text-title">
          <strong>
            {
                    this.props.currentStep === CUSTOMIZE_STEP
                      ? '1. CUSTOMIZE YOUR TRIP'
                      : this.props.currentStep === BLACKLIST_STEP
                        ? "2. BLACKLIST WHAT YOU DON'T WANT"
                        : this.props.currentStep === REFINE_STEP
                          ? '3. REFINE YOUR PREFERENCES'
                          : 'FOLLOW @hailinzhang_ ON INSTAGRAM'
                }
          </strong>
        </div>
        <div className="step-text-description">
          {
                    this.props.currentStep === CUSTOMIZE_STEP
                      ? 'Looking for a new coffee run? Or maybe want to explore a new city for an entire day with a group of friends? Select what you’re feeling like doing!'
                      : this.props.currentStep === BLACKLIST_STEP
                        ? 'Have a place in mind that you specifically DON’T want to include in your trip? Add it to the blacklist.'
                        : this.props.currentStep === REFINE_STEP
                          ? 'Only want 5-star reviewed locations? Saving up and want to spend less? Personalize the trip how you would like it!'
                          : 'FOLLOW @hailinzhang_ ON INSTAGRAM'
                }
        </div>
      </div>
    );
  }
}

export default StepText;
