import decode from 'jwt-decode';
import auth0 from 'auth0-js';
const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';

const CLIENT_ID = 'hBUrEY7ugr1dCF8SatxQiOnIVVW4c5ia';
const CLIENT_DOMAIN = 'beer-quest.auth0.com';
// const REDIRECT = 'http://localhost:3000/callback';
const REDIRECT = process.env.CALLBACK_URI || 'http://localhost:3000/callback';

const SCOPE = 'openid';
const AUDIENCE = 'https://beer-quest.auth0.com/userinfo';

var auth = new auth0.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN
});

export function login() {
    auth.authorize({
      responseType: 'token id_token',
      redirectUri: REDIRECT,
      audience: AUDIENCE,
      scope: SCOPE
    });
    console.log("is logged in " + isLoggedIn());
    var token = localStorage.getItem(ID_TOKEN_KEY);
    console.log("token: " + token);
  }
  
  export function logout() {
    console.log("im in logout()");
    clearIdToken();
    clearAccessToken();
    // browserHistory.push('/');
    console.log("is logged in " + isLoggedIn());
  }
  
  export function requireAuth(nextState, replace) {
    if (!isLoggedIn()) {
      replace({pathname: '/'});
    }
  }
  
  export function getIdToken() {
    return localStorage.getItem(ID_TOKEN_KEY);
  }
  
  export function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }
  
  function clearIdToken() {
    localStorage.removeItem(ID_TOKEN_KEY);
  }
  
  function clearAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
  
  // Helper function that will allow us to extract the access_token and id_token
  function getParameterByName(name) {
    let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }
  
  // Get and store access_token in local storage
  export function setAccessToken() {
      console.log("im in setAccessToken");
    let accessToken = getParameterByName('access_token');
    console.log(`accessToken: ${accessToken}`);
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }

  // Get and store id_token in local storage
export function setIdToken() {
    console.log("im in setIdToken");
    let idToken = getParameterByName('id_token');
    console.log(`idToken: ${idToken}`);
    localStorage.setItem(ID_TOKEN_KEY, idToken);
  }
  
  export function isLoggedIn() {
    const idToken = getIdToken();
    return !!idToken && !isTokenExpired(idToken);
  }
  
  function getTokenExpirationDate(encodedToken) {
    const token = decode(encodedToken);
    if (!token.exp) { return null; }
  
    const date = new Date(0);
    date.setUTCSeconds(token.exp);
  
    return date;
  }

  function isTokenExpired(token) {
    const expirationDate = getTokenExpirationDate(token);
    return expirationDate < new Date();
  }