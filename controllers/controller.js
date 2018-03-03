//=================================================
// dependencies
//=================================================
const Express = require("express");
const mongojs = require("mongojs");
const router = Express.Router();
const path = require("path");
const axios = require("axios");
const NodeGeocoder = require('node-geocoder');
const options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: 'AIzaSyA7t69YFqsUbFeIvgtZxcCSHMoZxO0ZYDs',
  formatter: null
};
const geocoder = NodeGeocoder(options);
const Breweries = require("../models/breweries.js");
// const breweryController  = require("./breweryController");
//=================================================
// global variables
//=================================================
const BASEURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
const APIKEY2 = "key=AIzaSyA7t69YFqsUbFeIvgtZxcCSHMoZxO0ZYDs";
const APIKEY = "key=AIzaSyD3M_Gp0DQ5LWxbr1ur4GMKvSDLpfnR_ro";
const RANKBY = "&rankby=distance"
const KEYWORD = "&keyword=brewery"
const FORMAT = "&format=json";
const LOCATION = "&location="
const DETAILURL = "https://maps.googleapis.com/maps/api/place/details/json?";
var breweryDetails = [];

//=================================================
// Functions
//=================================================

//----------------------------------------------------------
// get brewery info from google places api.  This function
// kicks off 3 steps.  step 1, translate the search location
// into latitude and longitude.  step2, call the google places
// api.  step 3, call the google places detail api
//----------------------------------------------------------
getBreweryData = (req, res) => {
  console.log("Im in getBreweryData");
  //first step, translate the search location to longitude and latitude
  loc = req.params.location;
  geocoder.geocode(loc)
    .then(function (locResponse) {
      let locn = `${locResponse[0].latitude},${locResponse[0].longitude}`;
      console.log("url: " + BASEURL + APIKEY + LOCATION + locn + RANKBY + KEYWORD);
      //second step, call the google places api
      getPlacesApiData(locn, res);
    }).catch(function (err) {
      console.log(err);
      res.send("location error");
    });
}

//---------------------------------------------------------- 
// call the google places api and kick off the function
// that calls the google places detail api
//----------------------------------------------------------
getPlacesApiData = (locn, res) => {
  console.log("Im in getApiData");
  console.log("url: " + BASEURL + APIKEY + LOCATION + locn + RANKBY + KEYWORD);
  axios
    .get(BASEURL + APIKEY + LOCATION + locn + RANKBY + KEYWORD)
    .then(response => {
      console.log(`came back successfully`);
      console.log(response.status);
      response.data.results.forEach(function (element, i) {
        let details = {
          "details_key": i,
          "brewery_id": element.id,
          "icon": element.icon,
          "lat": element.geometry.location.lat,
          "lng": element.geometry.location.lng,
          "name": element.name,
          "place_id": element.place_id,
          "rating": element.rating,
          "vicinity": element.vicinity,
          //these will be populated from the detail api
          "full_address": "full_address",
          "phone": "phone",
          "num_reviews": "num_reviews",
          "website": "website"
        } //end of details json object
        breweryDetails.push(details);
        console.log(breweryDetails);
      });
      //third step call the google places detail api
      getPlacesDetailApiData(breweryDetails, res);
      console.log("back from getPlacesDetailApiData");
      console.log("send the breweryDetails here");

    })
    .catch(error => {
      console.log("Error returned from getBreweryData");
      console.log(error);
    });
}

//---------------------------------------------------------- 
// call the google places detail api and send the
// brewery data back to the client side search brewery page
//----------------------------------------------------------
getPlacesDetailApiData = (breweryDetails, res) => {
  console.log("Im in getPlacesDetailApiData");
  for (let ii = 0; ii < breweryDetails.length; ii++) {
    let place = "&place_id=" + breweryDetails[ii].place_id;
    axios
      .get(DETAILURL + APIKEY + place)
      .then(detailResponse => {
        console.log(`came back from detail API successfully`);
        console.log(detailResponse.status);
        breweryDetails[ii].full_address = detailResponse.data.result.formatted_address;
        breweryDetails[ii].phone = detailResponse.data.result.formatted_phone_number;
        breweryDetails[ii].num_reviews = detailResponse.data.result.reviews.length;
        breweryDetails[ii].website = detailResponse.data.result.website;
        console.log("1");
        if (ii == breweryDetails.length - 1) {
          res.send({
            breweryDetails
          });
        }
      }).catch(error => {
        console.log("Error returned from getBreweryData");
        console.log(error);
        res.status(500).send("A Server Error Occurred");
      });
  } // end of for loop
} // end of getPlacesDetailApiData



insertNewBreweryIntoDatabase = (req, res) => {
  console.log("Im in insertNewBreweryIntoDatabase");
  console.log(req.body);
  let currentBrewery = {
    name: req.body.name,
    icon: req.body.icon,
    rating: req.body.rating,
    full_address: req.body.full_address,
    phone: req.body.phone,
    num_reviews: req.body.num_reviews,
    website: req.body.website,
    brewery_id: req.body.brewery_id,
    lat: req.body.lat,
    lng: req.body.lng,
    place_id: req.body.place_id 
  };
  Breweries.create(currentBrewery, function (err, data) {
    if (err) {
      console.log(`There was a DB error from insertNewBreweryIntoDatabase: ${err} `);
      res.status(500).end();
    } else {
      res.send("success");
    }
  });
}

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

// ----------------------------------------------
// add a brewery to  the database
// ----------------------------------------------
router.post("/api/brewery/:name", function (req, res) {
  console.log("im on the server side about to insert the brewery data into the db");
  insertNewBreweryIntoDatabase(req, res);
});

//----------------------------------------------
// add an article to  the database
//----------------------------------------------
// router.delete("/api/article/:id", function (req, res) {
//   // remove(req, res);
//   removeSavedArticle(req, res);
// });

// If no API routes are hit, send the React app
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

//--------------------------------------
// Export routes for server.js to use.
//--------------------------------------
module.exports = router;