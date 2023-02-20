import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = [];

function alertReducer(state = initialState, action) {
  //da ne bi koristili action(destructuring).
  const { type, payload } = action;
  //switch proverava koji je type actiona, ako je set alert ili remove alert, ako nije nista onda vraca initial state
  switch (type) {
    //ubacujemo alert sa payloadom
    case SET_ALERT:
      //vracamo alert u state (koji je initialy empty array) tj. payload koji je definisan u drugom alert file-u
      return [...state, payload];
    //brisemo sve alertove osim tog koji se poklapa sa payloadom
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}

export default alertReducer;
