//=================================================
// dependencies
//=================================================
const Express = require("express");
const mongojs = require("mongojs");
const router = Express.Router();
const axios = require("axios");

//=================================================
// global variables
//=================================================

//=================================================
// Functions
//=================================================
// function getLatLong(zipCode) {
//   const geocoder = new google.maps.Geocoder();
//   // var restaurants;
//   geocoder.geocode({
//       'address': zipCode
//   }, function (results, status) {
//       if (status == google.maps.GeocoderStatus.OK) {
//           var latitude = results[0].geometry.location.lat();
//           var longitude = results[0].geometry.location.lng();
//           //This is the "ajax" call to the Zomato server to fetch 5 restaurants serving x cuisine within 15+/- miles of the zip code requested.
//           $.get(

//             /*
//           https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyA7t69YFqsUbFeIvgtZxcCSHMoZxO0ZYDs&location=43.0875,-70.8358&rankby=distance&keyword=brewery
//           */
//           }
//         });
//       }

getBreweryData = (req, res) => {
  console.log("Im in getBreweryData");
  // const BASEURL = "http://api.brewerydb.com/v2/locations?";
  // const APIKEY = "key=32c6dc015d7cf847c9bd1c05f34160ee";
  // const FORMAT = "&format=json";
  // const POSTAL = "&postalCode="
  // console.log("query" + req.params.location); 
  // console.log("url: " + BASEURL + APIKEY + FORMAT + POSTAL + req.params.location);
  // // , { crossdomain: true }
  // axios
  //   .get(BASEURL + APIKEY + FORMAT + POSTAL + req.params.location)
  //   .then(response => {
  //     console.log(`came back successfully`);
  //     // console.log(response);
  //     console.log(response.status);
  //     console.log(response.statusText);
  //     console.log(response.totalResults);
  //     console.log(response.data[0]);

  //     const breweryDetails = [];

  // response.data.data.forEach(function (element, i) {
  //   let details = {
  //     "details_key": i,
  //     "breweryId": element.breweryId,
  //     "name": element.brewery.name,
  //     "latitude": element.latitude,
  //     "longitude": element.longetude,
  //     "locality": element.locality,
  //     "locationType": element.locationType,
  //     "locationTypeDisplay": element.locationTypeDisplay,
  //     "phone": element.phone,
  //     "postalCode": element.postalCode,
  //     "region": element.region,
  //     "streetAddress": element.streetAddress,
  //     "website": element.website,
  //     "description": element.brewery.description,
  //     "country": element.country,
  //     "isClosed": element.isClosed,

  //   }
  //     breweryDetails.push(details);    
  //   });
  //   console.log("breweryDetails.length");
  //     console.log(breweryDetails.length);
  //     res.send({breweryDetails});
  // })
  // .catch(error => {
  //   console.log("Error returned from getBreweryData");
  //   console.log(error);
  // });



  const lat = 43.0875;
  const long = -70.8358;
  const BASEURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
  const APIKEY = "key=AIzaSyA7t69YFqsUbFeIvgtZxcCSHMoZxO0ZYDs";
  const LOCATION = "&location=" + lat + ',' + long;
  const RANKBY = "&rankby=distance"
  const KEYWORD = "&keyword=brewery"
  console.log("query" + req.params.location);
  console.log("url: " + BASEURL + APIKEY + LOCATION + RANKBY + KEYWORD);
  // , { crossdomain: true }
  axios
    .get(BASEURL + APIKEY + LOCATION + RANKBY + KEYWORD)
    .then(response => {
      console.log(`came back successfully`);
      // console.log(response);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.data.results);

      const breweryDetails = [];
      response.data.results.forEach(function (element, i) {
      let details = {
        "details_key": i,
      "breweryId": element.id,
      "icon": element.icon,
      "lat": element.geometry.location.lat,
      "lng": element.geometry.location.lng,
      "name": element.name,
      // "open_now": element.opening_hours.open_now,
      // "photo_html_attributions": element.photos[0].html_attributions,
      // "photo_reference": element.photos[0].photo_reference,
      "place_id": element.place_id,
      "rating": element.rating,
      "vicinity": element.vicinity
      }
      // let details = {
      //   "breweryId": response.data.results[0].id,
      //   "icon": response.data.results[0].icon,
      //   "latitude": response.data.results[0].geometry.location.lat,
      //   "longitude": response.data.results[0].geometry.location.lng,
      //   "name": response.data.results[0].name,
      //   "open_now": response.data.results[0].opening_hours.open_now,
      //   "photo_html_attributions": response.data.results[0].photos[0].html_attributions,
      //   "photo_reference": response.data.results[0].photos[0].photo_reference,
      //   "place_id": response.data.results[0].place_id,
      //   "rating": response.data.results[0].rating
      // }
      breweryDetails.push(details);
      // console.log(response.data.results[0].photos);
      });
      console.log("breweryDetails.length");
      console.log(breweryDetails.length);
      res.send({
        breweryDetails
      });
    })
    .catch(error => {
      console.log("Error returned from getBreweryData");
      console.log(error);
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