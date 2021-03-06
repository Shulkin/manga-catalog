var express = require("express");
var jwt = require("express-jwt");
var router = express.Router();
var Manga = require("../models/manga");
// middleware for authenticating jwt tokens
var auth = jwt({secret: "SECRET", userProperty: "payload"});
// process api/series
router.route("/")
// get manga list (GET http://localhost:3000/api/series)
.get(function(req, res) {
  Manga.find()
  .populate("genre") // get series genre
  .populate("author") // find its author
  .exec(function(err, series) {
    if (err) res.send(err);
    res.json(series);
  });
})
// create manga (POST http://localhost:3000/api/series)
.post(auth, function(req, res) { // require authentication!
  Manga.create({
    title: req.body.title,
    description: req.body.description,
    year: req.body.year, // number
    genre: req.body.genre, // array [Schema.Types.ObjectId]
    author: req.body.author // Schema.Types.ObjectId
  }, function(err, manga) {
    if (err) res.send(err);
    // return new manga
    res.json(manga);
  });
});
// process api/series/id
router.route("/:id")
// find series by id (GET http://localhost:3000/api/series/id)
.get(function(req, res) {
  Manga.findById(req.params.id)
  .populate("genre")
  .populate("author")
  .exec(function(err, manga) {
    if (err) res.send(err);
    res.json(manga);
  });
})
// update manga info (PUT http://localhost:3000/api/series/id)
.put(auth, function(req, res) { // require authentication!
  Manga.findById(req.params.id, function(err, manga) {
    if (err) res.send(err);
    manga.title = req.body.title;
    manga.description = req.body.description;
    manga.year = req.body.year;
    manga.genre = req.body.genre;
    manga.author = req.body.author;
    manga.save(function(err) {
      if (err) res.send(err);
      // return updated series
      res.json(manga);
    });
  });
})
// delete series (DELETE http://localhost:3000/api/series/id)
.delete(auth, function(req, res) { // require authentication!
  Manga.remove({
    _id: req.params.id
  }, function(err, manga) {
    if (err) res.send(err);
    // return new series list
    Manga.find().
    populate("genre").
    populate("author")
    .exec(function(err, series) {
      if (err) res.send(err);
      res.json(series);
    });
  });
});
// process api/series/id/genre
router.route("/:id/genre")
// add genre to manga (PUT http://localhost:3000/api/series/id/genre)
.put(auth, function(req, res) { // require authentication!
  Manga.findById(req.params.id, function(err, manga) {
    if (err) res.send(err);
    // insert new genre id
    manga.genre.push(req.body.genre)
    manga.save(function(err) {
      if (err) res.send(err);
      res.json(manga);
    });
  });
});
module.exports = router;
