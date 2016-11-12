angular.module("news.ctrl", [])
.controller("NewsCtrl", function(
  News) { // news service
  // === Variables ===
  var vm = this; // store 'this'
  // === Private ===
  // constructor
  function init() {
    vm.list = []; // array of news
    vm.list = News.getAll();
  }
  // === Start module ===
  init();
  // === Public ===
});
