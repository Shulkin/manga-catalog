angular.module("authors.add.ctrl", [])
.controller("AuthorsAddCtrl", function(
  Authors, $state) {
  // === Variables ===
  var vm = this;
  vm.format = 'dd-MMMM-yyyy';
  vm.status = {opened: false};
  // === Private ===
  // constructor
  function init() {
    vm.name = "";
    vm.gender = "Male";
    vm.date = new Date(); // birth date
  }
  // === Start module ===
  init();
  // === Public ===
  vm.open = function($event) {
    vm.status.opened = true;
  }
  vm.save = function() {
    var data = {
      name: vm.name,
      gender: vm.gender,
      birthDate: vm.date,
      series: [] // empty
    };
    Authors.create(data)
    .then(function(author) {
      // return to authors table
      $state.go("authors");
    }, function(err) {
      console.log("Error " + err);
    });
  }
});
