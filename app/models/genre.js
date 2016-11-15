var mongoose = require("mongoose");
// define genre schema
var GenreSchema = new mongoose.Schema({
  name: String
}, {
  // explicitly state the collection name
  collection: "genres"
});
module.exports = mongoose.model("Genre", GenreSchema);
