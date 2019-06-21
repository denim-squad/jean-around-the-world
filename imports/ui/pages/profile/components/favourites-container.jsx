import React from 'react';
import '../profile.page.css';
import { connect } from 'react-redux';
import {  } from '../../.././redux/actions';

class FavouritesContainer extends React.Component {
    render() {
        return <div className="preference">

        </div>
    }
}

const mapStateToProps = (state) => {
  return {
    favourites: state.preferences.favourites
  };
}

export default connect(mapStateToProps, {})FavouritesContainer;
