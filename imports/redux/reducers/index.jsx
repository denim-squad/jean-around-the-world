import { combineReducers } from 'redux';
import {
  SHOW_MODAL,
  HIDE_MODAL,
  SET_RADIUS,
  SET_CENTER ,
  LOGIN_USER,
  LOGOUT_USER,
  SIGNUP_USER,
  GET_PREFERENCES,
  ADD_BLACKLIST,
  ADD_FAVOURITES,
  REMOVE_BLACKLIST,
  REMOVE_FAVOURITES } from '../actions/index';
import { LOGIN, SIGNUP } from '../../ui/shared_components/navbar/navbar';
import { UserInfo } from '../../../lib/userInfoCollection';

const initialMapState = {
  radius: 1000,
  initialCenter: {
    lat: 49.263749,
    lng: -123.247480
  }
}

const initialModalState = {
  isModalShown: false,
  modalKind: LOGIN
}

const initialUserState = {
  isSignedIn: false,
  blacklist: [],
  favourites: [],
  fullName: "",
  email: "",
  userId: ""
}

function modalReducer(state = initialModalState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return { ...state,
        isModalShown: true,
        modalKind: action.kind
      };
    case HIDE_MODAL:
      return { ...state, isModalShown: false };
    default:
      return state;
  }
}
function userReducer(state = initialUserState, action) {
  switch (action.type) {
    case LOGIN_USER:
      let userQuery = UserInfo.find({email: action.email, password: action.password}).fetch();
      let userInfo = userQuery[0];
      if(userInfo){
        return { ...state,
          userId: userInfo._id,
          email: action.email,
          isSignedIn: true,
          fullName: `${userInfo.firstName} ${userInfo.lastName}`,
          blacklist: userInfo.preferences.blacklist,
          favourites: userInfo.preferences.favourites
        };
      }
      alert("Invalid login info. Try Again.");
      break; //TODO: remove after reducer refactor
    case LOGOUT_USER:
      return { ...state, isSignedIn: false, fullName: "", userId: "", email: "", blacklist: [], favourites: [] };
    case SIGNUP_USER:
      let query = UserInfo.find({email: action.email}).fetch();
      let userExists = query[0];
      if (userExists) {
        alert("An account with this email already exists. Proceed to login to continue.");
        break;
      }
      else {
        UserInfo.insert({
          email: action.email,
          firstName: action.firstName,
          lastName: action.lastName,
          password: action.password,
          preferences: {blacklist: [], favourites: []}
        }, function(err) {
          if (err) {
            console.log(err);
          }
        });
        return {
          ...state,
          email: action.email,
          isSignedIn: true,
          fullName: `${action.firstName} ${action.lastName}`,
          blacklist: [],
          favourites: []
        }
      }
    case ADD_BLACKLIST:
      let matchedUsers = UserInfo.update({_id: state.userId}, { $push:{ "preferences.blacklist": action.blacklist } })
      if (matchedUsers === 0) {
        //TODO: create better error handling
        console.log("Error Updating Blacklist for User")
      }
      let updatedInfo = UserInfo.find({_id: state.userId}).fetch();
      let info = updatedInfo[0];
      return { ...state, blacklist: info.preferences.blacklist };
    case REMOVE_BLACKLIST:
      console.log("Reached Reducer");
      let removedBlacklistUsers = UserInfo.update({_id: state.userId}, {$pull:{"preferences.blacklist": action.blacklistToRemove}})
      if (removedBlacklistUsers === 0){
        console.log("Error Removing From Blacklist")
      }
      let updatedUsers = UserInfo.find({_id: state.userId}).fetch();
      let updatedRemoveInfo = updatedUsers[0];
      return { ...state, blacklist: updatedRemoveInfo.preferences.blacklist };
    case ADD_FAVOURITES:
      matchedUsers = UserInfo.update({_id: state.userId}, { $push:{ "preferences.favourites": action.favourite } })
      if (matchedUsers === 0) {
        //TODO: create better error handling
        console.log("Error Updating Favourites for User")
      }
      updatedInfo = UserInfo.find({userId:state.userId}).fetch();
      info = updatedInfo[0];
      return { ...state, favourites: info.preferences.favourites };
    case REMOVE_FAVOURITES:
      matchedUsers = UserInfo.update({_id: state.userId}, {$pull:{"preferences.favourites": action.favouriteToRemove}})
      if (matchedUser === 0){
        console.log("Error Removing From Favourites")
      }
      updatedInfo = UserInfo.find({_id: state.userId}).fetch();
      info = updatedInfo[0];
      return { ...state, favourites: info.preferences.favourites };
    default:
      return state;
  }
}

function mapReducer(state = initialMapState, action) {
  switch (action.type) {
    case SET_RADIUS:
      return { ...state, radius: action.radius };
    case SET_CENTER:
      return { ...state, initialCenter: action.coords };
    default:
      return state;
  }
}

export default combineReducers({
  modal: modalReducer,
  user: userReducer,
  map: mapReducer,
});
