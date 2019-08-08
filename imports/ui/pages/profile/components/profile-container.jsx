import React from 'react';
import { connect } from 'react-redux';
import Profile from './profile';
import PreviousTravels from './previousTravels';
import LoginToSeeProfileContainer from './login-to-see-profile';
import '../profile.page.css';
import { showModal, NOT_LOGGED_IN_PROFILE } from '../../../../redux/actions'

class ProfileContainer extends React.Component {
  render() {
    if (!this.props.isSignedIn) {
      this.props.showModal(NOT_LOGGED_IN_PROFILE);
      return (
        <div className="profile-page">
        {
          (this.props.modal.modalKind === NOT_LOGGED_IN_PROFILE) && <LoginToSeeProfileContainer />
        }
        </div>
      );
    }
    return (
      <div className="profile-page">
        <Profile />
        <PreviousTravels />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isSignedIn: state.user.isSignedIn,
  modal: state.modal,
});

export default connect(mapStateToProps, { showModal })(ProfileContainer);
