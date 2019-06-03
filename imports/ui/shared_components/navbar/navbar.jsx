import React from 'react';
import './navbar.css'

class Navbar extends React.Component {
    render() {
        return <div className="navbar-container">
            <div className="navbar-buttons-container">
                { 
                    this.props.isSignedIn ?
                    <div className="navbar-profile-button">
                        { this.props.username }
                    </div> :
                    <div>
                        <em> Please Sign In! </em>
                    </div>
                }
                {/* TODO: onClick -> open login component (redux?) */}
                <div className="navbar-login-button">
                    Login
                </div>
                <div className="navbar-signup-button">
                    Sign Up
                </div>
                <div className="navbar-about-button">
                    About Us
                </div>
            </div>
            <div className="navbar-title">
                {/* <img src="todo"></img> */}
                <h1 className="title-text">
                    Jean Around the World
                </h1>
                { 
                    this.props.isHomePage &&
                    <div className="title-description-container">
                        <h4 className="title-description-text">
                            Unravel the Travel
                        </h4>
                        <h5 className="title-description-text">
                            Here is a description of the project and more interesting stuff
                        </h5>
                    </div>
                }
            </div>
        </div>
    }
}

export default Navbar;
