angular.module("authors.ctrl", [])
.value("AUTHORS_PER_PAGE", 10)
.value("AUTHORS_HEADERS", ["Name", "Series", "Most Numerous Genre"])
.controller("AuthorsCtrl", function(
  AUTHORS_HEADERS, // columns names
  AUTHORS_PER_PAGE, // number of authors per page
  Utilities,
  Authors) { // authors service
  // === Variables ===
  var vm = this;
  // === Private ===
  Array.prototype.isEmpty = function() {
    return this.length < 1;
  }
  // reload pages from scratch data
  function reload(data) {
    vm.pages = Utilities.split(data, AUTHORS_PER_PAGE);
    if (vm.pages.isEmpty()) {
      vm.pages.push([]);
    }
    // create new field for most used genres in author's works
    for (var i = 0; i < vm.pages.length; i++) {
      var page = vm.pages[i];
      for (var j = 0; j < page.length; j++) {
        // select only 5 most used genres!
        page[j].mostNumerousGenre =
          Authors.getMostNumerousGenre(page[j], 5);
      }
    }
  }
  // constructor
  function init() {
    vm.response = [];
    // array of authors
    vm.pages = [[]]; // one empty page
    Authors.getAll()
    .then(function(data) {
      // slice() i.e. copy data is mandatory here!
      vm.response = data.slice();
      reload(data); // because after reload 'data' will be empty
      vm.setCurrentPage(0); // first page
    }, function(err) {
      console.log("Error " + err);
    });
    // fill up columns names
    vm.columns = AUTHORS_HEADERS;
  }
  // === Start module ===
  init();
  // === Public ===
  // select current page
  vm.setCurrentPage = function(index) {
    vm.pageIndex = index; // save current page index
    vm.currentPage = vm.pages[index];
  }
  vm.goSearch = function(query) {
    var query = vm.searchQuery;
    if (query === undefined) query = "";
    var filtered = [];
    for (var i = 0; i < vm.response.length; i++) {
      var obj = vm.response[i];
      // filter author by name
      if (obj.name.indexOf(query) !== -1) {
        filtered.push(obj);
      }
    }
    reload(filtered);
    // return to first page
    vm.setCurrentPage(0);
  }
});
