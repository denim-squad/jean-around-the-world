import React from 'react';
import Chip from '@material-ui/core/Chip';
import { removeBlacklist } from '../../../redux/actions/index';
import { connect } from 'react-redux';
import './preference-button.css';

class PreferenceButton extends React.Component {
    render() {
        return(
          <Chip
            label={this.props.name}
            onDelete={() => {this.props.removeBlacklist(this.props.name)}}
            className="preference-chip">
          </Chip>
        )
    }
}

const mapStateToProps = (state) => {
  return {
  };
}

export default connect(mapStateToProps, {removeBlacklist})(PreferenceButton);
