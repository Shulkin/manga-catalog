angular.module("authors.ctrl", [])
.value("HEADERS", ["Name", "Series", "Genres"])
.controller("AuthorsCtrl", function(
  HEADERS, // columns names
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
    })
    .error(function(err) {
      console.log("Error " + err)
    });
    // fill up columns names
    vm.columns = HEADERS;
  }
  // === Start module ===
  init();
  // === Public ===
});
