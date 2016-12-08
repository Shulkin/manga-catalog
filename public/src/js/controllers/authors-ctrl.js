angular.module("authors.ctrl", [
  "angularUtils.directives.dirPagination"
])
.value("AUTHORS_PER_PAGE", 10)
.value("AUTHORS_COLUMNS", [
  {header: "Name", fieldName: "name", sortable: true},
  {header: "Series", fieldName: "series", sortable: true},
  {header: "Most Numerous Genre", fieldName: "mostNumerousGenre", sortable: false},
])
.controller("AuthorsCtrl", [
  "AUTHORS_COLUMNS", "AUTHORS_PER_PAGE", "Auth", "Authors", function(
  AUTHORS_COLUMNS, // columns names and info
  AUTHORS_PER_PAGE, // number of authors per page
  Auth, Authors, Series) {
  // === Variables ===
  var vm = this;
  vm.columns = AUTHORS_COLUMNS;
  vm.perPage = AUTHORS_PER_PAGE;
  // sort by name by default
  vm.sortType = vm.columns[0].fieldName;
  vm.sortReverse = false; // ascending
  vm.searchQuery = ""; // filter nothing
  // === Private ===
  // constructor
  function init() {
    // list of authors
    vm.list = [];
    Authors.getAll()
    .then(function(data) {
      vm.list = data;
      // create new field for most used genres in author's works
      for (var i = 0; i < vm.list.length; i++) {
        // select five most used genres!
        vm.list[i].mostNumerousGenre = Authors.getMostNumerousGenre(vm.list[i], 5);
      }
    }, function(err) {
      console.log("Error " + err);
    });
  }
  // === Start module ===
  init();
  // === Public ===
  vm.isUserLoggedIn = Auth.isLoggedIn;
  // delete author from the list
  vm.delete = function(authorId) {
    console.log("[AuthorsCtrl.delete()] authorId = " + authorId);
    // find list of series for this author
    var series = [];
    for (var i = 0; i < vm.list.length; i++) {
      if (vm.list[i]._id === authorId) {
        series = vm.list[i].series;
        break;
      }
    }
    Authors.delete(authorId)
    .then(function(data) {
      console.log("[AuthorsCtrl.delete()] Success!");
      vm.list = data; // reload authors
      console.log("[AuthorsCtrl.delete()] Delete all his works = " + JSON.stringify(series));
      // delete all works by this author
      for (var i = 0; i < series.length; i++) {
        console.log("[AuthorsCtrl.delete()] Delete manga = " + series[i]._id);
        Series.delete(series[i]._id);
      }
    }, function(err) {
      console.log("Error " + err);
    });
  };
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
  };
  vm.isAscending = function(fieldName) {
    return (vm.sortType === fieldName && vm.sortReverse);
  };
  vm.isDescending = function(fieldName) {
    return (vm.sortType === fieldName && !vm.sortReverse);
  };
}]);
