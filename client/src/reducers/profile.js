import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from "../actions/types";

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

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    default:
      return state;
  }
}
