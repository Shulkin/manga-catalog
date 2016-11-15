angular.module("authors.ctrl", [])
.value("AUTHORS_HEADERS", ["Name", "Series", "Most Numerous Genre"])
.controller("AuthorsCtrl", function(
  AUTHORS_HEADERS, // columns names
  Authors) { // authors service
  // === Variables ===
  var vm = this;
  // === Private ===
  function getMostNumerousGenre(author) {
    return "test";
  }
  // constructor
  function init() {
    vm.list = []; // array of authors
    Authors.getAll()
    .success(function(data) {
      vm.list = data;
      for (var i = 0; i < vm.list.length; i++) {
        vm.list[i].mostNumerousGenre = getMostNumerousGenre(vm.list[i]);
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
