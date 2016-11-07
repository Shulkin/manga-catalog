var mongoose = require("mongoose");
// define genre schema
var GenreSchema = new mongoose.Schema({
  name: String
});
module.exports = mongoose.model("Genre", GenreSchema);
