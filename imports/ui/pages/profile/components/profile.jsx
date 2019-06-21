import React from 'react';
import BlacklistContainer from './blacklist-container'
import FavouritesContainer from './favourites-container'
import { connect } from 'react-redux';
import '../profile.page.css';

class Profile extends React.Component {
    render() {
        return(
        <div className="profile">
          <div className="profile-info">
            <div className="profile-text">
              Email: {this.props.email}
            </div>
          </div>
          <div className="blacklist-text">
            Blacklist:
          </div>
          <div className="blacklist-container">
            <BlacklistContainer />
          </div>
          <div className="favourites-text">
            Favourites:
          </div>
          <div className="favourites-container">
            <FavouritesContainer />
          </div>
        </div>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    email: state.login.email
  };
}

export default connect(mapStateToProps)(Profile);
