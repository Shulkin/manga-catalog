angular.module("series.ctrl", [])
.value("SERIES_HEADERS", ["Title", "Genre", "Year"])
.controller("SeriesCtrl", function(
  SERIES_HEADERS, // columns names
  Series, // series service
  Genres) { // genres service
  // === Variables ===
  var vm = this;
  // === Private ===
  // constructor
  function init() {
    vm.list = []; // array of series
    Series.getAll()
    .success(function(data) {
      vm.list = data;
      // convert array of genres ids to string
      for (var i = 0; i < vm.list.length; i++) {
        // new field for string presentation of genres
        vm.list[i].allGenres = "";
        for (var j = 0; j < vm.list[i].genre.length; j++) {
          vm.list[i].allGenres += vm.list[i].genre[j].name + ", ";
        }
        vm.list[i].allGenres = vm.list[i].allGenres.slice(0, -2);
      }
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
});
