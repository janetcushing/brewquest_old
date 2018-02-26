const db = require("../models");
const BASEURL = "http://api.brewerydb.com/v2/locations?";
  const APIKEY = "key=32c6dc015d7cf847c9bd1c05f34160ee"
  const FORMAT = "&format=json";

export default {
  getPlaces: function (query) {
    console.log("i am in placesAPICONTROLLER");
    console.log(ASEURL + APIKEY + FORMAT + query);
    return axios.get(BASEURL + APIKEY + FORMAT + query);
  }
  // ,
  // getDogsOfBreed: function (breed) {
  //   return axios.get("https://dog.ceo/api/breed/" + breed + "/images");
  // },
  // getBaseBreedsList: function () {
  //   return axios.get("https://dog.ceo/api/breeds/list");
  // }
};