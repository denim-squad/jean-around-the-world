import React from 'react';
import Chip from '@material-ui/core/Chip';
import {
  removeBlacklist,
  removeFavourites,
  deletePrevTravel,
  REMOVE_BLACKLIST,
  REMOVE_FAVOURITES,
  DELETE_PREVIOUS_TRAVEL
} from '../../../redux/actions/index';
import { connect } from 'react-redux';
import './preference-button.css';

class PreferenceButton extends React.Component {

      handleDelete = (type, name) => {
        switch (type) {
          case REMOVE_BLACKLIST:
            this.props.removeBlacklist(name);
          case REMOVE_FAVOURITES:
            this.props.removeFavourites(name);
          case DELETE_PREVIOUS_TRAVEL:
            this.props.deletePrevTravel(name);
        }
      }

      render() {
        return(
          <Chip
            label={this.props.name}
            onDelete={() => {this.handleDelete(this.props.type, this.props.name)}}
            className="preference-chip">
          </Chip>
        )
    }
}

const mapStateToProps = (state) => {
  return {
  };
}

export default connect(mapStateToProps, {removeBlacklist, removeFavourites, deletePrevTravel})(PreferenceButton);
