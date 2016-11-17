angular.module("authors.ctrl", [])
.value("AUTHORS_HEADERS", ["Name", "Series", "Most Numerous Genre"])
.controller("AuthorsCtrl", function(
  AUTHORS_HEADERS, // columns names
  Authors) { // authors service
  // === Variables ===
  var vm = this;
  // === Private ===
  // constructor
  function init() {
    vm.list = []; // array of authors
    Authors.getAll()
    .success(function(data) {
      vm.list = data;
      // create new field for most used genres in author's works
      for (var i = 0; i < vm.list.length; i++) {
        // select only 5 most used genres!
        vm.list[i].mostNumerousGenre =
          Authors.getMostNumerousGenre(vm.list[i], 5);
      }
    })
    .error(function(err) {
      console.log("Error " + err)
    });
    // fill up columns names
    vm.columns = AUTHORS_HEADERS;
  }
  // === Start module ===
  init();
  // === Public ===
});
