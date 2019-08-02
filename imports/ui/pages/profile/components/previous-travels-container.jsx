import React from 'react';
import '../profile.page.css';
import { connect } from 'react-redux';
import PreferenceButton from '../../../shared_components/preferences/preference-button';
import { DELETE_PREVIOUS_TRAVEL } from '../../../../redux/actions/index';

class PreviousTravelContainer extends React.Component {
    getPreviousTravels = () => {
      console.log(this.props.blacklist);
      return Array.from(this.props.previousTravels).map((value, index) => (
        <PreferenceButton key={index} name={value} type={DELETE_PREVIOUS_TRAVEL} />
      ));
    }

    render() {
      return (
        <div className="previous-travels-container">
          <br />
        </div>
      );
    }
}

const mapStateToProps = state => ({
  previousTravels: state.user.previousTravels,
  blacklist: state.user.blacklist,
});

export default connect(mapStateToProps)(PreviousTravelContainer);