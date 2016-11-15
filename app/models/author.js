var mongoose = require("mongoose");
// define author schema
var AuthorSchema = new mongoose.Schema({
  name: String,
  gender: {
    type: String,
    enum: ["Male", "Female"],
    default: "Male"
  },
  birthDate: Date,
  // define ref to populate field on find
  series: [{type: mongoose.Schema.Types.ObjectId, ref: "Manga"}]
}, {
  // explicitly state the collection name
  collection: "authors"
});
module.exports = mongoose.model("Author", AuthorSchema);
