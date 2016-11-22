angular.module("authors.info.ctrl", [])
.controller("AuthorsInfoCtrl", function(
  SERIES_COLUMNS, // from series controller
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
    .then(function(author) {
      vm.name = author.name;
      vm.gender = author.gender;
      vm.birthDate = author.birthDate;
      vm.series = author.series;
      // show all genres in authors series
      vm.allGenres = Authors.getAllGenres(author);
      // column headers for manga table
      vm.seriesColumns = SERIES_COLUMNS;
    }, function(err) {
      console.log("Error " + err);
    });
  }
  // === Start module ===
  init();
  // === Public ===
  // represent author's works genre as string
  vm.genreToString = function(genre) {
    return Genres.toString(genre);
  }
  vm.edit = function(field) {
    alert("Edit field '" + field + "' in Author '" + vm.name + "'");
  }
});
