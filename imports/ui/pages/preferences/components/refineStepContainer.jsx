import React from 'react';
import { connect } from 'react-redux';
import { StyledSlider } from '../../../shared_components/MUI/slider/styledSlider';
import Rating from 'material-ui-rating';
import {
  MAX_RATING,
  MIN_PRICE_LEVEL,
  MAX_PRICE_LEVEL
} from '../../../../constants'
import { updateRating, updateBudget } from '../../../../redux/actions';

class RefineStepContainer extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { budgetRange, minimumAcceptableRating, updateRating, updateBudget } = this.props;

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
          {/* todo investigate console warnings coming from this component */}
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
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    budgetRange: state.placeSearch.budgetRange,
    minimumAcceptableRating: state.placeSearch.minimumAcceptableRating
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateRating: (rating) => dispatch(updateRating(rating)),
    updateBudget: (event, budget) => dispatch(updateBudget(budget))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(RefineStepContainer)