angular.module("series.add.ctrl", [])
.controller("SeriesAddCtrl", function(
  Genres, Authors, Series, $state) {
  // === Variables ===
  var vm = this;
  vm.format = 'yyyy'; // year-only
  vm.options = {
    formatYear: 'yyyy',
    startingDay: 1,
    minMode: 'year'
  };
  vm.status = {opened: false};
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
    // init all models
    vm.title = "";
    vm.description = "";
    vm.date = new Date();
    vm.genre = [];
    // load all genres
    vm.allGenres = [];
    getAllGenres(function(data) {
      vm.allGenres = data;
      if (vm.allGenres.length > 0) {
        vm.newGenre = vm.allGenres[0]._id;
      }
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
  vm.open = function($event) {
    vm.status.opened = true;
  }
  vm.addGenre = function(genreId) {
    var obj = {_id: genreId}; // without name
    // search genre name in allGenres array
    for (var i = 0; i < vm.allGenres.length; i++) {
      if (vm.allGenres[i]._id === genreId) {
        obj = { // fill all fields
          _id: vm.allGenres[i]._id,
          name: vm.allGenres[i].name
        }; // find only first entry
        break;
      }
    }
    vm.genre.push(obj);
  }
  vm.removeGenre = function(genreId) {
    var i = vm.genre.length;
    while (i--) { // loop backwards
      if (vm.genre[i]._id === genreId) {
        vm.genre.splice(i, 1);
      }
    }
  }
  vm.save = function() {
    console.log("SeriesAddCtrl.save()");
    var data = {
      title: vm.title,
      description: vm.description,
      year: vm.date.getFullYear(),
      genre: Genres.extractIds(vm.genre),
      author: vm.authorId
    };
    console.log("[SeriesAddCtrl.save] manga = " + JSON.stringify(data));
    Series.create(data)
    .then(function(manga) {
      console.log("[Success! Create new manga] manga = " + JSON.stringify(manga));
      // add new manga to authors list
      Authors.addManga(vm.authorId, manga._id)
      .then(function(author) {
        // return to series table
        $state.go("series");
      }, function(err) {
        console.log("Error " + err);
      });
    }, function(err) {
      console.log("Error " + err);
    });
  }
});
