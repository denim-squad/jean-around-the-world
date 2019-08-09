import React from 'react';
import './loadingSpinner.css';

class LoadingSpinner extends React.Component {
  render() {
    return <div className="loading-spinner" ref={this.props.innerRef} />;
  }
}

export default React.forwardRef((props, ref) => <LoadingSpinner innerRef={ref} />);
