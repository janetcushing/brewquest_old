import decode from 'jwt-decode';
import auth0 from 'auth0-js';
const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';

const CLIENT_ID = 'hBUrEY7ugr1dCF8SatxQiOnIVVW4c5ia';
const CLIENT_DOMAIN = 'beer-quest.auth0.com';
const REDIRECT = 'http://localhost:3000/callback';
// const REDIRECT = process.env.CALLBACK_URI || 'http://localhost:3000/callback';

const SCOPE = 'openid profile';
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
  // var token = localStorage.getItem(ID_TOKEN_KEY);
  // var accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  // var accToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  // console.log(token);
  // console.log(token.name);
  // console.log(token.given_name);
  // console.log(token.family_name);
  // let userName = decodeToken(accToken);
  // let userName = getTokenExpirationDate(token);
  // decodeToken(token);
  // console.log(`*************************`);
  // console.log(userName);
  // console.log(`*************************`);

  // setTimeout(function () {
  //   console.log(token)
  // }, 10000);

  // auth.client.userInfo(accessToken, function (err, user) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(`*************************`);
  //     console.log(user);
  //     console.log(`*************************`);
  //   }
  // });

}

export function logout() {
  console.log("im in logout()");
  clearIdToken();
  clearAccessToken();
  // browserHistory.push('/');
  console.log("is logged in " + isLoggedIn());
  window.location.href = window.location.origin;
}

export function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({
      pathname: '/'
    });
  }
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

export function clearAccessToken() {
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
  return accessToken;
}

// Get and store id_token in local storage
export function setIdToken() {
  console.log("im in setIdToken");
  let idToken = getParameterByName('id_token');
  console.log(`idToken: ${idToken}`);
  localStorage.setItem(ID_TOKEN_KEY, idToken);
  return idToken;
}

export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

export function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) {
    return null;
}

const date = new Date(0);
date.setUTCSeconds(token.exp);

return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}

export function decodeToken(token) {
  var decoded = decode(token);
  console.log((decoded));
  return decoded;
}

// function getUserName(encodedToken) {
//   const token = decode(encodedToken);
//   let userName = token.name;
//   return userName;
// }