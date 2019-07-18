import React from 'react';
import '../preferences.page.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import { CssCheckbox } from '../../../shared_components/MUI/checkbox/cssCheckbox';
import ToggleRadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import ToggleRadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import { connect } from 'react-redux';

class CustomizeTripButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isChecked: false, isValid: true };
    this.handleCheck = this.handleCheck.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  handleCheck = (event, checked) => {
    console.log("checked:", checked);
    this.setState({ isChecked: checked })
    //todo dispatch
    if (checked) {
      
    } else {

    }
  }

  handleQuantityChange = (event) => {
    const quantity = event.target.value;
    if (quantity < 1 || quantity > 20) {
      this.setState({ isValid: false});
    } else {
      this.setState({ isValid: true});
      // todo dispatch
    }
  }

  render() {
    return (
      <div>
      <FormControlLabel
        className="customize-buttons"
        control={
          <CssCheckbox
            icon={<ToggleRadioButtonUnchecked />}
            checkedIcon={<ToggleRadioButtonChecked />}
            onChange={this.handleCheck}
          />
        }
        label={this.props.label}
      />
      <TextField
      // todo try to make less ugly
        disabled={!this.state.isChecked}
        error={!this.state.isValid}
        label="How many?"
        onChange={this.handleQuantityChange}
        type="number"
        defaultValue={1}
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
      />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  //todo
}

const mapDispatchToProps = (dispatch, ownProps) => {
  //todo
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomizeTripButton)