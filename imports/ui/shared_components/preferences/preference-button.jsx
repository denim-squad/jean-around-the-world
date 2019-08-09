import React from 'react';
import Chip from '@material-ui/core/Chip';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import {
  removeBlacklist,
  removeFavourites,
  deletePrevTravel,
  getPrevTravel,
  REMOVE_BLACKLIST,
  REMOVE_FAVOURITES,
  DELETE_PREVIOUS_TRAVEL,
} from '../../../redux/actions/index';
import './preference-button.css';
import LoadingSpinner from '../loading/loadingSpinner';

const history = createBrowserHistory({ forceRefresh: true });

class PreferenceButton extends React.Component {
  constructor() {
    super();
    this.loadingSpinner = React.createRef();
  }

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

      handleClick = async (isTravel, travelName) => {
        if (isTravel) {
          this.props.getPrevTravel(travelName, this.props.userId);
          this.loadingSpinner.current.style.display = 'block';
          await setTimeout(() => {
            this.loadingSpinner.current.style.display = 'none';
            history.push('/results');
          }, 2000);
        }
      }


      render() {
        return (
          <div>
            <LoadingSpinner ref={this.loadingSpinner} />
            <Chip
              label={this.props.name}
              onClick={() => { this.handleClick(this.props.isTravel, this.props.name); }}
              onDelete={() => { this.handleDelete(this.props.type, this.props.name); }}
              className="preference-chip"
            />
          </div>
        );
      }
}

const mapStateToProps = state => ({
  userId: state.user.userId,
});

export default connect(mapStateToProps, {
  removeBlacklist,
  removeFavourites,
  deletePrevTravel,
  getPrevTravel,
})(PreferenceButton);
