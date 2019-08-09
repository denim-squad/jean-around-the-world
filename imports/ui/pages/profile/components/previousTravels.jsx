import React from 'react';
import '../profile.page.css';
import PreviousTravelContainer from './previous-travels-container';


class PreviousTravels extends React.Component {
  render() {
    return (
      <div className="previous-travels">
        <div className="previous-travels-text">
              PREVIOUS TRAVELS
        </div>
        <PreviousTravelContainer />
      </div>
    );
  }
}

export default PreviousTravels;
