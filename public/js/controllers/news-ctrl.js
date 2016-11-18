angular.module("news.ctrl", [])
.controller("NewsCtrl", function(
  News) { // news service
  // === Variables ===
  var vm = this; // store 'this'
  // === Private ===
  // constructor
  function init() {
    vm.list = []; // array of news
    News.getAll()
    .then(function(data) {
      vm.list = data;
    }, function(err) {
      console.log("Error " + err);
    });
  }
  // === Start module ===
  init();
  // === Public ===
});
