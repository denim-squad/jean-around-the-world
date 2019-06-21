import React from 'react';
import { connect } from 'react-redux';
import './navbar.css'
import MapQuery from './mapQuery';
import Login from '../login/login';
import { showModal, logoutUser } from '../../.././redux/actions'
import { createBrowserHistory } from 'history';

const history = createBrowserHistory({forceRefresh: true});

class Navbar extends React.Component {

    goToHomePage = async () => {
        // this.loadingSpinner.current.style.display = 'block';
        await setTimeout(() => {
            // this.loadingSpinner.current.style.display = 'none';
            history.push('/');
        }, 1400);
    }

    goToAboutPage = async () => {
        // this.loadingSpinner.current.style.display = 'block';
        await setTimeout(() => {
            // this.loadingSpinner.current.style.display = 'none';
            history.push('/about');
        }, 1400);
      }

    openModal = (event) => {
      // prevent automatic page refresh
      event.preventDefault();
      this.props.showModal();
    }

    logout = () => {
      event.preventDefault();
      this.props.logoutUser();
    }

    render() {
        return <div className={ this.props.isHomePage ? "homepage-navbar-container" : "navbar-container"}>
            {
                this.props.isSignedIn ?
                <div className="navbar-buttons-container">
                    <div className="navbar-button">
                        <div className="navbar-text">
                            {this.props.username}
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
                </div> :
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
                        <div className="navbar-text">
                            SIGN UP
                        </div>
                    </div>
                    <div className="navbar-last-container">
                        <div className="navbar-button" onClick={this.openModal}>
                            <div className="navbar-text">
                                LOG IN
                            </div>
                        </div>
                        <div>
                            {/* spacing  */}
                        </div>
                    </div>
                </div>
            }
            <div className="title-container">
                <div>
                    {/* spacing */}
                </div>
                <div className="logo-container">
                   {/* TODO: logo */}
                </div>
                <p className="title">
                    JEAN AROUND THE WORLD
                </p>
                <div>
                    {
                        this.props.isHomePage &&
                        <div className="title-description-container">
                            <div>
                                {/* spacing */}
                            </div>
                            <div className="title-description-text-container">
                                <div className="description-title">
                                    UNRAVEL THE TRAVEL
                                </div>
                                <div className="description">
                                    Here is a description of the project and more interesting stuff.
                                </div>
                            </div>
                            <div>
                                {/* spacing */}
                            </div>
                        </div>
                    }
                </div>
            </div>
            {
                this.props.isHomePage &&
                <MapQuery />
            }
            {
                <Login/>
            }
        </div>
    }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.login.isSignedIn,
    username: state.login.username
  };
}

export default connect(mapStateToProps, { showModal, logoutUser })(Navbar);
