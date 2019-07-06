import React from 'react';
import BlacklistContainer from './blacklist-container'
import FavouritesContainer from './favourites-container'
import { addBlacklist, addFavourites } from '../../../../redux/actions';
import { connect } from 'react-redux';
import '../profile.page.css';

class Profile extends React.Component {
    render() {
        return (
        <div className="profile">
          <div className="profile-info">
            <div className="profile-text">
              Email: {this.props.email}
            </div>
          </div>
          <div className="blacklist-text">
            Blacklist:
          </div>
          <div className="profile-blacklist-container">
            <BlacklistContainer />
          </div>
          <div className="favourites-text">
            Favourites:
          </div>
          <div className="profile-favourites-container">
            <FavouritesContainer />
          </div>
        </div>
      );
    }
}

const mapStateToProps = (state) => {
  return {
    email: state.user.email
  };
}

export default connect(mapStateToProps, {addBlacklist, addFavourites})(Profile);
