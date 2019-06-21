import React from 'react';
import BootstrapButton from '../MUI/button/bootstrapButton'
import './preference-button.css';

class PreferenceButton extends React.Component {
    render() {
        return(
          <button className="preference-button">
            {this.props.name}
          </button>
        )
    }
}

export default PreferenceButton;
