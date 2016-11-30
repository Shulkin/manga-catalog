angular.module("authors.add.ctrl", [])
.controller("AuthorsAddCtrl", function() {
  // === Variables ===
  var vm = this;
  vm.format = 'dd-MMMM-yyyy';
  vm.status = {opened: false};
  // === Private ===
  // constructor
  function init() {
    console.log("SeriesAddCtrl.init()");
    vm.name = "";
    vm.date = new Date(); // birth date
    vm.gender = "Male";
  }
  // === Start module ===
  init();
  // === Public ===
  vm.open = function($event) {
    vm.status.opened = true;
  }
  vm.save = function() {
    console.log("AuthorsAddCtrl.save()");
    var author = {
      name: vm.name,
      birthDate: vm.date,
      gender: vm.gender
    };
    console.log("[AuthorsAddCtrl.save] manga = " + JSON.stringify(author));
  }
});
