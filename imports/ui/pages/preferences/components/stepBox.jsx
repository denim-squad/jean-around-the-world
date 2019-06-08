import React from 'react';
import '../preferences.page.css';
import { CUSTOMIZE_STEP, BLACKLIST_STEP, REFINE_STEP } from '../preferences.page';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import ToggleRadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import ToggleRadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import { withStyles } from '@material-ui/core/styles';

const CssCheckbox =  withStyles({
    root: {
        color: '#009688 !important',
        '&:hover': {
          backgroundColor: '#8BCFC9 !important',
        },
    },
})(Checkbox);


class StepBox extends React.Component {

    renderCurrentStep = () => {
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
                return <div />;
            case REFINE_STEP:
                return <div />;
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
