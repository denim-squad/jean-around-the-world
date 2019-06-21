import React from 'react';
import BlacklistContainer from './blacklist-container'
import FavouritesContainer from './favourites-container'
import '../profile.page.css';

class Profile extends React.Component {
    render() {
        return(
        <div className="profile">
          <div className="blacklist-container">
            <BlacklistContainer />
          </div>
          <div className="favourites-container">
            <FavouritesContainer />
          </div>

        </div>
      )
    }
}

export default Profile;
