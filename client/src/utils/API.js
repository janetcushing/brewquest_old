import axios from "axios";

export default {
  // Gets all books
  getSavedPlaces: function() {
    return axios.get("/api/savedplaces");
  },
  // Gets the book with the given id
  getSavedPlace: function(id) {
    return axios.get("/api/savedplaces/" + id);
  },
  // Deletes the book with the given id
  deleteSavedPlace: function(id) {
    return axios.delete("/api/savedplaces/" + id);
  },
  // Saves a book to the database
  savePlace: function(savedPlacesData) {
    return axios.post("/api/savedplaces", savedPlacesData);
  },
  search: function(query) {
    console.log("im in search on the client side");
    console.log(BASEURL + APIKEY + FORMAT + POSTAL + query);
    return axios.fetch(BASEURL + APIKEY + FORMAT + POSTAL + query);
  },
  getPlaces: function(query) {
    console.log("query: " + query);
   return axios.get("/api/findbrewery/" + query)
  }
};


const BASEURL = "http://api.brewerydb.com/v2/locations?";
const APIKEY  = "key=32c6dc015d7cf847c9bd1c05f34160ee";
const FORMAT  = "&format=json";
const POSTAL  = "&postalCode="