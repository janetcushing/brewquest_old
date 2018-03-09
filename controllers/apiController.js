//=================================================
// dependencies
//=================================================
const Express = require("express");
const request = require("request");
const rp = require("request-promise");
const router = Express.Router();
const path = require("path");
const NodeGeocoder = require('node-geocoder');
const db = require("../models");
const mongojs = require("mongojs");
const Breweries = require("../models/breweries.js");
const mergeByKey = require("array-merge-by-key");

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

var holdplacesBody = [];
const holdDetailBody = [];
var holdDbBody = [];

module.exports = {

  //----------------------------------------------------------
  // get brewery info from google places api.  This function
  // kicks off 3 steps.  step 1, translate the search location
  // into latitude and longitude.  step2, call the google places
  // api.  step 3, call the google places detail api
  //----------------------------------------------------------
  getApiData: (req, res) => {
    console.log("Im in getApiData");
    //first step, translate the search location to longitude and latitude
    loc = req.params.location;
    GEOCODER.geocode(loc)
      .then(function (locResponse) {
        let locn = `${locResponse[0].latitude},${locResponse[0].longitude}`;
        //second step, call the google places api
        getPlacesApiData(locn, res);
        // .then(done => {
        // setTimeout(function () {
          sendPlaceDetailstoClient(holdplacesBody, holdDetailBody, holdDbBody, res);
        // }, 3000);

        // })
      }).catch(function (err) {
        console.log(err);
        res.send("location error from geocoder.geocode");
      });
  },
}


//---------------------------------------------------------- 
// call the google places api and kick off the function
// that calls the google places detail api
//----------------------------------------------------------
const getPlacesApiData = (locn, res) => {
  console.log("Im in getPlacesApiData");
  console.log("url: " + BASEURL + APIKEY + LOCATION + locn + RANKBY + KEYWORD);
  rp(BASEURL + APIKEY + LOCATION + locn + RANKBY + KEYWORD)
    .then(response => JSON.parse(response))
    .then(body => {
      if (body.status != "OK") {
        console.log(`*********************************`);
        console.log(`query status ${body.status}`);
        console.log(`*********************************`);
      }
      // call the details api and make a call to the database to get more data
      getSavedPlacesIndicator(body, res);
      getPlacesDetailApiData(body, res);
      holdplacesBody = body.results;
    })
    .catch(error => {
      console.log("Error returned from getPlacesApiData");
      console.log(error);
      res.status(500).send("A Server Error Occurred");
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
const getPlacesDetailApiData = (body) => {
  console.log("Im in getPlacesDetailApiData");
  for (let ii = 0; ii < body.results.length; ii++) {
    let place = "&place_id=" + body.results[ii].place_id;
    console.log(DETAILURL + APIKEY + place);
    rp(DETAILURL + APIKEY + place)
      .then(detailResponse => JSON.parse(detailResponse))
      .then(detailBody => {
        if (detailBody.status != "OK") {
          console.log(`*********************************`);
          console.log(`query status ${body.status}`);
          console.log(`*********************************`);
        }
        holdDetailBody.push(detailBody.result);
      }).catch(error => {
        console.log("Error returned from getPlacesDetailApiData");
        console.log(error);
        res.status(500).send("A Server Error Occurred");
      });
  } // end of for loop
} // end of getPlacesDetailApiData



const getSavedPlacesIndicator = (body) => {
  console.log("in get savedplacesindicator ")
  for (let iii = 0; iii < body.results.length; iii++) {
    db.Breweries
      .find().where('place_id').equals(body.results[iii].place_id)
      .then(dbModel => {
        if (dbModel[0]) {
          holdDbBody.push({
            "place_id": body.results[iii].place_id,
            "saved": true
          });
        } else {
          holdDbBody.push({
            "place_id": body.results[iii].place_id,
            "saved": false
          });
        }
      }).catch(error => {
        console.log("Error returned from getSavedPlacesIndicator");
        console.log(error);
        res.status(500).send("A Server Error Occurred");
      });
  }
}





const sendPlaceDetailstoClient = (holdplacesBody, holdDetailBody, holdDbBody, res) => {
  let result = mergeByKey("place_id", holdplacesBody, holdDetailBody, holdDbBody);
  let placeDetails = result.map((element, i) => {
    let open_now = false;
    let weekday_text = [];
    if (element.opening_hours) {
      open_now = element.opening_hours.open_now;
      weekday_text = element.opening_hours.weekday_text;
    }
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
      "saved": element.saved,
      "full_address": element.formatted_address,
      "phone": element.formatted_phone_number,
      "price_level": element.price_level,
      "num_reviews": element.reviews.length,
      "website": element.website,
      "open_now": open_now,
      "photos": element.photos,
      "reviews": element.reviews,
      "weekday_text": weekday_text
    }
    return details;
  })
  setTimeout(function () {
    res.send({
      placeDetails
    });
  }, 3000);
}