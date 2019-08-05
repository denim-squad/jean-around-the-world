import React from 'react';
import '../preferences.page.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import ToggleRadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import ToggleRadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import { connect } from 'react-redux';
import { CssCheckbox } from '../../../shared_components/MUI/checkbox/cssCheckbox';
import { setPlaceTypeAndQuantity, removePlaceType } from '../../../../redux/actions';
import { placeLabelToTypeMap } from '../../../../constants';

class CustomizeTripButton extends React.Component {
  constructor(props) {
    super(props);
    this.mappedLabel = placeLabelToTypeMap.get(props.label);

    const { typesAndQuantities } = this.props;
    let filteredItems;
    let isChecked = false;
    if (Array.isArray(typesAndQuantities)) {
      filteredItems = this.props.typesAndQuantities.filter(typeAndQuantity => (
        this.mappedLabel === typeAndQuantity.type
      ));
      isChecked = filteredItems.length > 0;
    }
    const quantity = isChecked ? filteredItems[0].quantity : 1;

    this.state = {
      isChecked,
      isValid: true,
      quantity,
    };
    this.handleCheck = this.handleCheck.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  handleCheck = (event, checked) => {
    this.setState({ isChecked: checked });
    if (checked) {
      this.props.setPlaceTypeAndQuantity(this.state.quantity);
    } else {
      this.props.removePlaceType();
    }
  }

  handleQuantityChange = (event) => {
    const quantity = event.target.value;
    // by default, google returns max 20 results, with an option to get the next page of results
    // currently capping at 20 for simplicity
    if (quantity < 1 || quantity > 20) {
      this.setState({ isValid: false, quantity });
    } else {
      this.setState({ isValid: true, quantity });
      this.props.setPlaceTypeAndQuantity(quantity);
    }
  }

  render() {
    return (
      <div className="customize-buttons-container">
        <FormControlLabel
          className="customize-buttons"
          control={(
            <CssCheckbox
              icon={<ToggleRadioButtonUnchecked />}
              checkedIcon={<ToggleRadioButtonChecked />}
              onChange={this.handleCheck}
              checked={this.state.isChecked}
            />
            )}
          label={this.props.label}
        />
        <TextField
          disabled={!this.state.isChecked}
          error={!this.state.isValid}
          onChange={this.handleQuantityChange}
          type="number"
          defaultValue={this.state.quantity}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  typesAndQuantities: state.placeSearch.typesAndQuantities,
});

const mapDispatchToProps = (dispatch, ownProps) => {
  // todo change
  const mappedLabel = placeLabelToTypeMap.get(ownProps.label);
  return {
    setPlaceTypeAndQuantity: quantity => dispatch(setPlaceTypeAndQuantity(mappedLabel, quantity)),
    removePlaceType: () => dispatch(removePlaceType(mappedLabel)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomizeTripButton);
