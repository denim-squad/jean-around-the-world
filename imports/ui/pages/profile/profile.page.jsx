import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../../shared_components/navbar/navbar';
import ProfileContainer from './components/profile-container';
import LoginToSeeProfileContainer from './components/login-to-see-profile';
import { NOT_LOGGED_IN_PROFILE } from '../../../redux/actions';
import './profile.page.css';

class ProfilePage extends React.Component {
  render() {
    return (
      <div className="profile-page-container">
        <Navbar />
        <ProfileContainer />
        {
          (this.props.modal.modalKind === NOT_LOGGED_IN_PROFILE) &&
            <LoginToSeeProfileContainer />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.modal,
});

export default connect(mapStateToProps)(ProfilePage);
