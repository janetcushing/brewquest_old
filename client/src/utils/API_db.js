import axios from "axios";

export default {
  // Gets all articles
  // getSavedArticles: function() {
  //   console.log("im in getSavedArticles");
  //   console.log("state: ", this.state);
  //   return axios.get("/api/articles");
  // },
  // Deletes the article with the given id
  // deleteSavedArticle: function(id) {
  //   console.log(`im in deleteSavedArticle ${id}`);
  //   return axios.delete("/api/article/" + id);
  // },
  // Saves an article to the database
  saveBrewery: function(breweryData) {
    console.log("im in saveBrewery");
    return axios.post("/api/brewery", breweryData);
  }
};