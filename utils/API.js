import axios from "axios";

const BASEURL = "http://api.brewerydb.com/v2/locations?";
const APIKEY  = "key=32c6dc015d7cf847c9bd1c05f34160ee";
const FORMAT  = "&format=json";
const POSTAL  = "&postalCode="

export default {
  search: function(query) {
    console.log("im in search on the client side");
    console.log(BASEURL + APIKEY + FORMAT + POSTAL + query);
    return axios.get(BASEURL + APIKEY + FORMAT + POSTAL + query);
  }
};



