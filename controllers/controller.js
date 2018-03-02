//=================================================
// dependencies
//=================================================
const Express = require("express");
const mongojs = require("mongojs");
const router = Express.Router();
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
const DETAILURL = "https://maps.googleapis.com/maps/api/place/details/json?";
const APIKEY = "key=AIzaSyD3M_Gp0DQ5LWxbr1ur4GMKvSDLpfnR_ro";
const APIKEY2 = "key=AIzaSyA7t69YFqsUbFeIvgtZxcCSHMoZxO0ZYDs";
const APIKEY1 = "key=AIzaSyAD77b8Gz1k-yyWRd6ex7lyHuBhfnNAEoU";
const RANKBY = "&rankby=distance"
const KEYWORD = "&keyword=brewery"
const FORMAT = "&format=json";
const LOCATION = "&location="

const breweryDetails = [];

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
          "brewery_name": element.name,
          "icon": element.icon,
          "latitude": element.geometry.location.lat,
          "longitude": element.geometry.location.lng,
          "place_id": element.place_id,
          "rating": element.rating,
          "vicinity": element.vicinity,
          //these will be populated from the detail api
          "full_address": "full_address",
          "phone": "phone",
          "price_level": "price_level",
          "num_reviews": "num_reviews",
          "website": "website"
        } //end of details json object
        breweryDetails.push(details);
        // console.log(breweryDetails);
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
// status codes returned:
// OK indicates that no errors occurred; the place was successfully detected and at least one result was returned.
// UNKNOWN_ERROR indicates a server-side error; trying again may be successful.
// ZERO_RESULTS indicates that the referenced location (placeid) was valid but no longer refers to a valid result. This may occur if the establishment is no longer in business.
// OVER_QUERY_LIMIT indicates that you are over your quota.
// REQUEST_DENIED indicates that your request was denied, generally because of lack of an invalid key parameter.
// INVALID_REQUEST generally indicates that the query (placeid) is missing.
// NOT_FOUND indicates that the referenced location (placeid) was not found in the Places database.
//----------------------------------------------------------
getPlacesDetailApiData = (breweryDetails, res) => {
  console.log("Im in getPlacesDetailApiData");
  for (let ii = 0; ii < breweryDetails.length; ii++) {
    let place = "&place_id=" + breweryDetails[ii].place_id;
    console.log(DETAILURL + APIKEY + place);
    axios
      .get(DETAILURL + APIKEY + place)
      .then(detailResponse => {
        console.log(`came back from detail API successfully`);
        console.log(detailResponse.status);
        breweryDetails[ii].full_address = detailResponse.data.result.formatted_address;
        breweryDetails[ii].phone = detailResponse.data.result.formatted_phone_number;
        // breweryDetails[ii].price_level = detailResponse.data.result.price_level;
        breweryDetails[ii].num_reviews = detailResponse.data.result.reviews.length;
        breweryDetails[ii].website = detailResponse.data.result.website;
        console.log("1");
        console.log(breweryDetails[ii]);
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
    brewery_id: req.body.brewery_id,
    brewery_name: req.body.brewery_name,
    full_address: req.body.full_address,
    icon: req.body.icon,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    num_reviews: req.body.num_reviews,
    phone: req.body.phone,
    place_id: req.body.place_id,
    price_level: req.body.price_level,
    rating: req.body.rating,
    website: req.body.website
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