/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { connect } from 'react-redux';
import Rating from 'material-ui-rating';
import { StyledSlider } from '../../../shared_components/MUI/slider/styledSlider';
import {
  MAX_RATING,
  MIN_PRICE_LEVEL,
  MAX_PRICE_LEVEL,
} from '../../../../constants';
import { updateRating, updateBudget } from '../../../../redux/actions';
import '../preferences.page.css';

class RefineStepContainer extends React.Component {
  render() {
    const {
      budgetRange, minimumAcceptableRating, updateRating, updateBudget,
    } = this.props;

    return (
      <div className="refine-container">
        <div>
          {/* spacing */}
        </div>
        <div className="stepbox-title">
          <strong>
          Minimum Rating out of 5:
          </strong>
        </div>
        <Rating
          value={minimumAcceptableRating}
          max={MAX_RATING}
          onChange={updateRating}
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
            <StyledSlider
              value={budgetRange}
              onChange={updateBudget}
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  budgetRange: state.placeSearch.budgetRange,
  minimumAcceptableRating: state.placeSearch.minimumAcceptableRating,
});
const mapDispatchToProps = dispatch => ({
  updateRating: rating => dispatch(updateRating(rating)),
  updateBudget: (event, budget) => dispatch(updateBudget(budget)),
});
export default connect(mapStateToProps, mapDispatchToProps)(RefineStepContainer);
