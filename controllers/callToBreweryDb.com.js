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

