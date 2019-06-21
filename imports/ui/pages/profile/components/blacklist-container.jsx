import React from 'react';
import '../profile.page.css';
import PreferenceButton from '../../../shared_components/preferences/preference-button'
import { connect } from 'react-redux';

class BlacklistContainer extends React.Component {

    getBlacklist = () => {
      return Array.from(this.props.blacklist).map((value, index) => {
                 console.log(value);
                 return(
                  <div className="preference-container" key={index}>
                    <PreferenceButton name={value}/>
                  </div>
                )
            }
        )
    }

    render() {
        return <div className="preference">
          {this.getBlacklist()}
        </div>
    }
}

const mapStateToProps = (state) => {
  return {
    blacklist: state.preferences.blacklist
  };
}

export default connect(mapStateToProps)(BlacklistContainer);
