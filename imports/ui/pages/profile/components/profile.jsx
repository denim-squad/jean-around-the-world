import React from 'react';
import { connect } from 'react-redux';
import BlacklistContainer from './blacklist-container';
import FavouritesContainer from './favourites-container';
import { addBlacklist, addFavourites } from '../../../../redux/actions';
import '../profile.page.css';

class Profile extends React.Component {
  render() {
    return (
      <div className="profile">
        <img src="/generic-user-icon-19.jpg" className="profile-pic" />
        <div className="profile-info">
          <div className="profile-text">
              Welcome
            {' '}
            {this.props.fullName}
!
          </div>
        </div>
        <div className="blacklist-text">
            BLACKLIST:
        </div>
        <div className="profile-blacklist-container">
          <BlacklistContainer />
        </div>
        <div className="favourites-text">
            FAVOURITES:
        </div>
        <div className="profile-favourites-container">
          <FavouritesContainer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fullName: state.user.fullName,
});

export default connect(mapStateToProps, { addBlacklist, addFavourites })(Profile);
