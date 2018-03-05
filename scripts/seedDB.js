const mongoose = require("mongoose");
// const db = require("../models");
const Breweries = require("../models/breweries.js");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/beerquest",{});

const brewerySeed = [
  {
    "brewery_id" : "eeb409a3571381dd9f06ba7fc81bb8855234d1e5",
    "brewery_name" : "Redhook Ale Brewery",
    "full_address" : "1 Redhook Way, Portsmouth, NH 03801, USA",
    "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png",
    "num_reviews" : "5",
    "phone" : "(603) 430-8600",
    "place_id" : "ChIJ1dtdktu_4okRsOc0QyQ4OXY",
    "price_level": "1",
    "rating" : "4.2",
    "website" : "http://redhook.com/",
    "been_there" : "true"
},
{
  "brewery_id" : "01daf25ee9bc3663b541d7f7827d80f968e20a4a",
  "brewery_name" : "Stoneface Brewing Co.",
  "full_address" : "436 Shattuck Way, Newington, NH 03801, USA",
  "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png",
  "num_reviews" : "5",
  "phone" : "(603) 570-2603",
  "place_id" : "ChIJDUFu746V4okRFJuVwzAg4jQ",
  "price_level": "2",
  "rating" : "4.7",
  "website" : "http://www.stonefacebrewing.com/",
  "been_there" : "false"
},
{
  "brewery_id" : "2b9d174fdfa8a36695ef8d1b462dab5d51a9b284",
  "brewery_name" : "Loaded Question Brewing Company - coming soon",
  "full_address" : "909 Islington St Suite #12, Portsmouth, NH 03801, USA",
  "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png",
  "num_reviews" : "2",
  "place_id" : "ChIJZcrytpq_4okRSp5MHNImhV4",
  "price_level": "3",
  "rating" : "3",
  "website" : "https://www.loadedquestionbrewing.com/",
  "been_there" : "false"
}
];

Breweries
  .remove({})
  .then(() => Breweries.collection.insertMany(brewerySeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
