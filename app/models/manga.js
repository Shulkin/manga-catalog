var mongoose = require("mongoose");
// define manga schema
var MangaSchema = new mongoose.Schema({
  title: String,
  description: String,
  year: Number,
  genre: [mongoose.Schema.Types.ObjectId],
  author: mongoose.Schema.Types.ObjectId
}, {
  // explicitly state the collection name
  collection: "series"
});
module.exports = mongoose.model("Manga", MangaSchema);
