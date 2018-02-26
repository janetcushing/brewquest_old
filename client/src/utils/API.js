// import axios from "axios";

// export default {
  // Gets all books
  // getPlaces: function(query) {
  //   console.log(" in API.getPlaces: /api/places/:" + query)
  //   return axios.get("/api/places/:" + query);
  // },
  // Gets the book with the given id
  // getBook: function(id) {
  //   return axios.get("/api/books/" + id);
  // },
  // // Deletes the book with the given id
  // deleteBook: function(id) {
  //   return axios.delete("/api/books/" + id);
  // },
  // // Saves a book to the database
  // saveBook: function(bookData) {
  //   return axios.post("/api/books", bookData);
  // }
// };

import axios from "axios";

const BASEURL = "http://api.brewerydb.com/v2/locations?";
const APIKEY  = "key=32c6dc015d7cf847c9bd1c05f34160ee";
const FORMAT  = "&format=json";
const POSTAL  = "&postalCode="

export default {
  search: function(query) {
    console.log("im in search on the client side");
    console.log(BASEURL + APIKEY + FORMAT + POSTAL + query);
    return axios.fetch(BASEURL + APIKEY + FORMAT + POSTAL + query);
  }
};