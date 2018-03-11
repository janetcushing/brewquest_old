import axios from "axios";

export default {
 
  // Saves a brewery to the database
  saveBrewery: function(breweryData) {
    console.log("im in saveBrewery");
    return axios.post("/api/brewery/" + breweryData.brewery_name, breweryData);
  }
};