import React from 'react';
import '../profile.page.css';
import PreferenceButton from '../../../shared_components/preferences/preference-button'
import { connect } from 'react-redux';

class FavouritesContainer extends React.Component {

    getFavourites = () => {
      return Array.from(this.props.favourites).map((value, index) => {
                 return (
                 <div className="preference-container" key={index}>
                   <PreferenceButton name={value}/>
                 </div>);
            }
          )
    }

    render() {
        return (<div className="preference">
          {this.getFavourites()}
          </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    favourites: state.preferences.favourites
  };
}

export default connect(mapStateToProps)(FavouritesContainer);
