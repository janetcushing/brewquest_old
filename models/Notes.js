const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
    brewery_id: {
        type: String,
        required: true
    },
    body: {
        type: String,
        maxlength: 5000
    },
    date: {
        type: Date,
        default: Date.now
    },
    aud: {
        type: String,
        required: true
    },
    given_name: {
        type: String
    },
    name: {
        type: String
    }
  });
  
 const Notes = mongoose.model("Notes", NotesSchema);
  
  module.exports = Notes;
  