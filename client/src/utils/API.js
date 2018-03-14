import axios from "axios";

export default {
  // Gets all places
  getSavedPlaces: function () {
    return axios.get("/api/savedplaces");
  },
  // Gets the brewery with the given id
  getSavedPlace: function (id) {
    console.log("getting to api for place detail")
    console.log("get saved place in API.js ID: " + id)
    return axios.get("/api/savedplaces/" + id);
  },
  // Deletes the place with the given id
  deleteSavedPlaceByBreweryId: function (breweryId) {
    return axios.delete("/api/savedplace/" + breweryId);
  },
  // Saves a place to the database
  savePlace: function (savedPlacesData) {
    console.log("im in savePlace on the client side");
    return axios.post("/api/savedplaces", savedPlacesData);
  },
  deleteSavedPlace: function (id) {
    return axios.delete("/api/savedplaces/" + id);
  },

  beenToPlace: function (id) {
    console.log("got to beentoplace in api.js")
    return axios.put("/api/savedplaces/" + id, {
      been_there: true
    })
  },

  haveNotBeenToPlace: function (id) {
    console.log("got to beentoplace in api.js")
    return axios.put("/api/savedplaces/" + id, {
      been_there: false
    })

  },
  // Saves a book to the database
  // savePlace: function(savedPlacesData) {
  //   return axios.post("/api/savedplaces", savedPlacesData.been_there);
  // },


  getApiPlaces: function (query) {
    console.log("in getAPIPlaces on the client side")
    return axios.get("/api/apiplaces/" + query)
  },
  // Saves a user to the database
  saveUser: function (userData) {
    return axios.post("/api/user/", userData);
  },
  // Looks for a user to the database
  findUser: function (aud) {
    return axios.get("/api/user/" + aud);
  },
    // Looks for a user to the database
    updateUser: function (aud, loggedIn) {
      console.log("in client API updateUSER");
      return axios.put("/api/user/" + aud, loggedIn);
    },

  saveNote: function (savedNoteData) {
    return axios.post("/api/savednotes", savedNoteData);
  },

  deleteSavedNote: function (noteId) {
    return axios.delete("/api/savednotes/", {
      params: {
        id: noteId
      }
    });
  },

  getSavedNotes: function (noteData) {
    return axios.get("/api/savednotes", {
      params: {
        id: noteData.brewery_id,
        aud: noteData.aud
      }
    });
  },

  saveReview: function (savedReviewData) {
    return axios.post("/api/savedreviews", savedReviewData);
  },

  getSavedReviews: function (reviewData) {
    console.log(reviewData)
    return axios.get("/api/savedreviews", {
      params: {
        id: reviewData.brewery_id
      }
    });
  }
};