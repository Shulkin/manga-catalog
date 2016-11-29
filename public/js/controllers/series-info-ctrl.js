angular.module("series.info.ctrl", [
  // inject module with datepicker controller
  "manga.datepicker.ctrl" // use YearPickerCtrl in view
])
.controller("SeriesInfoCtrl", function(
  Genres, // genres service
  Series, // series service
  Authors, // authors service
  SeriesInfo, // share data with YearPickerCtrl
  $stateParams) {
  // === Variables ===
  var vm = this;
  // receive manga id from url
  var id = $stateParams.id;
  // === Private ===
  function resetFlags() {
    vm.editing = new Object();
  }
  function getAllAuthors() {
    vm.allAuthors = [];
    Authors.getAll()
    .then(function(list) {
      vm.allAuthors = list;
    }, function(err) {
      console.log("Error " + err);
    });
  }
  function getAllGenres() {
    vm.allGenres = [];
    Genres.getAll()
    .then(function(list) {
      vm.allGenres = list;
      // init new genre model
      vm.newGenre = list[0]._id;
    }, function(err) {
      console.log("Error " + err);
    });
  }
  function changeAuthor(prevId, newId) {
    // id of this manga
    var mangaId = vm._id;
    // delete manga from the list of previous author
    Authors.deleteManga(prevId, mangaId)
    .then(function(author) { // do nothing
    }, function(err) {
      console.log("Error " + err);
    });
    // add manga to new author series list
    Authors.addManga(newId, mangaId)
    .then(function(author) { // do nothing
    }, function(err) {
      console.log("Error " + err);
    });
  }
  // reload current manga
  function reload() {
    Series.get(id)
    .then(function(manga) {
      vm._id = manga._id;
      vm.title = manga.title;
      vm.description = manga.description;
      vm.genre = manga.genre;
      vm.author = manga.author;
      vm.year = manga.year;
      // send year to YearPickerCtrl through SeriesInfo service
      SeriesInfo.setYear(vm.year); // set value
      SeriesInfo.shareYear(); // share by $broadcast
      // save author id
      vm.authorId = vm.author._id;
      // convert genres to string
      vm.genreString = Genres.toString(manga.genre);
    }, function(err) {
      console.log("Error " + err);
    });
  }
  function saveAll() {
    // get year from YearPickerCtrl
    vm.year = SeriesInfo.getYear();
    if (vm.author._id !== vm.authorId) {
      // change author if necessary
      changeAuthor(
        vm.author._id, // previous
        vm.authorId // new one
      );
    }
    // fill all manga fields
    var manga = {
      title: vm.title,
      description: vm.description,
      // get rid of populated objects
      genre: Genres.extractIds(vm.genre),
      // user may change authorId
      author: vm.authorId,
      year: vm.year
    };
    Series.update(id, manga)
    .then(function() {
      // reload to get properly populated fields
      reload();
    }, function(err) {
      console.log("Error " + err);
    });
  }
  // constructor
  function init() {
    reload(); // load manga data on start
    getAllGenres(); // load list of all genres
    getAllAuthors(); // load info about all authors
    resetFlags(); // delete all previous edit flags
  }
  // === Start module ===
  init();
  // === Public ===
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
  vm.edit = function(field) {
    vm.editing[field] = true;
  }
  vm.isEdit = function(field) {
    // check if key 'field' in Object and Object[key] == true
    return (field in vm.editing && vm.editing[field]);
  }
  vm.save = function(field) {
    saveAll();
    resetFlags();
  }
});
