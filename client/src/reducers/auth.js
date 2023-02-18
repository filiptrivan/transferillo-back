import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../actions/types";

//ovo radimo da ne bi radili u prvom parametru unutar funkcije vec samo pasujemo initialState
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  //we wanna make sure that when user registered that loading is done (we made a req to back and got resp)
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    //ovde ce biti sve sem passworda jer smo u bekendu stavili -password
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      //puting token in lokal storidz
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    //vise stvari ce da radi ovo isto,logaut fail, login fail.., brise auth state i token sa lokal storidza
    //ustvari ne zelimo da ikada imamo token u lokal storidzu koji nije validan
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
