// Require mongoose
const mongoose = require("mongoose");

// Get a reference to the mongoose Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new ExampleSchema object
// This is similar to a Sequelize model

const UsersSchema = new Schema({
  insertDate: {
    type: Date,
    default: Date.now
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
  savedPlaces: {
    type: Array
  } 
});

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;


/*
NOTE:
savedPlaces Array =
[{breweries_id (Integer)
been_there (Boolean)
notes (Array)}]
*/