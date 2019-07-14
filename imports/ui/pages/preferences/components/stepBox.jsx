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

    renderCurrentStep = () => {
        const { budgetValue, ratingValue } = this.state;
        switch (this.props.currentStep) {
            case CUSTOMIZE_STEP:
                return <div className="customize-container">
                    <div className="stepbox-title">
                        <strong>
                            What would you like to be included in your trip?
                        </strong>
                    </div>
                    {/* todos 
                        - allow clicking to choose how many of each type of venue
                          e.g. 3 restaurants, 1 hotel, 4 attractions 
                        - change global state based on what is selected
                    */}
                    <FormGroup>
                        <FormControlLabel
                            className="customize-buttons"
                            control={
                                <CssCheckbox
                                    checked={this.props.isRestaurant}
                                    icon={<ToggleRadioButtonUnchecked />}
                                    checkedIcon={<ToggleRadioButtonChecked />}
                                />
                            }
                            label="Restaurants"
                        />
                        {/* <FormControlLabel
                            className="customize-buttons"
                            control={
                                <CssCheckbox
                                    checked={this.props.isBar}
                                    icon={<ToggleRadioButtonUnchecked />}
                                    checkedIcon={<ToggleRadioButtonChecked />}
                                />
                            }
                            label="Bars"
                        /> */}
                        <FormControlLabel
                            className="customize-buttons"
                            control={
                                <CssCheckbox
                                    checked={this.props.isDessert}
                                    icon={<ToggleRadioButtonUnchecked />}
                                    checkedIcon={<ToggleRadioButtonChecked />}
                                />
                            }
                            label="Dessert"
                        />
                        {/* <FormControlLabel
                            className="customize-buttons"
                            control={
                                <CssCheckbox
                                    checked={this.props.isCoffee}
                                    icon={<ToggleRadioButtonUnchecked />}
                                    checkedIcon={<ToggleRadioButtonChecked />}
                                />
                            }
                            label="Coffee"
                        /> */}
                        <FormControlLabel
                            className="customize-buttons"
                            control={
                                <CssCheckbox
                                    checked={this.props.isHotel}
                                    icon={<ToggleRadioButtonUnchecked />}
                                    checkedIcon={<ToggleRadioButtonChecked />}
                                />
                            }
                            label="Hotels"
                        />
                        <FormControlLabel
                            className="customize-buttons"
                            control={
                                <CssCheckbox
                                    checked={this.props.isPark}
                                    icon={<ToggleRadioButtonUnchecked />}
                                    checkedIcon={<ToggleRadioButtonChecked />}
                                />
                            }
                            label="Parks"
                        />
                        <FormControlLabel
                            className="customize-buttons"
                            control={
                                <CssCheckbox
                                    checked={this.props.isLandmark}
                                    icon={<ToggleRadioButtonUnchecked />}
                                    checkedIcon={<ToggleRadioButtonChecked />}
                                />
                            }
                            label="Landmarks/Attractions"
                        />
                    </FormGroup>
                </div>;
            case BLACKLIST_STEP:
                return <div className="blacklist-container">
                    <div className="stepbox-title">
                        <strong>
                            Enter a location to blacklist
                        </strong>
                    </div>
                    <div className="blacklist-add-container">
                        <CssTextField
                            placeholder="John Sastrillo's House"
                            margin="none"
                            inputRef = {(input) => {this.blacklistInput = input}}/>
                        <BootstrapButton
                            className="add-button"
                            onClick={() => {this.props.addBlacklist(this.blacklistInput.value)}}
                            disabled={this.props.isLocationEmpty}
                            variant="contained"
                            size="small"
                            color="primary">
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
                </div>;
            case REFINE_STEP:
                return <div className="refine-container">
                    <div>
                        {/* spacing */}
                    </div>
                    <div className="stepbox-title">
                        <strong>
                          {/* todo discuss whether min rating of 5 should be allowed */}
                            Minimum Rating out of 5:
                        </strong>
                    </div>
                    <Rating
                        value={ratingValue}
                        max={5}
                        onChange={this.changerating}
                    />
                    <div />
                    <div className="stepbox-title">
                        <strong>
                            Budget Range:
                        </strong>
                    </div>
                    <div className="refine-slider-container">
                        <div>
                            $
                        </div>
                        <div className="slider-div">
                          {/* todo make this slider discrete from 0 to 4 inclusive */}
                            <StyledSlider
                                value={budgetValue}
                                onChange={this.changeBudget}
                                aria-labelledby="budget slider"
                                className="slider"
                            />
                        </div>
                        <div>
                            $$$$
                        </div>
                    </div>
                </div>;
            default:
                return "FOLLOW @hailinzhang_ ON INSTAGRAM";
        }
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
