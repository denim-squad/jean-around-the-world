import React from 'react';
import '../profile.page.css';
import { connect } from 'react-redux';
import PreferenceButton from '../../../shared_components/preferences/preference-button';
import { GET_PREVIOUS_TRAVEL, DELETE_PREVIOUS_TRAVEL } from '../../../../redux/actions/index';

class PreviousTravelContainer extends React.Component {
    getPreviousTravels = () => Array.from(this.props.previousTravels).map((value, index) => (
      <PreferenceButton
        key={index}
        name={value.name}
        isTravel={GET_PREVIOUS_TRAVEL}
        type={DELETE_PREVIOUS_TRAVEL}
      />
    ))

    render() {
      return (
        <div className="previous-travels-container">
          {this.getPreviousTravels()}
        </div>
      );
    }
}

const mapStateToProps = state => ({
  previousTravels: state.user.previousTravels,
});

export default connect(mapStateToProps)(PreviousTravelContainer);
