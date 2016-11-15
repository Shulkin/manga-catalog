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
  series: [mongoose.Schema.Types.ObjectId]
}, {
  // explicitly state the collection name
  collection: "authors"
});
module.exports = mongoose.model("Author", AuthorSchema);
