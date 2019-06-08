import React from 'react';
import '../preferences.page.css';
import { CUSTOMIZE_STEP, BLACKLIST_STEP, REFINE_STEP } from '../preferences.page';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import ToggleRadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import ToggleRadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import { BootstrapButton } from '../../../shared_components/MUI/button/bootstrapButton';
import { CssCheckbox } from '../../../shared_components/MUI/checkbox/cssCheckbox';
import { CssTextField } from '../../../shared_components/MUI/textfield/cssTextfield';
import { StyledSlider } from '../../../shared_components/MUI/slider/styledSlider';

class StepBox extends React.Component {

    constructor() {
        super();
        this.state = {
            value: 50,
        };
    }

    changeRadius = (event, value) => {
        this.setState({ value });
    };

    renderCurrentStep = () => {
        const { value } = this.state;
        switch (this.props.currentStep) {
            case CUSTOMIZE_STEP:
                return <div className="customize-container">
                    <div className="stepbox-title">
                        <strong>
                            What would you like to be included in your trip?
                        </strong>
                    </div>
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
                        <FormControlLabel
                            className="customize-buttons"
                            control={
                                <CssCheckbox
                                    checked={this.props.isBar}
                                    icon={<ToggleRadioButtonUnchecked />}
                                    checkedIcon={<ToggleRadioButtonChecked />}
                                />
                            }
                            label="Bars"
                        />
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
                        <FormControlLabel
                            className="customize-buttons"
                            control={
                                <CssCheckbox
                                    checked={this.props.isCoffee}
                                    icon={<ToggleRadioButtonUnchecked />}
                                    checkedIcon={<ToggleRadioButtonChecked />}
                                />
                            }
                            label="Coffee"
                        />
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
                            margin="none"/>
                        <BootstrapButton
                            className="add-button"
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
                </div>;
            case REFINE_STEP:
                return <div className="refine-container">
                    <div>
                        {/* spacing */}
                    </div>
                    <div className="stepbox-title">
                        <strong>
                            Minimum Rating out of 5:
                        </strong>
                    </div>
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
                            <StyledSlider 
                                value={value} 
                                onChange={this.changeRadius} 
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

export default StepBox;
