//ovo radimo jer kad imamo token slali bi ga sa svakim req umesto da izaberemo sa kojim req da ga saljemo
import api from './api';

//function that takes in a token if it is there it is gonna add it to the header if its not it will del it from headers
// store our JWT in LS and set axios headers if we do have a token

const setAuthToken = (token) => {
  //token koji pasujemo je iz lokal storidza, znaci funkcija proverava da li je iz lokal storidza

  if (token) {
    //ako jeste setujemo global header
    api.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('token', token);
  } else {
    //ako nije deletujemo ga iz global headersa
    delete api.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
  }
};

export default setAuthToken;
