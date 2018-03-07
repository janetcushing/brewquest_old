// Require mongoose
const mongoose = require("mongoose");

// Get a reference to the mongoose Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new ExampleSchema object
// This is similar to a Sequelize model

const PlacesSchema = new Schema({
  been_there: {
    type: Boolean,
    default: false
  },
 
  details_key: {
    type: Number
  },
  full_address: {
    type: String,
    trim: true
  },
  icon: {
    type: String,
    trim: true
  },
  id: {
    type: String,
    trim: true
  },
  insertDate: {
    type: Date,
    default: Date.now
  },
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  },
  name: {
    type: String,
    trim: true,
    required: "name is Required",
    validate: [
      function (input) {
        return input.length >= 1;
      },
      "String should be longer."
    ]
  },
  num_reviews: {
    type: Number
  },
  open_now: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    trim: true
  },
  photos: {
    type: Array
  },
  place_id: {
    type: String,
    trim: true
  },
  price_level: {
    type: Number
  },
  rating: {
    type: Number
  },
  reviews: {
    type: Array
  },
  saved: {
    type: Boolean,
    default: true
  },
  vicinity: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  weekday_text: {
    type: Array
  }
  
});

const Places = mongoose.model("Places", PlacesSchema);

module.exports = Places;