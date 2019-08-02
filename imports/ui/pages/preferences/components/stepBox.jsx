import React from 'react';
import '../preferences.page.css';
import { connect } from 'react-redux';
import FormGroup from '@material-ui/core/FormGroup';
import { CUSTOMIZE_STEP, BLACKLIST_STEP, REFINE_STEP } from '../preferences.page';
import { addBlacklist } from '../../../../redux/actions/index';
import PreferenceButton from '../../../shared_components/preferences/preference-button';
import { BootstrapButton } from '../../../shared_components/MUI/button/bootstrapButton';
import CustomizeTripButton from './customizeTripButton';
import { CssTextField } from '../../../shared_components/MUI/textfield/cssTextfield';
import RefineStepContainer from './refineStepContainer';

class StepBox extends React.Component {
  constructor() {
    super();
    this.blacklistInput = React.createRef();
  }

  getBlacklist = () =>
  // todo put in state
    Array.from(this.props.blacklist).map((value, index) => (
      <PreferenceButton key={index} name={value} />
    ))


  renderCurrentStep = () => {
    switch (this.props.currentStep) {
      case CUSTOMIZE_STEP:
        return (
          <div className="customize-container">
            <div className="stepbox-title">
              <strong>
              What would you like to be included in your trip?
              </strong>
            </div>
            <FormGroup>
              {/* todo make responsive and consider more types */}
              <div className="form-container">
                <CustomizeTripButton label="Coffee" />
                <CustomizeTripButton label="Fast Food" />
                <CustomizeTripButton label="Bakeries" />
                <CustomizeTripButton label="Restaurants" />
                <CustomizeTripButton label="Bars" />
                <CustomizeTripButton label="Parks" />
                <CustomizeTripButton label="Hotels" />
                {/* <CustomizeTripButton label="Nightclubs" /> */}
                {/* todo, this isn't a directly searchable type but may be a returned type
                            (point_of_interest), so would need some additional work */}
                {/* <FormControlLabel
              className="customize-buttons"
              control={
                <CssCheckbox
                  checked={this.props.isLandmark}
                  icon={<ToggleRadioButtonUnchecked />}
                  checkedIcon={<ToggleRadioButtonChecked />}
                />
              }
              label="Landmarks/Attractions"
            /> */}
              </div>
            </FormGroup>
          </div>
        );
      case BLACKLIST_STEP:
        return (
          <div className="blacklist-container">
            <div className="stepbox-title">
              <strong>
              Enter a location to blacklist
              </strong>
            </div>
            <div className="blacklist-add-container">
              <CssTextField
                placeholder="John Sastrillo's House"
                margin="none"
                inputRef={(input) => { this.blacklistInput = input; }}
              />
              <BootstrapButton
                className="add-button"
                onClick={() => { this.props.addBlacklist(this.blacklistInput.value); }}
                disabled={this.props.isLocationEmpty}
                variant="contained"
                size="small"
                color="primary"
              >
              ADD
              </BootstrapButton>
            </div>
            <div>
              {/* spacing */}
            </div>
            <div className="stepbox-title">
              <strong>
              Blacklist:
              </strong>
            </div>
            <div className="blacklist-buttons-container">
              {this.getBlacklist()}
            </div>
          </div>
        );
      case REFINE_STEP:
        return <RefineStepContainer />;
      default:
        return 'FOLLOW @hailinzhang_ ON INSTAGRAM';
    }
  }

  render() {
    return (
      <div className="stepbox-container">
        <div className="stepbox-padding">
          {
          this.renderCurrentStep()
        }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  blacklist: state.user.blacklist,
});

export default connect(mapStateToProps, { addBlacklist })(StepBox);
