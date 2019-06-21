import React from 'react';
import '../preference-button.css';

class PreferenceButton extends React.Component {


    render() {
        return <div className="preference">
          {for(this.props)}
        </div>
    }
}

export default PreferenceButton;
