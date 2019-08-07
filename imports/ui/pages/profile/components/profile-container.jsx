import React from 'react';
import Profile from './profile';
import PreviousTravels from './previousTravels';
import { connect } from 'react-redux';
import '../profile.page.css';

class ProfileContainer extends React.Component {
  render() {
    return (
      <div className="profile-page">
        { this.props.isSignedIn ? (
          <div className="profile-container">
            <Profile />
            <PreviousTravels />
          </div>
        ) :
        (
          <>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isSignedIn: state.user.isSignedIn,
});

export default connect(mapStateToProps, { })(ProfileContainer);
