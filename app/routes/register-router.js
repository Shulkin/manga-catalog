var express = require('express');
var mongoose = require("mongoose");
var passport = require("passport");
var jwt = require("express-jwt");
// init express router
var router = express.Router();
// get user model
var User = require("../models/user");
// process auth/register
router.route("/")
// register a user given a username and password (POST http://localhost:3000/auth/register)
.post(function(req, res) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({message: "Please, fill out all fields"});
  }
  var user = new User();
  user.username = req.body.username;
  user.setPassword(req.body.password);
  user.save(function(err) {
    if (err) res.send(err);
    return res.json({token: user.generateJWT()});
  });
});
module.exports = router;
