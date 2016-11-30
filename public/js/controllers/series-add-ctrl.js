angular.module("series.add.ctrl", [])
.controller("SeriesAddCtrl", function(
  Genres, Authors) {
  // === Variables ===
  var vm = this;
  vm.yearFormat = 'yyyy'; // year-only
  vm.dateOptions = {
    formatYear: 'yyyy',
    startingDay: 1,
    minMode: 'year'
  };
  // === Private ===
  function getAllGenres(callback) {
    Genres.getAll()
    .then(function(list) {
      callback(list);
    }, function(err) {
      console.log("Error " + err);
    });
  }
  function getAllAuthors(callback) {
    Authors.getAll()
    .then(function(list) {
      callback(list);
    }, function(err) {
      console.log("Error " + err);
    });
  }
  // constructor
  function init() {
    console.log("SeriesAddCtrl.init()");
    // init all models
    vm.title = "";
    vm.description = "";
    vm.date = new Date();
    vm.genre = [];
    // load all genres
    vm.allGenres = [];
    getAllGenres(function(data) {
      vm.allGenres = data;
    });
    // load all authors
    vm.allAuthors = [];
    getAllAuthors(function(data) {
      vm.allAuthors = data;
      // get first authors as default
      if (vm.allAuthors.length > 0) {
        vm.authorId = vm.allAuthors[0]._id;
      }
    });
  }
  // === Start module ===
  init();
  // === Public ===
  vm.save = function() {
    console.log("SeriesAddCtrl.save()");
  }
});
