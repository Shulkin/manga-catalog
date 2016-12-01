angular.module("series.ctrl", [
  // third-party directive for table data pagination
  "angularUtils.directives.dirPagination" // by Michael Bromley
])
.value("SERIES_PER_PAGE", 10)
.value("SERIES_COLUMNS", [
  {header: "Title", fieldName: "title", sortable: true},
  {header: "Genre", fieldName: "genre", sortable: false},
  {header: "Year", fieldName: "year", sortable: true},
])
.controller("SeriesCtrl", [
  "SERIES_COLUMNS", "SERIES_PER_PAGE", "Genres", "Series", function(
  SERIES_COLUMNS, // columns names and info
  SERIES_PER_PAGE, // number of mangas per page
  Genres, // genres service
  Series) { // series service
  // === Variables ===
  var vm = this;
  // fill up columns names
  vm.columns = SERIES_COLUMNS;
  // number of manga per page in table
  vm.perPage = SERIES_PER_PAGE;
  // order and filter table data
  vm.sortType = vm.columns[0].fieldName; // sort first column (title)
  vm.sortReverse = false; // ascending order
  vm.searchQuery = ""; // filter nothing by default
  // === Private ===
  // constructor
  function init() {
    // list of series
    vm.list = [];
    Series.getAll()
    .then(function(data) {
      vm.list = data;
    }, function(err) {
      console.log("Error " + err);
    });
  }
  // === Start module ===
  init();
  // === Public ===
  // represent manga genre as string
  vm.genreToString = function(genre) {
    return Genres.toString(genre);
  }
  // switch sort on selected column
  vm.sort = function(fieldName) {
    // if enabled first time on column
    if (vm.sortType !== fieldName) {
      // ascending by default
      vm.sortReverse = false;
    } else {
      // switch existing order
      vm.sortReverse = !vm.sortReverse;
    }
    vm.sortType = fieldName;
  }
  vm.isAscending = function(fieldName) {
    return (vm.sortType === fieldName && vm.sortReverse);
  }
  vm.isDescending = function(fieldName) {
    return (vm.sortType === fieldName && !vm.sortReverse);
  }
}]);
