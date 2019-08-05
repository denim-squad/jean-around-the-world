import React from 'react';
import '../profile.page.css';
import { connect } from 'react-redux';
import PreferenceButton from '../../../shared_components/preferences/preference-button';
import { REMOVE_FAVOURITES } from '../../../../redux/actions/index';

class FavouritesContainer extends React.Component {
    getFavourites = () => Array.from(this.props.favourites).map((value, index) => (
      <PreferenceButton key={index} name={value} type={REMOVE_FAVOURITES} />
    ))

    render() {
      return (
        <div className="favourites">
          {this.getFavourites()}
        </div>
      );
    }
}

const mapStateToProps = state => ({
  favourites: state.user.favourites,
});

export default connect(mapStateToProps)(FavouritesContainer);
