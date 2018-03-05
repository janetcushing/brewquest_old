//=================================================
// dependencies
//=================================================
const Express = require("express");
const request = require("request");
const rp = require("request-promise");
const router = Express.Router();
const path = require("path");
const NodeGeocoder = require('node-geocoder');

const Breweries = require("../models/breweries.js");
// const breweryController  = require("./breweryController");
//=================================================
// global variables
//=================================================
const BASEURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
const DETAILURL = "https://maps.googleapis.com/maps/api/place/details/json?";

const APIKEY1 = "key=AIzaSyDYtDI3eM0ZwVpsw9o4jHcq0NYijbQSwv4";
const APIKEY4 = "key=AIzaSyAl8-KwRAZXg-L9F_Quj7tU_z940kny4Z4";
const APIKEY2 = "key=AIzaSyD3M_Gp0DQ5LWxbr1ur4GMKvSDLpfnR_ro";
const APIKEY3 = "key=AIzaSyCBumUHvERt5G6PSGrvs9MQHRbbHdS7BlQ";
const APIKEY = "key=AIzaSyAD77b8Gz1k-yyWRd6ex7lyHuBhfnNAEoU";
const RANKBY = "&rankby=distance"
const KEYWORD = "&keyword=brewery"
const FORMAT = "&format=json";
const LOCATION = "&location="

const OPTIONS = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: 'AIzaSyCBumUHvERt5G6PSGrvs9MQHRbbHdS7BlQ',
  formatter: null
};
const GEOCODER = NodeGeocoder(OPTIONS);
const breweryDetails = [];

//---------------------------------------------------------- 
// call the google places api and kick off the function
// that calls the google places detail api
//----------------------------------------------------------
const getPlacesApiData = (locn, res) => {
  console.log("Im in getApiData");
  console.log("url: " + BASEURL + APIKEY + LOCATION + locn + RANKBY + KEYWORD);
  rp(BASEURL + APIKEY + LOCATION + locn + RANKBY + KEYWORD)
    .then(response => JSON.parse(response))
    .then(body => {
      console.log(`came back successfully`);
      // console.log(body);
      // console.log(response.next_page_token);
      // console.log(body.results[0]);
      body.results.forEach(function (element, i) {
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
          "buttonClicked": false,
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
      // //third step call the google places detail api
      getPlacesDetailApiData(breweryDetails, res);
      console.log("back from getPlacesDetailApiData");
      // console.log("send the breweryDetails here");

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
const getPlacesDetailApiData = (breweryDetails, res) => {
  console.log("Im in getPlacesDetailApiData");
  for (let ii = 0; ii < breweryDetails.length; ii++) {
    let place = "&place_id=" + breweryDetails[ii].place_id;
    console.log(DETAILURL + APIKEY + place);
    rp(DETAILURL + APIKEY + place)
      .then(detailResponse => JSON.parse(detailResponse))
      .then(detailBody => {
        console.log(`came back from detail API successfully`);
        console.log(detailBody.status);
        breweryDetails[ii].full_address = detailBody.result.formatted_address;
        breweryDetails[ii].phone = detailBody.result.formatted_phone_number;
        // breweryDetails[ii].price_level = detailResponse.data.result.price_level;
        breweryDetails[ii].num_reviews = detailBody.result.reviews.length;
        breweryDetails[ii].website = detailBody.result.website;
        console.log("1");
        // console.log(breweryDetails[ii]);
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




module.exports = {

  //----------------------------------------------------------
  // get brewery info from google places api.  This function
  // kicks off 3 steps.  step 1, translate the search location
  // into latitude and longitude.  step2, call the google places
  // api.  step 3, call the google places detail api
  //----------------------------------------------------------
  getBreweryData: (req, res) => {
    console.log("Im in getBreweryData");
    //first step, translate the search location to longitude and latitude
    loc = req.params.location;
    GEOCODER.geocode(loc)
      .then(function (locResponse) {
        console.log(locResponse);
        let locn = `${locResponse[0].latitude},${locResponse[0].longitude}`;
        //second step, call the google places api
        getPlacesApiData(locn, res);
      }).catch(function (err) {
        console.log(err);
        res.send("location error from geocoder.geocode");
      });
  },



  // insertNewBreweryIntoDatabase: (req, res) => {
  //   console.log("Im in insertNewBreweryIntoDatabase");
  //   console.log(req.body);
  //   let currentBrewery = {
  //     brewery_id: req.body.brewery_id,
  //     brewery_name: req.body.brewery_name,
  //     full_address: req.body.full_address,
  //     icon: req.body.icon,
  //     latitude: req.body.latitude,
  //     longitude: req.body.longitude,
  //     num_reviews: req.body.num_reviews,
  //     phone: req.body.phone,
  //     place_id: req.body.place_id,
  //     price_level: req.body.price_level,
  //     rating: req.body.rating,
  //     website: req.body.website
  //   };
  //   Breweries.create(currentBrewery, function (err, data) {
  //     if (err) {
  //       console.log(`There was a DB error from insertNewBreweryIntoDatabase: ${err} `);
  //       res.status(500).end();
  //     } else {
  //       res.send("success");
  //     }
  //   });
  // }
}