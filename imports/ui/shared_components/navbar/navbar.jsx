import React from 'react';
import { connect } from 'react-redux';
import './navbar.css';
import { createBrowserHistory } from 'history';
import MapQuery from './mapQuery';
import Login from '../login/login';
import Signup from '../signup/signup';
import LoginToSeeProfileContainer from '../../pages/profile/components/login-to-see-profile'
import {
  showModal, logoutUser, LOGIN, SIGNUP,
} from '../../../redux/actions';

import LoadingSpinner from '../loading/loadingSpinner';

const history = createBrowserHistory({ forceRefresh: true });

class Navbar extends React.Component {
  constructor() {
    super();
    this.loadingSpinner = React.createRef();
  }

    goToHomePage = async () => {
      this.loadingSpinner.current.style.display = 'block';
      await setTimeout(() => {
        this.loadingSpinner.current.style.display = 'none';
      }, 3000);
      history.push('/');
    }

    goToAboutPage = async () => {
      this.loadingSpinner.current.style.display = 'block';
      await setTimeout(() => {
        this.loadingSpinner.current.style.display = 'none';
      }, 3000);
      history.push('/about');
    }

    goToProfilePage = async () => {
      this.loadingSpinner.current.style.display = 'block';
      await setTimeout(() => {
        this.loadingSpinner.current.style.display = 'none';
      }, 3000);
      history.push('/profile');
    }

    openModal = kind => () => {
      this.props.showModal(kind);
    }

    showSpecificModal = (kind) => {
      switch (kind) {
        case LOGIN:
          return <Login />;
        case SIGNUP:
          return <Signup />;
      }
    }

    logout = () => {
      event.preventDefault();
      this.props.logoutUser();
    }

    render() {
      return (
        <div className={this.props.isHomePage ? 'homepage-navbar-container' : 'navbar-container'}>
          <LoadingSpinner ref={this.loadingSpinner} />
          {
                this.props.isSignedIn
                  ? (
                    <div className="navbar-buttons-container">
                      <div className="navbar-button" onClick={this.goToProfilePage}>
                        <div className="navbar-text username">
                          {this.props.fullName}
                        </div>
                      </div>
                      <div>
                        {/* spacing  */}
                      </div>
                      <div>
                        {/* spacing  */}
                      </div>
                      <div className="navbar-button" onClick={this.goToHomePage}>
                        <div className="navbar-text">
                            HOME
                        </div>
                      </div>
                      <div className="navbar-button" onClick={this.goToAboutPage}>
                        <div className="navbar-text">
                            ABOUT US
                        </div>
                      </div>
                      <div className="navbar-last-container">
                        <div className="navbar-button" onClick={this.logout}>
                          <div className="navbar-text">
                                LOG OUT
                          </div>
                        </div>
                        <div>
                          {/* spacing  */}
                        </div>
                      </div>
                    </div>
                  )
                  : (
                    <div className="navbar-buttons-container">
                      <div>
                        {/* spacing  */}
                      </div>
                      <div>
                        {/* spacing */}
                      </div>
                      <div className="navbar-button" onClick={this.goToHomePage}>
                        <div className="navbar-text">
                            HOME
                        </div>
                      </div>
                      <div className="navbar-button" onClick={this.goToAboutPage}>
                        <div className="navbar-text">
                            ABOUT US
                        </div>
                      </div>
                      <div className="navbar-button">
                        <div className="navbar-text" onClick={this.openModal(SIGNUP)}>
                            SIGN UP
                        </div>
                      </div>
                      <div className="navbar-last-container">
                        <div className="navbar-button">
                          <div className="navbar-text" onClick={this.openModal(LOGIN)}>
                                LOG IN
                          </div>
                        </div>
                        <div>
                          {/* spacing  */}
                        </div>
                      </div>
                    </div>
                  )
            }
          <div className="title-container">
            <div className="logo-container">
              <img src="/logo.svg" />
            </div>
            <p className="title">
                    JEAN AROUND THE WORLD
            </p>
            <div>
              {
                    this.props.isHomePage
                    && (
                    <div className="title-description-container">
                      <div>
                        {/* spacing */}
                      </div>
                      <div className="title-description-text-container">
                        <div className="description-title">
                                UNRAVEL THE TRAVEL
                        </div>
                        <div className="description">
                            Never be afraid of the question "What do you want to do today?" ever again.
                            Jean Around the World will give you the adventures of your lifetime.
                        </div>
                      </div>
                      <div>
                        {/* spacing */}
                      </div>
                    </div>
                    )
                }
            </div>
          </div>
          {
              this.props.isHomePage
              && <MapQuery />
          }
          {
              this.showSpecificModal(this.props.modal.modalKind)
          }
        </div>
      );
    }
}

const mapStateToProps = state => ({
  modal: state.modal,
  isSignedIn: state.user.isSignedIn,
  fullName: state.user.fullName,
});

export default connect(mapStateToProps, { showModal, logoutUser })(Navbar);
