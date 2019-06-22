import React from 'react';
import '../profile.page.css';
import PreferenceButton from '../../../shared_components/preferences/preference-button'
import { connect } from 'react-redux';

class FavouritesContainer extends React.Component {

    getFavourites = () => {
      return Array.from(this.props.favourites).map((value, index) => {
          return (
            <PreferenceButton key={index} name={value}/>
          );
        }
      )
    }

    render() {
        return (
          <div className="favourites">
            {this.getFavourites()}
          </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    favourites: state.user.favourites
  };
}

export default connect(mapStateToProps)(FavouritesContainer);
