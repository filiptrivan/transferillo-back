//ovde dispatchujemo set alert i remove alert, tj. one pozivaju slucaj koji smo stavili u reducer (alert.js)
import { v4 as uuidv4 } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

//zelimo da dispatchujemo vise action tipova ovom funkcijom, za to koristimo dispatch
//i to nam je omoguceno zbog middleware thunk-a
//ovim timeout = 5000 smo omogucili da to ne pisemo dole vec samo da prosledimo te onda i u register pored "danger" mozemo da stavimo , 3000 ako zelimo da promenimo kad nestaje alert
export const setAlert =
  (msg, alertType, timeout = 5000) =>
  (dispatch) => {
    //ovaj id treba da bude random, moze da se radi sa js, ali mi cemo skinuti poseban paket uuid
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, id },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };
