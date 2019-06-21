import React from 'react';
import '../profile.page.css';

class BlacklistContainer extends React.Component {


    render() {
        return <div className="preference">
          {for()}
        </div>
    }
}

const mapStateToProps = (state) => {
  return {
    blacklist: state.preferences.blacklist
  };
}

export default BlacklistContainer;
