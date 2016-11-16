angular.module("series.info.ctrl", [])
.controller("SeriesInfoCtrl", function(
  Series, // series service
  Genres, // genres service
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
      vm.title = manga.title;
      vm.description = manga.description;
      vm.genreString = Genres.toString(manga.genre);
      vm.author = manga.author;
      vm.year = manga.year;
    })
    .error(function(err) {
      console.log("Error " + err);
    })
  }
  // === Start module ===
  init();
  // === Public ===
});
