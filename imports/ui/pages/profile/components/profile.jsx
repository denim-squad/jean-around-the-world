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
          <img src="/generic-profile.png" className="profile-pic"/>
          <div className="profile-info">
            <div className="profile-text">
              Welcome {this.props.fullName}!
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

const mapStateToProps = (state) => {
  return {
    fullName: state.user.fullName
  };
}

export default connect(mapStateToProps, {addBlacklist, addFavourites})(Profile);
