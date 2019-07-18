import React from 'react';
import { connect } from 'react-redux';
import { StyledSlider } from '../../../shared_components/MUI/slider/styledSlider';
import Rating from 'material-ui-rating';
import {
    DEFAULT_PRICE_RANGE,
    DEFAULT_RATING,
    MAX_RATING,
    MIN_PRICE_LEVEL,
    MAX_PRICE_LEVEL
} from '../../../../constants'

class RefineStepContainer extends React.Component {
    constructor() {
        super();
        //todo redux instead
        this.state = {
            budgetValue: DEFAULT_PRICE_RANGE,
            ratingValue: DEFAULT_RATING,
        };
    }

    changeBudget = (event, budgetValue) => {
        // todo redux
        this.setState({ ...this.state, budgetValue });
    };

    changeRating = (ratingValue) => {
        // todo redux
        this.setState({ ...this.state, ratingValue });
    };

    render() {
        const { budgetValue, ratingValue } = this.state;
        return <div className="refine-container">
                    <div>
                        {/* spacing */}
                    </div>
                    <div className="stepbox-title">
                        <strong>
                            Minimum Rating out of 5:
                        </strong>
                    </div>
                    <Rating
                        value={ratingValue}
                        max={MAX_RATING}
                        onChange={this.changeRating}
                    />
                    <div />
                    <div className="stepbox-title">
                        <strong>
                            Budget Range:
                        </strong>
                    </div>
                    <div className="refine-slider-container">
                        <div>
                            Free
                        </div>
                        <div className="slider-div">
                            {/* todo investigate console warnings coming from this component */}
                            <StyledSlider
                                value={budgetValue}
                                onChange={this.changeBudget}
                                aria-labelledby="budget slider"
                                className="slider"
                                step={1}
                                marks
                                min={MIN_PRICE_LEVEL}
                                max={MAX_PRICE_LEVEL}
                                valueLabelDisplay="auto"
                            />
                        </div>
                        <div>
                            $$$$
                        </div>
                    </div>
                </div>;
    }
}

const mapDispatchToProps = (dispatch) => {
    //todo
    return {};
}
export default connect(null, mapDispatchToProps)(RefineStepContainer)