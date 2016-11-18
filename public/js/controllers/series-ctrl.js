angular.module("series.ctrl", [])
.value("SERIES_PER_PAGE", 10)
.value("SERIES_HEADERS", ["Title", "Genre", "Year"])
.controller("SeriesCtrl", function(
  SERIES_HEADERS, // columns names
  SERIES_PER_PAGE, // number of manga per page
  Utilities, // some useful functions
  Genres, // genres service
  Series) { // series service
  // === Variables ===
  var vm = this;
  // === Private ===
  Array.prototype.isEmpty = function() {
    return this.length < 1;
  }
  // split list to pages
  function split(data) {
    return Utilities.split(data, SERIES_PER_PAGE);
  }
  // reload pages from scratch data
  function reload(data) {
    vm.pages = split(data);
    if (vm.pages.isEmpty()) {
      vm.pages.push([]); // push one empty
    }
  }
  // constructor
  function init() {
    // array of series divided by pages
    vm.pages = [[]]; // one empty page
    Series.getAll()
    .then(function(data) {
      reload(data);
      // first page by default
      vm.setCurrentPage(0)
    }, function(err) {
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
  // select current page
  vm.setCurrentPage = function(index) {
    vm.currentIndex = index; // save current page index
    vm.currentPage = vm.pages[index];
  }
});
