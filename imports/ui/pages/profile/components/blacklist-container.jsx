import React from 'react';
import '../profile.page.css';
import PreferenceButton from '../../../shared_components/preferences/preference-button'
import { REMOVE_BLACKLIST } from '../../../../redux/actions/index';
import { connect } from 'react-redux';

class BlacklistContainer extends React.Component {

    getBlacklist = () => {
        return Array.from(this.props.blacklist).map((value, index) => {
            return (
              <PreferenceButton key={index} name={value} type={REMOVE_BLACKLIST}/>
            );
        }
    )
}

    render() {
        return (
          <div className="blacklist">
            {this.getBlacklist()}
          </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    blacklist: state.user.blacklist
  };
}

export default connect(mapStateToProps)(BlacklistContainer);
