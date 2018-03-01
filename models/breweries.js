// Require mongoose
const mongoose = require("mongoose");

// Get a reference to the mongoose Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new ExampleSchema object
// This is similar to a Sequelize model

const BreweriesSchema = new Schema({
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
  icon: {
    type: String,
    trim: true
  },
  rating: {
    type: String,
    trim: true
  },
  full_address: {
    type: String,
    trim: true
  },
  rating: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  num_reviews: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  brewery_id: {
    type: String,
    trim: true
  },
  lat: {
    type: String,
    trim: true
  },
  lng: {
    type: String,
    trim: true
  },
  place_id: {
    type: String,
    trim: true
  }
});

const Breweries = mongoose.model("Breweries", BreweriesSchema);

module.exports = Breweries;