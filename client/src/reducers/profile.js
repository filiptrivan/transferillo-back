//reducer function will use the information in the action to determine how to update the state.
import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  NO_REPOS
} from '../actions/types';

const initialState = {
  //null because no user is logged in at the start.
  profile: null,
  //This property represents an array of profiles of all users in the application.
  // It is initially set to an empty array because no users have been loaded yet.
  profiles: [],
  //This property represents an array of repositories belonging to the currently logged in user.
  // It is initially set to an empty array because the user may not have any repositories, or they haven't been loaded yet.
  repos: [],
  //this property is a boolean value that indicates whether the application is currently loading data from the server or not.
  //It is initially set to true because the application starts in a loading state.
  loading: true,
  //This property is an object that represents any errors that occur during data fetching or processing.
  //It is initially set to an empty object because no errors have occurred yet.
  error: {},
};

function profileReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: []
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false
      };
    case NO_REPOS:
      return {
        ...state,
        repos: []
      };
    default:
      return state;
  }
}

export default profileReducer;