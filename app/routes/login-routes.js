var express = require('express');
var mongoose = require("mongoose");
var passport = require("passport");
var jwt = require("express-jwt");
// init express router
var router = express.Router();
// get user model
var User = require("../models/user");
// process auth/login
router.route("/")
// authenticate the user and returns a token to the client (POST http://localhost:3000/auth/login)
.post(function(req, res) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({message: "Please, fill out all fields"});
  }
  /*
   * The passport.authenticate('local') middleware uses the LocalStrategy we
   * created earlier. We're using a custom callback for the authenticate
   * middleware so we can return error messages to the client.
   * If authentication is successful we want to return a JWT token to the
   * client just like our register route does.
   */
  passport.authenticate("local", function(err, user, info) {
    if (err) res.send(err);
    if (user) {
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res);
});
module.exports = router;
