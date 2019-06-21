import React from 'react';
import Profile from './profile';
import PreviousTravels from './previousTravels';
import '../profile.page.css';

class ProfileContainer extends React.Component {
    render() {
        return (
          <div className="profile-container">
          <Profile />
          <PreviousTravels />
        </div>)
    }
}

export default ProfileContainer;
