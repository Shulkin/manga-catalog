var express = require("express");
var router = express.Router();
var User = require("../models/user");
// process auth/users
router.route("/")
// get all registered users (GET http://localhost:3000/auth/users)
.get(function(req, res) {
  User.find().exec(function(err, users) {
    if (err) res.send(err);
    res.json(users);
  });
});
module.exports = router;
