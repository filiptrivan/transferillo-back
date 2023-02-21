//In Redux, actions are plain JavaScript objects that describe a change that should occur in the application's state. When an action is dispatched, it triggers a corresponding reducer function that updates the state based on the information contained in the action object.
import api from '../utils/api';
import { setAlert } from "./alert";

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
} from "./types";

//get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await api.get('/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await api.get('/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await api.get(`/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Create or update (submit) profile (changes)

//ovo sa history (object koji ima metodu push koja ce nas redirektovati) - redirektovanje nakon sabmitovanja forme na client side route
//ovo sa edit, to ce nam reci da li se pravi novi profil ili se apdejtuje postojeci
export const createProfile = 
  //zbog ovog false smo u EditProfile stavili kao treci parametar true, i ova prva dva su povezana sa tim
  (formData, edit = false) =>
  async (dispatch) => {
    try {
        //since we are sending data we need config object
        // const config = {
        //   headers: {
        //     'Content-Type': 'application/json'
        //   }
        // };
    
        //The axios.post function makes an HTTP POST request to the /api/profile endpoint on the server,
        //The response from the server is returned as a Promise, and in this case, the response data is passed to the SUBMIT_PROFILE (ipak ostalo get_profile) action as the payload.
        //formData is data that will be sent to the server in the request body.
        //config: This parameter is an optional object that can be used to configure the request.
        //It could include options such as headers, params, auth, and more.
        const res = await api.post("/profile", formData);
        //Dispatching is the process of sending an action to the Redux store.
        //When an action is dispatched, the store will call the appropriate reducer function
        dispatch({
          type: GET_PROFILE,
          payload: res.data,
        });
        //Dispatching is the process of sending an action to the Redux store.
        //ako je editovan onda se prikazuje pr up ,drugo pr cr
        dispatch(
          setAlert(edit ? "Profil je uspešno ažuriran" : "Profil je uspešno kreiran", "success")
        );
      } catch (err) {
        const errors = err.response.data.errors;
  
        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
  
        dispatch({
          type: PROFILE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
      }
    };

// Add Experience
export const addExperience = (formData) => async (dispatch) => {
  try {
    const res = await api.put('/profile/experience', formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Iskustvo je uspešno dodato', 'success'));
    return res.data;
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Education
export const addEducation = (formData) => async (dispatch) => {
  try {
    const res = await api.put('/profile/education', formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education Added', 'success'));
    return res.data;
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete experience
//id zbog api/profile/experience id
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Iskustvo Obrisano', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Education
//id zbog api/profile/education id
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete account & profile
// ne uzima nikakve parametre jer ce znati koji je akaunt od tokena
export const deleteAccount = () => async (dispatch) => {
  //zato sto je tako strasna stvar da se uradi sve cemo wrapovati u if, treba nam konfirmacija
  if (window.confirm('Da li ste sigurni? Ovo se NE može poništiti!')) {
    try {
      await api.delete('/profile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Vaš nalog je trajno izbrisan'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
