import React from 'react';
import './navbar.css'
import MapQuery from './mapQuery';

class Navbar extends React.Component {
    render() {
        return <div className={ this.props.isHomePage ? "homepage-navbar-container" : "navbar-container"}>
            <div className="navbar-buttons-container">
                { 
                    this.props.isSignedIn ?
                    <div className="navbar-profile-button">
                        { this.props.username }
                    </div> :
                    <div>
                        {/* spacing */}
                    </div>
                }
                {/* TODO: onClick -> open login component (redux?) */}
                <div className="navbar-login-button">
                    <div className="navbar-login-text">
                        LOG IN
                    </div>
                </div>
                <div className="navbar-signup-button">
                    <div className="navbar-signup-text">
                        SIGN UP
                    </div>
                </div>
                <div className="navbar-about-container">
                    <div className="navbar-about-button">
                        <div className="navbar-about-text">
                            ABOUT US
                        </div>
                    </div>
                    <div>
                        {/* spacing  */}
                    </div>
                </div>
            </div>
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
        </div>
    }
}

export default Navbar;
