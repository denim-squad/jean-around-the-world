import React from 'react';
import './navbar.css'

class Navbar extends React.Component {
    render() {
        // { this.props.isHomePage ? "homepage-navbar-container" : "navbar-container"}
        return <div className="navbar-container">
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
                    LOG IN
                </div>
                <div className="navbar-signup-button">
                    SIGN UP
                </div>
                <div className="navbar-about-button">
                    ABOUT US
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
                <p>
                    JEAN AROUND THE WORLD
                </p>
                <div>
                    {/* spacing */}
                </div>
            </div>
        </div>
    }
}

export default Navbar;
