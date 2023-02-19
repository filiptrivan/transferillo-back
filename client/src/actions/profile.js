//In Redux, actions are plain JavaScript objects that describe a change that should occur in the application's state. When an action is dispatched, it triggers a corresponding reducer function that updates the state based on the information contained in the action object.
import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_REPOS,
} from "./types";

//get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    //ovde pravimo request
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  //clearujemo profil zato sto ne zelimo da sam sebi izlazi na listi, mozda i nije to to
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get("api/profile");

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      //filingujemo profil sa pejloadom
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Github repos
//ne moramo mnogo da radimo ovde jer smo u beku vecinu odradili
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`api/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Create or update (submit) profile (changes)

//ovo sa history (object koji ima metodu push koja ce nas redirektovati) - redirektovanje nakon sabmitovanja forme na client side route
//ovo sa edit, to ce nam reci da li se pravi novi profil ili se apdejtuje postojeci
export const createProfile =
  //zbog ovog false smo u EditProfile stavili kao treci parametar true, i ova prva dva su povezana sa tim


    (formData, history, edit = false) =>
    async (dispatch) => {
      try {
        //since we are sending data we need config object
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        //The axios.post function makes an HTTP POST request to the /api/profile endpoint on the server,
        //The response from the server is returned as a Promise, and in this case, the response data is passed to the SUBMIT_PROFILE (ipak ostalo get_profile) action as the payload.
        //formData is data that will be sent to the server in the request body.
        //config: This parameter is an optional object that can be used to configure the request.
        //It could include options such as headers, params, auth, and more.
        const res = await axios.post("/api/profile", formData, config);
        //Dispatching is the process of sending an action to the Redux store.
        //When an action is dispatched, the store will call the appropriate reducer function
        dispatch({
          type: GET_PROFILE,
          payload: res.data,
        });
        //Dispatching is the process of sending an action to the Redux store.
        //ako je editovan onda se prikazuje pr up ,drugo pr cr
        dispatch(
          setAlert(edit ? "Profile Updated" : "Profile Created", "success")
        );
        //ako je edit onda ostaje, ako je pr cr onda zelimo da ga redirektujemo (ne mozemo kao u App.js)
        if (!edit) {
          history.push("/dashboard");
        }
      } catch (err) {
        const errors = err.response.data.errors;
        //ako zaboravimo neko required polje onda ce se ovaj eror pojaviti
        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        //Dispatching is the process of sending an action to the Redux store.
        dispatch({
          type: PROFILE_ERROR,
          payload: {
            msg: err.response.statusText,
            status: err.response.status,
          },
        });
      }
    };

// Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/experience", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/education", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete experience
//id zbog api/profile/experience id
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Education
//id zbog api/profile/education id
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete account & profile
// ne uzima nikakve parametre jer ce znati koji je akaunt od tokena
export const deleteAccount = () => async (dispatch) => {
  //zato sto je tako strasna stvar da se uradi sve cemo wrapovati u if, treba nam konfirmacija
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      await axios.delete("api/profile");

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert("Your account has been permanently deleted"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
