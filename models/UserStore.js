// Require mongoose
const mongoose = require("mongoose");

// Get a reference to the mongoose Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new ExampleSchema object
// This is similar to a Sequelize model

const UserStoreSchema = new Schema({
  insertDate: {
    type: Date,
    default: Date.now
  }, 
  given_name: {
    type: String
  },
  family_name: {
    type: String
  },
  middle_name: {
    type: String
  },
  nickname: {
    type: String
  },
  name: {
    type: String
  },
  picture: {
    type: String
  },
  gender: {
    type: String
  },
  locale: {
    type: String
  },
  updated_at: {
    type: String
  },
  iss: {
    type: String
  },
  sub: {
    type: String
  },
  aud: {
    type: String
  },
  iat: {
    type: String
  },
  exp: {
    type: String
  },
  at_hash: {
    type: String
  },
  nonce: {
    type: String
  },
  loggedIn: {
    type: Boolean
  }
});

const UserStore = mongoose.model("UserStore", UserStoreSchema);

module.exports = UserStore;


/*
NOTE:
savedPlaces Array =
[{breweries_id (Integer)
been_there (Boolean)
notes (Array)}]
*/

/*
{
  "given_name": "Janet",
  "family_name": "Cushing",
  "middle_name": "Batchelder",
  "nickname": "janet.cushing",
  "name": "Janet Batchelder Cushing",
  "picture": "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/18813261_10213643935637234_3046715948998250833_n.jpg?oh=25f5ee2d5c1e8a444da53b5fd1e2baad&oe=5B4B45EE",
  "gender": "female",
  "locale": "en-US",
  "updated_at": "2018-03-12T01:40:02.980Z",
  "iss": "https://beer-quest.auth0.com/",
  "sub": "facebook|10216265510094957",
  "aud": "hBUrEY7ugr1dCF8SatxQiOnIVVW4c5ia",
  "iat": 1520818802,
  "exp": 1520854802,
  "at_hash": "SCuCfJXDRr56WJSrcpgOgg",
  "nonce": "OY4CZHFZpGGAQiZKv0xF3cRNgQagv2jk"
}
*/