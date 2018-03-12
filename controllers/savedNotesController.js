const db = require("../models");

// Defining methods for the savedNotesController
module.exports = {
    findAllbyBrewery: function(req, res) {
        console.log (req.query.id)
        db.Notes
          .find({brewery_id: req.query.id})
          .sort({ brewery_name: -1 })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
  create: function(req, res) {
      console.log(req.body)
    db.Notes
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};