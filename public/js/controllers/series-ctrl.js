angular.module("series.ctrl", [])
.value("SERIES_HEADERS", ["Title", "Genre", "Year"])
.controller("SeriesCtrl", function(
  SERIES_HEADERS, // columns names
  Genres, // genres service
  Series) { // series service
  // === Variables ===
  var vm = this;
  // === Private ===
  // constructor
  function init() {
    vm.list = []; // array of series
    Series.getAll()
    .success(function(data) {
      vm.list = data;
    })
    .error(function(err) {
      console.log("Error " + err);
    });
    // fill up columns names
    vm.columns = SERIES_HEADERS;
  }
  // === Start module ===
  init();
  // === Public ===
  // represent manga genre as string
  vm.genreToString = function(genre) {
    return Genres.toString(genre);
  }
});
