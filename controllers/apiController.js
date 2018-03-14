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
const APIKEY2 = "key=AIzaSyAl8-KwRAZXg-L9F_Quj7tU_z940kny4Z4";
const APIKEY3 = "key=AIzaSyD3M_Gp0DQ5LWxbr1ur4GMKvSDLpfnR_ro";
const APIKEY = "key=AIzaSyCBumUHvERt5G6PSGrvs9MQHRbbHdS7BlQ";
const APIKEY5 = "key=AIzaSyDNDkZwKnTtNOn9MYrd8RRPI4TTqN48PVg";
const APIKEY6 = "key=AIzaSyDXD-agq64RPzmIcjnxmmbSXip3fAGmJj0";

const RANKBY = "&rankby=distance"
const KEYWORD = "&keyword=brewery"
const FORMAT = "&format=json";
const LOCATION = "&location="

const OPTIONS = {
  provider: 'google',
  httpAdapter: 'https',
  // apiKey: 'AIzaSyBLS6w0pAJbyX6HKRve7eKo2sWMjBOJKSo',
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
    console.log(`loc: ${loc}`);
    GEOCODER.geocode(loc)
      .then(function (locResponse) {
        console.log(locResponse);
        let locn = `${locResponse[0].latitude},${locResponse[0].longitude}`;
        //second step, call the google places api
        getPlacesHeaderData(locn, res)
          .then(function (result) {
            prepareForClient(result)
              .then(function (placeDetails) {
                res.send({
                  placeDetails
                });
              }).catch(function (err) {
                console.log("an error occured when returning prepareForClient promise");
                console.log(err);
                res.status(500).send("A Server Error Occurred");
              });
          }).catch(function (err) {
            console.log("an error occured when returning headerPromise");
            console.log(err);
            res.status(500).send("A Server Error Occurred");
          });
      }).catch(function (err) {
        console.log(err);
        res.send("location error from geocoder.geocode");
      });
  }
}



//---------------------------------------------------------- 
// call the google places api and then kick off the call to the 
// google places detail api and then kick off the call to
// the database to get the saved boolean which tells if the
// place has previously been saved by the current user
//----------------------------------------------------------
const getPlacesHeaderData = (locn, res) => {
  var headerPromise = new Promise(function (resolve, reject) {
    console.log("url: " + BASEURL + APIKEY + LOCATION + locn + RANKBY + KEYWORD);
    rp(BASEURL + APIKEY + LOCATION + locn + RANKBY + KEYWORD)
      .then(response => JSON.parse(response))
      .then(body => {
        if (body.status != "OK") {
          console.log(`*********************************`);
          console.log(`query status ${body.status}`);
          console.log(`*********************************`);
        }
        holdplacesBody = body.results;
        console.log(`holdplacesBody[0].name ${holdplacesBody[0].name}`);
        // call the details api and make a call to the database to get more data
        getPlacesDetailData(body, res)
          .then(detailBody => {
            getPlacesfromDatabase(detailBody, res)
              .then(dbBody => {
                console.log("I am back with all the data");
                console.log(holdplacesBody.length);
                console.log(holdDetailBody.length);
                console.log(holdDbBody.length);
                let result = mergeByKey("place_id", holdplacesBody, holdDetailBody, holdDbBody);
                console.log(`result[0].name ${result[0].name}`);
                console.log(`result[0].saved ${result[0].saved}`);
                resolve(result);
              }).catch(error => {
                console.log("Error returned from dbPromise");
                console.log(error);
                res.status(500).send("A Server Error Occurred");
              });
          }).catch(error => {
            console.log("Error returned from getPlacesDetailData promise");
            console.log(error);
            res.status(500).send("A Server Error Occurred");
          });
      })
      .catch(error => {
        console.log("Error returned from getPlacesHeaderData");
        console.log(error);
        res.status(500).send("A Server Error Occurred");
      });
    setTimeout(function () {
      resolve(holdplacesBody);
    }, 5000);
  });
  return headerPromise;

}



//---------------------------------------------------------- 
// call the google places detail api.  You have to call the 
// detail api once for each of the places returned by the header call
// ======================
// status codes returned:
// ======================
// OK indicates that no errors occurred; the place was successfully detected and at least one result was returned.
// UNKNOWN_ERROR indicates a server-side error; trying again may be successful.
// ZERO_RESULTS indicates that the referenced location (placeid) was valid but no longer refers to a valid result. This may occur if the establishment is no longer in business.
// OVER_QUERY_LIMIT indicates that you are over your quota.
// REQUEST_DENIED indicates that your request was denied, generally because of lack of an invalid key parameter.
// INVALID_REQUEST generally indicates that the query (placeid) is missing.
// NOT_FOUND indicates that the referenced location (placeid) was not found in the Places database.
//----------------------------------------------------------
const getPlacesDetailData = (body) => {
  var detailPromise = new Promise(function (resolve, reject) {
    for (let ii = 0; ii < body.results.length; ii++) {
      let place = "&place_id=" + body.results[ii].place_id;
      console.log(DETAILURL + APIKEY + place);
      rp(DETAILURL + APIKEY + place)
        .then(detailResponse => JSON.parse(detailResponse))
        .then(detailBody => {
          if (detailBody.status != "OK") {
            console.log(`*********************************`);
            console.log(`query status ${detailBody.status}`);
            console.log(`*********************************`);
          }
          holdDetailBody.push(detailBody.result);
          console.log(`holdDetailBody[0].place_id ${holdDetailBody[0].place_id}`);
          if (holdDetailBody.length === (body.results.length)) {
            resolve(holdDetailBody);
          }
        }).catch(error => {
          console.log("Error returned from getPlacesDetailData");
          console.log(error);
          res.status(500).send("A Server Error Occurred");
        });
    }
  }); //end of detailPromise
  return detailPromise;
}



const getPlacesfromDatabase = (detailBody, res) => {
  console.log("im in getPlacesfromDatabase");
  var dbPromise = new Promise(function (resolve, reject) {
    for (let iii = 0; iii < detailBody.length; iii++) {
      db.Breweries
        .find().where('place_id').equals(detailBody[iii].place_id)
        .then(dbModel => {
          if (dbModel[0]) {
            holdDbBody.push({
              "place_id": detailBody[iii].place_id,
              "saved": true
            });
          } else {
            holdDbBody.push({
              "place_id": detailBody[iii].place_id,
              "saved": false
            });
          }
          console.log(`index ${iii}`);
          console.log(`holdDbBody.saved ${holdDbBody[0].saved}`);
          if (holdDbBody.length === (detailBody.length)) {
            resolve(holdDbBody);
          }
        }).catch(error => {
          console.log("Error returned from getPlacesfromDatabase");
          console.log(error);
          res.status(500).send("A Server Error Occurred");
        });
    }
  }); //end of promise
  return dbPromise;
}





const prepareForClient = (result) => {
  console.log("in prepareForClient");
  var preparePromise = new Promise(function (resolve, reject) {
    // let result = mergeByKey("place_id", holdplacesBody, holdDetailBody, holdDbBody);
    let placeDetails = result.map((element, i) => {
      let open_now = false;
      let weekday_text = [];
      let num_reviews = 0;
      let reviews = [];
      if (element.opening_hours) {
        open_now = element.opening_hours.open_now;
        weekday_text = element.opening_hours.weekday_text;
      }
      if (element.reviews) {
        reviews = element.reviews;
        num_reviews = element.reviews.length;
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
        "num_reviews": num_reviews,
        "website": element.website,
        "open_now": open_now,
        "photos": element.photos,
        "reviews": reviews,
        "weekday_text": weekday_text,
        "url": element.url
      }
      return details;
    })
    resolve(placeDetails);
  })
  return preparePromise;

}