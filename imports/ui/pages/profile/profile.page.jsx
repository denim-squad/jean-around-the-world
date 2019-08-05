import React from 'react';
import Navbar from '../../shared_components/navbar/navbar';
import ProfileContainer from './components/profile-container';
import './profile.page.css';

class ProfilePage extends React.Component {
  render() {
    return (
      <div className="profile-page-container">
        <Navbar />
        <ProfileContainer />
      </div>
    );
  }
}

export default ProfilePage;
