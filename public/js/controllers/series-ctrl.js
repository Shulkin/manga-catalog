angular.module("series.ctrl", [])
.value("SERIES_HEADERS", ["Title", "Genre", "Year"])
.controller("SeriesCtrl", function(
  SERIES_HEADERS, // columns names
  Series, // series service
  Genres) { // genres service
  // === Variables ===
  var vm = this;
  // === Private ===
  // convert array of genres ids to string
  function getGenres() {
    Genres.getAll()
    .success(function(data) {
      for (var i = 0; i < vm.list.length; i++) {
        vm.list[i].genreStr = "";
        var genre = vm.list[i].genre;
        for (var j = 0; j < genre.length; j++) {
          for (var k = 0; k < data.length; k++) {
            if (genre[j] === data[k]._id) {
              vm.list[i].genreStr += data[k].name + ", ";
            }
          }
        }
        if (vm.list[i].genreStr != "") {
          vm.list[i].genreStr = vm.list[i].genreStr.slice(0, -2);
        }
      }
    })
    .error(function(err) {
      console.log("Error " + err);
    });
  }
  // constructor
  function init() {
    vm.list = []; // array of series
    Series.getAll()
    .success(function(data) {
      vm.list = data;
      getGenres();
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
