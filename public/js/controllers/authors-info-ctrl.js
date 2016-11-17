angular.module("authors.info.ctrl", [])
.controller("AuthorsInfoCtrl", function(
  SERIES_HEADERS, // from series controller
  Genres, // genres service
  Authors, // authors service
  $stateParams) {
  // === Variables ===
  var vm = this;
  // receive author id from url
  var id = $stateParams.id;
  // === Private ===
  // constructor
  function init() {
    Authors.get(id)
    .success(function(author) {
      vm.name = author.name;
      vm.gender = author.gender;
      vm.birthDate = author.birthDate;
      vm.series = author.series;
      // show all genres in authors series
      vm.allGenres = Authors.getAllGenres(author);
      // column headers for manga table
      vm.seriesColumns = SERIES_HEADERS;
    })
    .error(function(err) {
      console.log("Error " + err);
    })
  }
  // === Start module ===
  init();
  // === Public ===
  // represent author's works genre as string
  vm.genreToString = function(genre) {
    return Genres.toString(genre);
  }
});
