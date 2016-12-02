var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var crypto = require("crypto");
// define user schema
var UserSchema = new mongoose.Schema({
  username: {type: String, lowercase: true, unique: true},
  hash: String,
  salt: String
}, {
  // state the collection
  collection: "users"
});
// implement some methods
UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  /*
   * The pbkdf2Sync() function takes four parameters: password, salt,
   * iterations, and key length. We'll need to make sure the iterations and key
   * length in our setPassword() method match the ones in our validPassword()
   * method
   */
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString("hex");
};
UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString("hex");
  return this.hash === hash;
};
UserSchema.methods.generateJWT = function() {
  // set expiration to 60 days
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);
  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000)
  }, "SECRET");
  /*
   * We hardcoded the secret to sign tokens, but it is strongly recommended to
   * use an environment variable for referencing the secret and keep it out of
   * your codebase
   */
};
module.exports = mongoose.model("User", UserSchema);
