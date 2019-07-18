import React from 'react';
import '../preferences.page.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { CssCheckbox } from '../../../shared_components/MUI/checkbox/cssCheckbox';
import ToggleRadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import ToggleRadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import { TextField } from '@material-ui/core';
import { connect } from 'react-redux';

//todo
class CustomizeTripButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,

    }
  }

  handleCheck = (event, checked) => {
    this.state.isChecked = checked;
    if (checked) {
      this.props.dispatch()
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
        disabled={this.isChecked}
        // id="filled-number"
        // label="Number"
        // value={values.age}
        // onChange={handleChange('age')}
        // type="number"
        // className={classes.textField}
        // InputLabelProps={{
        //   shrink: true,
        // }}
        // margin="normal"
        // variant="filled"
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