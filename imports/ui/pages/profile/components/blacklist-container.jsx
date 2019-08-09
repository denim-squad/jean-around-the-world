import React from 'react';
import '../profile.page.css';
import { connect } from 'react-redux';
import PreferenceButton from '../../../shared_components/preferences/preference-button';
import { REMOVE_BLACKLIST } from '../../../../redux/actions/index';

class BlacklistContainer extends React.Component {
    getBlacklist = () => Array.from(this.props.blacklist).map((value, index) => (
      <PreferenceButton key={index} name={value} type={REMOVE_BLACKLIST} />
    ))

    render() {
      return (
        <div className="blacklist">
          {this.getBlacklist()}
        </div>
      );
    }
}

const mapStateToProps = state => ({
  blacklist: state.user.blacklist,
});

export default connect(mapStateToProps)(BlacklistContainer);
