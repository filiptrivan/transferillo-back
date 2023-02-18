import axios from "axios";
import { setAlert } from "./alert";

import { GET_PROFILE, PROFILE_ERROR } from "./types";

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

//Create or update (submit) profile (changes)

//ovo sa history (object koji ima metodu push koja ce nas redirektovati) - redirektovanje nakon sabmitovanja forme na client side route
//ovo sa edit, to ce nam reci da li se pravi novi profil ili se apdejtuje postojeci
export const createProfile =
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
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
      //ako je editovan onda se prikazuje pr up ,drugo pr cr
      dispatch(setAlert(edit ? "Profile Updated" : "Profile Created"));
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
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
