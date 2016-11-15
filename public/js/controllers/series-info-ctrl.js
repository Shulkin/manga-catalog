angular.module("series.info.ctrl", [])
.controller("SeriesInfoCtrl", function(
  Series, // series service
  $stateParams) {
  // === Variables ===
  var vm = this;
  // receive manga id from url
  var id = $stateParams.id;
  // === Private ===
  // constructor
  function init() {
    Series.get(id)
    .success(function(manga) {
      /*
      title: String,
      description: String,
      year: Number,
      genre: [{type: mongoose.Schema.Types.ObjectId, ref: "Genre"}],
      author: {type: mongoose.Schema.Types.ObjectId, ref: "Author"}
      */
      vm.title = manga.title;
      vm.description = manga.description;
      vm.year = manga.year;
      // ===
      vm.json = manga; // delete later!
    })
    .error(function(err) {
      console.log("Error " + err);
    })
  }
  // === Start module ===
  init();
  // === Public ===
});
