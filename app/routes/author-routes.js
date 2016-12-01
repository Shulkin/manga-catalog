var express = require("express");
// use express built-in router
var router = express.Router();
// get local mongoose model
var Author = require("../models/author");
// MongoDB will create collection 'authors'
// process api/authors/
router.route("/")
// get authors list (GET http://localhost:3000/api/authors)
.get(function(req, res) {
  Author.find()
  // deep population
  .populate({
    path: "series", // get list of series from this author
    populate: {
      path: "genre" // get each series genre
    }
  })
  .exec(function(err, authors) {
    if (err) res.send(err);
    res.json(authors);
  });
})
// add new author (POST http://localhost:3000/api/authors)
.post(function(req, res) {
  Author.create({
    name: req.body.name,
    gender: req.body.gender,
    birthDate: req.body.birthDate,
    series: req.body.series
  }, function(err, author) {
    if (err) res.send(err);
    // return new author
    res.json(author);
  });
});
// process api/authors/id
router.route("/:id")
// find author by id (GET http://localhost:3000/api/authors/id)
.get(function(req, res) {
  Author.findById(req.params.id)
  // deep population
  .populate({
    path: "series", // get list of series from this author
    populate: {
      path: "genre" // get each series genre
    }
  })
  .exec(function(err, author) {
    if (err) res.send(err);
    res.json(author);
  });
})
// update author info (PUT http://localhost:3000/api/authors/id)
.put(function(req, res) {
  Author.findById(req.params.id, function(err, author) {
    if (err) res.send(err);
    // set only text info
    author.name = req.body.name;
    author.gender = req.body.gender;
    author.birthDate = req.body.birthDate;
    // do not update series list!
    author.save(function(err) {
      if (err) res.send(err);
      // return updated author
      res.json(author);
    });
  });
})
// delete author (DELETE http://localhost:3000/api/authors/id)
.delete(function(req, res) {
  Author.remove({
    _id: req.params.id
  }, function(err, author) {
    if (err) res.send(err);
    // return new authors list
    Author.find(function(err, authors) {
      if (err) res.send(err);
      res.json(authors);
    });
  })
});
// process api/authors/id/manga
router.route("/:id/manga")
// update author series list (POST http://localhost:3000/api/authors/id/manga)
.post(function(req, res) {
  Author.findById(req.params.id, function(err, author) {
    if (err) res.send(err);
    // rewrite series from scratch
    author.series = req.body.series;
    author.save(function(err) {
      if (err) res.send(err);
      res.json(author);
    });
  });
})
// add manga to series list (PUT http://localhost:3000/api/authors/id/manga)
.put(function(req, res) {
  Author.findById(req.params.id, function(err, author) {
    if (err) res.send(err);
    // push manga id to list
    author.series.push(req.body.id);
    author.save(function(err) {
      if (err) res.send(err);
      res.json(author);
    });
  });
});
// process api/authors/id/manga/manga_id
router.route("/:id/manga/:manga_id")
// delete manga from list of authors works (DELETE http://localhost:3000/api/authors/id/manga/manga_id)
.delete(function(req, res) {
  Author.findById(req.params.id, function(err, author) {
    if (err) res.send(err);
    // find series in list by id and remove it
    var i = author.series.length;
    while (i--) { // loop backwards
      // compare ids of series
      if (author.series[i].equals(req.params.manga_id)) {
        // remove from list
        author.series.splice(i, 1);
      }
    }
    author.save(function(err) {
      if (err) res.send(err);
      res.json(author);
    });
  });
});
module.exports = router;
