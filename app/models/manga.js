var mongoose = require("mongoose");
// define manga schema
var MangaSchema = new mongoose.Schema({
  title: String,
  description: String,
  year: Number,
  genre: [Schema.Types.ObjectId],
  author: Schema.Types.ObjectId
});
