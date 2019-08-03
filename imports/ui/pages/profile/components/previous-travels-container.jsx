import React from 'react';
import '../profile.page.css';
import PreferenceButton from '../../../shared_components/preferences/preference-button'
import { connect } from 'react-redux';

class PreviousTravelContainer extends React.Component {

    getBlacklist = () => {
        return Array.from(this.props.previousTravels).map((value, index) => {
            return (
              <PreferenceButton key={index} name={value}/>
            );
        }
    )
}

    render() {
        return (
          <div className="previous-travels-container">
            <br/>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    previousTravels: state.user.previousTravels
  };
}

export default connect(mapStateToProps)(PreviousTravelContainer);
