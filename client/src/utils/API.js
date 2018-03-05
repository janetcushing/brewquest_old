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
  // search: function(query) {
  //   console.log("im in search on the client side");
  //   console.log(BASEURL + APIKEY + FORMAT + POSTAL + query);
  //   return axios.fetch(BASEURL + APIKEY + FORMAT + POSTAL + query);
  // },
  getPlaces: function(query) {
    console.log("query: " + query);
   return axios.get("/api/findbrewery/" + query)
  },
  // Saves a brewery to the database
  saveBrewery: function(breweryData) {
    console.log("im in saveBrewery on the client side");
    return axios.post("/api/savebrewery/" + breweryData.brewery_name, breweryData);
  }
};

