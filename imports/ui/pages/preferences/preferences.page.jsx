import React from 'react';
import Navbar from '../../shared_components/navbar/navbar';
import './preferences.page.css';
import StepText from './components/stepText';
import StepIcon from './components/stepIcon';
import StepBox from './components/stepBox';
import ContinueButtons from './components/shared/continueButtons';

export const CUSTOMIZE_STEP = 1, BLACKLIST_STEP = 2, REFINE_STEP = 3;

const images = [
    "/grand_canyon.svg",
    "/lighthouse.svg",
    "/japan.svg",
    "/greece.svg",
    "/eiffel_tower.svg",
    "/london.svg",
    "/ski.svg",
    "/venice.svg",
    "/china.svg",
    "/new_york.svg",
];

class PreferencesPage extends React.Component {
  
    constructor() {
        super();
        this.state = { 
            imgPath: "url(" + images[~~(Math.random() *10)] + ")",
            currentStep: CUSTOMIZE_STEP
        };
    }

    previousStep = () => {
        if (prevState.currentStep > CUSTOMIZE_STEP) {
            this.setState((prevState) => {
                {prevState.imgPath, prevState.currentStep - 1}
            });

        }
    }

    nextStep = () => {
        if (prevState.currentStep < REFINE_STEP) {
            this.setState((prevState) => {
                {prevState.imgPath, prevState.currentStep + 1}
            });
        }
    }
  
    render() {
        return <div className="preferences-page-container">
            <Navbar />
            <div className="preferences-background" style={{ backgroundImage: this.state.imgPath }}>
                <div className="preferences-modal-container">
                    <div className="preferences-row">
                        <div>
                            <StepText />
                            <StepIcon />
                            <ContinueButtons />
                        </div>
                        <StepBox />
                    </div>
                </div>
            </div>
        </div>
    }
}

export default PreferencesPage;
