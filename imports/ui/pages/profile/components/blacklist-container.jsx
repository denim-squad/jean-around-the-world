import React from 'react';
import '../profile.page.css';
import PreferenceButton from '../../../shared_components/preferences/preference-button'
import { connect } from 'react-redux';

class BlacklistContainer extends React.Component {

    getBlacklist = () => {
        return Array.from(this.props.blacklist).map((value, index) => {
            console.log(value);
            return (
              <div className="blacklist-container" key={index}>
              <PreferenceButton name={value}/>
              </div>
            )
        }
    )
}

    render() {
        return <div className="blacklist">
          {this.getBlacklist}
        </div>
    }
}

const mapStateToProps = (state) => {
  return {
    blacklist: state.preferences.blacklist
  };
}

export default connect(mapStateToProps)(BlacklistContainer);
