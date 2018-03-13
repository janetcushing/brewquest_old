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
    console.log(`im in getApiPlaces: ${query}`)
    console.log(`/api/apiplaces/${query}`)
    return axios.get("/api/apiplaces/" + query)
  },
  // Saves a user to the database
  saveUser: function (userData) {
    console.log("im in saveUser on the client side");
    console.log(`userData ${JSON.stringify(userData)}`);
    return axios.post("/api/user/", userData);
  },
  // Looks for a user to the database
  findUser: function (aud) {
    console.log("im in findUser on the client side");
    console.log(`userSub ${aud}`);
    console.log("/api/user/" + aud);
    return axios.get("/api/user/" + aud);
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

  getSavedNotes: function (breweryId) {
    return axios.get("/api/savednotes", {
      params: {
        id: breweryId
      }
    });
  },

  saveReview: function (savedReviewData) {
    // return axios.post("/api/savednotes", savedNoteData);
  },

  // deleteSavedReview: function (noteId) {
  //   return axios.delete("/api/savednotes/", {
  //     params: {
  //       id: noteId
  //     }
  //   });
  // },

  getSavedReviews: function (breweryId) {
    // return axios.get("/api/savednotes", {
    //   params: {
    //     id: breweryId
    //   }
    // });
  }
};