var express = require("express");
var router = express.Router();
var Genre = require("../models/genre");
// process api/genres
router.route("/")
// get all genres (GET http://localhost:3000/api/genres)
.get(function(req, res) {
  Genre.find(function(err, genres) {
    if (err) res.send(err);
    res.json(genres);
  });
})
// create new genre (POST http://localhost:3000/api/genres)
.post(function(req, res) {
  Genre.create({
    name: req.body.name
  }, function(err, genre) {
    if (err) res.send(err);
    // return new genres list
    Genre.find(function(err, genres) {
      if (err) res.send(err);
      res.json(genres);
    });
  });
});
// process api/genres/id
router.route("/:id")
// delete genre (DELETE http://localhost:3000/api/genres/id)
.delete(function(req, res) {
  Genre.remove({
    _id: req.params.id
  }, function(err, genre) {
    if (err) res.send(err);
    // return new genres list
    Genre.find(function(err, genres) {
      if (err) res.send(err);
      res.json(genres);
    });
  });
});
module.exports = router;
