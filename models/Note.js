const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    body: {
        type: String,
        maxlength: 5000
    },
    date: {
        type: Date,
        default: Date.now
    }
  });
  
 const Note = mongoose.model("Note", NoteSchema);
  
  module.exports = Note;
  