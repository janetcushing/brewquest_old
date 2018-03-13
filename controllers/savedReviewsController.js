const db = require("../models");

// Defining methods for the savedNotesController
module.exports = {
    findAllbyBrewery: function (req, res) {
        db.Reviews
            .find({
                brewery_id: req.query.id
            })
            .sort({
                brewery_name: -1
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.Reviews
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // remove: function (req, res) {
    //     db.Notes
    //         .findById(req.query.id).remove()
    //         .then(dbModel => res.json(dbModel))
    //         .catch(err => res.status(422).json(err));
    // }
};