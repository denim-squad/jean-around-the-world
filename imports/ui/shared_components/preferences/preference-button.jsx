import React from 'react';
import Chip from '@material-ui/core/Chip';
import { connect } from 'react-redux';
import {
  removeBlacklist,
  removeFavourites,
  deletePrevTravel,
  REMOVE_BLACKLIST,
  REMOVE_FAVOURITES,
  DELETE_PREVIOUS_TRAVEL,
} from '../../../redux/actions/index';
import './preference-button.css';

class PreferenceButton extends React.Component {
      handleDelete = (type, name) => {
        switch (type) {
          case REMOVE_BLACKLIST:
            this.props.removeBlacklist(name);
            break;
          case REMOVE_FAVOURITES:
            this.props.removeFavourites(name);
            break;
          case DELETE_PREVIOUS_TRAVEL:
            this.props.deletePrevTravel(name, this.props.userId);
            break;
          default:
        }
      }

      render() {
        return (
          <Chip
            label={this.props.name}
            onDelete={() => { this.handleDelete(this.props.type, this.props.name); }}
            className="preference-chip"
          />
        );
      }
}

const mapStateToProps = state => ({
  userId: state.user.userId,
});

export default connect(mapStateToProps, { removeBlacklist, removeFavourites, deletePrevTravel })(PreferenceButton);
