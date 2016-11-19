angular.module("series.ctrl", [])
.value("SERIES_PER_PAGE", 10)
.value("SERIES_HEADERS", ["Title", "Genre", "Year"])
.controller("SeriesCtrl", function(
  SERIES_HEADERS, // columns names
  SERIES_PER_PAGE, // number of mangas per page
  Utilities, // some useful functions
  Genres, // genres service
  Series) { // series service
  // === Variables ===
  var vm = this;
  // === Private ===
  Array.prototype.isEmpty = function() {
    return this.length < 1;
  }
  // reload pages from scratch data
  function reload(data) {
    // split list to pages
    vm.pages = Utilities.split(data, SERIES_PER_PAGE);
    if (vm.pages.isEmpty()) {
      vm.pages.push([]); // push one empty
    }
  }
  // constructor
  function init() {
    // original data
    vm.response = [];
    // array of series divided by pages
    vm.pages = [[]]; // one empty page
    Series.getAll()
    .then(function(data) {
      // save data copy(!) from server
      vm.response = data.slice();
      // divide data to pages
      reload(data); // 'data' will be empty after reload (!)
      // set first page by default
      vm.setCurrentPage(0);
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
    vm.pageIndex = index; // save current page index
    vm.currentPage = vm.pages[index];
  }
  vm.goSearch = function() {
    var query = vm.searchQuery;
    // set empty query if undefined
    if (query === undefined) query = "";
    // apply full-text search filter
    var filtered = []; // filtered array
    for (var i = 0; i < vm.response.length; i++) {
      var obj = vm.response[i];
      // manga passed filter if title contains query string
      if (obj.title.indexOf(query) !== -1) {
        filtered.push(obj);
      }
    }
    // reload filtered data
    reload(filtered);
    // return to first page
    vm.setCurrentPage(0);
  }
});
