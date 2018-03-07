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
    console.log("got to controller for place detail page")
    db.Breweries
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // find: function(req, res) {
  //   db.Breweries
  //     .find()
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // }, 
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
      .findById(req.params.id)
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByBreweryId: function(req, res) {
    db.Breweries
      .find({"brewery_id": req.params.id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateByBreweryId: function(req, res) {
    db.Breweries
      .findOneAndUpdate({ brewery_id: req.params.brewery_id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  removeByBreweryId: function(req, res) {
    db.Breweries
      .find({ brewery_id: req.params.breweryId })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};