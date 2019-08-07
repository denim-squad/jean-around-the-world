import React from 'react';
import Profile from './profile';
import PreviousTravels from './previousTravels';
import LoginToSeeProfileContainer from './login-to-see-profile';
import { connect } from 'react-redux';
import '../profile.page.css';
import { showModal, NOT_LOGGED_IN_PROFILE } from '../../../../redux/actions'

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
          <br />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isSignedIn: state.user.isSignedIn,
});

export default connect(mapStateToProps, { showModal })(ProfileContainer);
