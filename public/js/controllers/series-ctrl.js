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
.controller("SeriesCtrl", function(
  SERIES_COLUMNS, // columns names and info
  SERIES_PER_PAGE, // number of mangas per page
  Utilities, // some useful functions
  Genres, // genres service
  Series) { // series service
  // === Variables ===
  var vm = this;
  // order and filter table data
  vm.sortType = "title"; // sort by title
  vm.sortReverse = false; // ascending order
  vm.searchQuery = ""; // filter nothing by default
  // fill up columns names
  vm.columns = SERIES_COLUMNS;
  // number of manga per page in table
  vm.perPage = SERIES_PER_PAGE;
  // first page by default
  // vm.currentPage = 1;
  // === Private ===
  /*
  Array.prototype.isEmpty = function() {
    return this.length < 1;
  }
  */
  // reload pages from scratch data
  /*
  function reload(data) {
    // split list to pages
    vm.pages = Utilities.split(data, SERIES_PER_PAGE);
    if (vm.pages.isEmpty()) {
      vm.pages.push([]); // push one empty
    }
  }
  */
  // constructor
  function init() {
    // list of series
    vm.list = [];
    // original data
    // vm.response = [];
    // array of series divided by pages
    // vm.pages = [[]]; // one empty page
    Series.getAll()
    .then(function(data) {
      vm.list = data;
      // save data copy(!) from server
      // vm.response = data.slice();
      // divide data to pages
      // reload(data); // 'data' will be empty after reload (!)
      // set first page by default
      // vm.setCurrentPage(0);
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
  /*
  // paginate filter for ui.bootstrap pagination
  vm.paginate = function(value) {
    var begin, end, index;
    begin = (vm.currentPage - 1) * vm.numPerPage;
    end = begin + vm.numPerPage;
    index = vm.list.indexOf(value);
    return (begin <= index && index < end);
  }
  */
  // select current page
  /*
  vm.setCurrentPage = function(index) {
    vm.pageIndex = index; // save current page index
    vm.currentPage = vm.pages[index];
  }
  */
  /*
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
  */
});
