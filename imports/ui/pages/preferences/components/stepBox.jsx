import React from 'react';
import '../preferences.page.css';
import { CUSTOMIZE_STEP, BLACKLIST_STEP, REFINE_STEP } from '../preferences.page';
import { addBlacklist } from '../../../../redux/actions/index';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import ToggleRadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import PreferenceButton from '../../../shared_components/preferences/preference-button'
import ToggleRadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import { BootstrapButton } from '../../../shared_components/MUI/button/bootstrapButton';
import { CssCheckbox } from '../../../shared_components/MUI/checkbox/cssCheckbox';
import { CssTextField } from '../../../shared_components/MUI/textfield/cssTextfield';
import { StyledSlider } from '../../../shared_components/MUI/slider/styledSlider';
import Rating from 'material-ui-rating';

class StepBox extends React.Component {

    constructor() {
        super();
        this.blacklistInput = React.createRef();
        this.state = {
            budgetValue: 50,
            ratingValue: 5,
        };
    }

    changeBudget = (event, budgetValue) => {
        this.setState({ ...this.state, budgetValue });
    };

    rating = (event, ratingValue) => {
        this.setState({ ...this.state, budgetValue });
    };

    getBlacklist = () => {
        return Array.from(this.props.blacklist).map((value, index) => {
            return (
              <PreferenceButton key={index} name={value}/>
            );
        }
      )}

  getBlacklist = () => {
      //todo put in state
    return Array.from(this.props.blacklist).map((value, index) => {
      return (
        <PreferenceButton key={index} name={value} />
      );
    }

    render() {
        return <div className="stepbox-container">
            <div className="stepbox-padding">
                {
                    this.renderCurrentStep()
                }
            </div>
         </div>;
    }

}

const mapStateToProps = (state) => {
  return {
    blacklist: state.user.blacklist
  };
}

export default connect(mapStateToProps, {addBlacklist})(StepBox);
