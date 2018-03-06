const db = require("../models");

// Defining methods for the savedPlacesController
module.exports = {
  findAll: function(req, res) {
    db.Breweries
      .find(req.query)
      .sort({ brewery_name: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Breweries
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Breweries
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    console.log("got to controller for beentoplace");
    console.log(req.body);
    console.log(req.params);
    db.Breweries
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => 
        {console.log(dbModel)
        res.json(dbModel)})
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Breweries
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};