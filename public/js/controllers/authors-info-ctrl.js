angular.module("authors.info.ctrl", [])
.controller("AuthorsInfoCtrl", function(
  Authors, // authors service
  $stateParams) {
  // === Variables ===
  var vm = this;
  // receive author id from url
  var id = $stateParams.id;
  // === Private ===
  // constructor
  function init() {
    Authors.get(id)
    .success(function(author) {
      vm.name = author.name;
      vm.gender = author.gender;
      vm.birthDate = author.birthDate;
      vm.series = author.series;
    })
    .error(function(err) {
      console.log("Error " + err);
    })
  }
  // === Start module ===
  init();
  // === Public ===
});
