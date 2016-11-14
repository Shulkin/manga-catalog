angular.module("authors.ctrl", [])
.controller("AuthorsCtrl", function(
  Authors) { // authors service
  // === Variables ===
  var vm = this;
  // === Private ===
  // constructor
  function init() {
    vm.list = []; // array of authors
  }
  // === Start module ===
  init();
  // === Public ===
});
