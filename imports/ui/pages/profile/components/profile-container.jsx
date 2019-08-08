import React from 'react';
import { connect } from 'react-redux';
import Profile from './profile';
import PreviousTravels from './previousTravels';
import LoginToSeeProfileContainer from './login-to-see-profile';
import '../profile.page.css';
import { showModal, NOT_LOGGED_IN_PROFILE } from '../../../../redux/actions'

const images = [
  '/grand_canyon.svg',
  '/lighthouse.svg',
  '/japan.svg',
  '/greece.svg',
  '/eiffel_tower.svg',
  '/london.svg',
  '/ski.svg',
  '/venice.svg',
  '/china.svg',
  '/new_york.svg',
];

class ProfileContainer extends React.Component {
  constructor(){
    super();
    this.state = {
      imgPath: `url(${images[~~(Math.random() * 10)]})`,
    };
  }

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
      <div className="profile-page" style={{ backgroundImage: this.state.imgPath}}>
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
