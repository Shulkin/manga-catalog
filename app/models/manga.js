var mongoose = require("mongoose");
// define manga schema
var MangaSchema = new mongoose.Schema({
  title: String,
  description: String,
  year: Number,
  // define ref to populate field on find
  genre: [{type: mongoose.Schema.Types.ObjectId, ref: "Genre"}],
  author: {type: mongoose.Schema.Types.ObjectId, ref: "Author"}
}, {
  // explicitly state the collection name
  collection: "series"
});
module.exports = mongoose.model("Manga", MangaSchema);
