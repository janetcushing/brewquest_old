//=================================================
// dependencies
//=================================================
const Express = require("express");
const mongojs = require("mongojs");
const router = Express.Router();
const axios = require("axios");
const where = require('node-where');

//=================================================
// global variables
//=================================================

//=================================================
// Functions
//=================================================

getBreweryData = (req, res) => {
  console.log("Im in getBreweryData");
  console.log("req.params.location" + req.params.location);
  let loc = req.params.location;
  where.is(loc, function (err, result) {
    if (result) {
      console.log('Lat: ' + result.get('lat'));
      console.log('Lng: ' + result.get('lng'));
      const BASEURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
      const APIKEY = "key=AIzaSyA7t69YFqsUbFeIvgtZxcCSHMoZxO0ZYDs";
      let location = "&location=" + result.get('lat') + "," + result.get('lng');
      console.log(`lLOCATION ${location}`);
      const RANKBY = "&rankby=distance"
      const KEYWORD = "&keyword=brewery"
      console.log("url: " + BASEURL + APIKEY + location + RANKBY + KEYWORD);
      axios
        .get(BASEURL + APIKEY + location + RANKBY + KEYWORD)
        .then(response => {
          console.log(`came back successfully`);
          console.log(response.status);
          console.log(response.statusText);
          const breweryDetails = [];

          response.data.results.forEach(function (element, i) {
            let openStatus = false;
            let photoHtmlAttr = "";
            let photoRef = "";
            let details = {
              "details_key": i,
              "breweryId": element.id,
              "icon": element.icon,
              "lat": element.geometry.location.lat,
              "lng": element.geometry.location.lng,
              "name": element.name,
              // "open_now": openStatus,
              // "photo_html_attributions": photoHtmlAttr,
              // "photo_reference": photoRef,
              "place_id": element.place_id,
              "rating": element.rating,
              "vicinity": element.vicinity,
              //these will be populated from the detail api
              "fullAddress": detailResponse.formatted_address,
              "phone": detailResponse.formatted_phone_number,
              "numReviews": detailResponse.reviews.length,
              "website": detailResponse.website
            } //end of details json object
            console.log("details");
            console.log(details);
            breweryDetails.push(details);
            console.log("breweryDetails.length2");
            console.log(breweryDetails);
          }); //end of forEach loop

          breweryDetails.forEach(function (detailArray, j) {
            const DETAILURL = "https://maps.googleapis.com/maps/api/place/details/json?";
            let place = "&placeid=" + breweryDetails.place_id;
            console.log("about to get the detail api");
            console.log("detail place: " + breweryDetails.name);
            axios
              .get(DETAILURL + APIKEY + place)
              .then(detailResponse => {
                console.log(`came back from detail API successfully`);
                detailsArray.placeId = detailResponse.placeId;
                detailArray.fullAddress = detailResponse.formatted_address;
                detailArray.phone = detailResponse.formatted_phone_number;
                detailArray.numReviews = detailResponse.reviews.length;
                detailArray.website = detailResponse.website;
                console.log(detailArray);
              }).catch(error => {
                console.log("Error returned from getBreweryData");
                console.log(error);
                res.status(500).send("A Server Error Occurred");
              });
            console.log("end of forEach loop2");
          }); //end of forEach loop

        }).catch(function () {
          console.log(err);
          res.send("location error");
        });
      // res.send({
      //   breweryDetails
      // });
    }
    //else of result
    else {
      console.log(err);
      res.send("location error");
    }
  }); // end of  where.is
} //end of getBrewery data



//==============
// ROUTES
//==============

//----------------------------------------------------------
// get brewery info from brewerydb api based on zip code
//----------------------------------------------------------
router.get("/api/places/:location", function (req, res) {
  console.log("im on the server side about to get the brewery data");
  getBreweryData(req, res);
});

//----------------------------------------------
// get saved articles from the database
//----------------------------------------------
// router.get("/api/articles", function (req, res) {
//   console.log("im on the server side about to get the saved articles");
//   // findAll(req, res);
//   getSavedArticles2(req, res);
// });

//----------------------------------------------
// add an article to  the database
//----------------------------------------------
// router.post("/api/article", function (req, res) {
//   // create(req, res);
//   insertNewArticle(req, res);
// });

//----------------------------------------------
// add an article to  the database
//----------------------------------------------
// router.delete("/api/article/:id", function (req, res) {
//   // remove(req, res);
//   removeSavedArticle(req, res);
// });

// If no API routes are hit, send the React app
// router.use(function (req, res) {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

//--------------------------------------
// Export routes for server.js to use.
//--------------------------------------
module.exports = router;