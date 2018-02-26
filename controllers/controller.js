
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

getBreweryData = (req, res) => {
  console.log("Im in getBreweryData");
  const BASEURL = "http://api.brewerydb.com/v2/locations?";
  const APIKEY = "key=32c6dc015d7cf847c9bd1c05f34160ee";
  const FORMAT = "&format=json";
  const POSTAL = "&postalCode="
  console.log("query" + req.params.location); 
  console.log("url: " + BASEURL + APIKEY + FORMAT + POSTAL + req.params.location);
  // , { crossdomain: true }
  axios
    .get(BASEURL + APIKEY + FORMAT + POSTAL + req.params.location)
    .then(response => {
      console.log(`came back successfully`);
      console.log(response);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.totalResults);
      // console.log(res.res);
      console.log(response.data);
     
      const breweryDetails = [];

      res.data.data.forEach(function (element, i) {
        let details = {
          "details_key": i,
          "breweryId": element.breweryId,
          "name": element.brewery.name,
          "latitude": element.latitude,
          "longitude": element.longetude,
          "locality": element.locality,
          "locationType": element.locationType,
          "locationTypeDisplay": element.locationTypeDisplay,
          "phone": element.phone,
          "postalCode": element.postalCode,
          "region": element.region,
          "streetAddress": element.streetAddress,
          "website": element.website,
          "description": element.brewery.description,
          "country": element.country,
          "isClosed": element.isClosed,

        }
        breweryDetails.push(details);
        console.log("breweryDetails.length");
        console.log(breweryDetails.length);
        res.send(breweryDetails);
      });
    })
    .catch(error => {
      console.log("Error returned from getBreweryData");
      console.log(error);
    });
};



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