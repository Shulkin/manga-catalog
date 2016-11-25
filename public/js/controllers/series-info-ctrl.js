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
  function loadAuthorsList() {
    vm.allAuthors = [];
    Authors.getAll()
    .then(function(list) {
      vm.allAuthors = list;
    }, function(err) {
      console.log("Error " + err);
    })
  }
  // reload current manga
  function reload() {
    Series.get(id)
    .then(function(manga) {
      vm.title = manga.title;
      vm.description = manga.description;
      vm.genre = manga.genre; // save for use later
      vm.genreString = Genres.toString(manga.genre);
      vm.author = manga.author;
      vm.year = manga.year;
      // send year to YearPickerCtrl through SeriesInfo service
      SeriesInfo.setYear(vm.year); // set value
      SeriesInfo.shareYear(); // share by $broadcast
      // save author id to variable
      vm.authorId = vm.author._id;
    }, function(err) {
      console.log("Error " + err);
    });
  }
  function saveAll() {
    // console.log("SeriesInfoCtrl.saveAll()");
    // get year from YearPickerCtrl
    vm.year = SeriesInfo.getYear();
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
    // console.log("[SeriesInfoCtrl.saveAll] manga = " + JSON.stringify(manga));
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
    loadAuthorsList(); // load info about all authors
    resetFlags(); // delete all previous edit flags
  }
  // === Start module ===
  init();
  // === Public ===
  vm.edit = function(field) {
    vm.editing[field] = true;
  }
  vm.isEdit = function(field) {
    // check if key 'field' in Object and Object[key] == true
    return (field in vm.editing && vm.editing[field]);
  }
  vm.save = function(field) {
    if (field === "author") {
      /*
       * Some code to properly add/delete manga
       * in authors list, when we change author
       * of the series
       */
    }
    saveAll();
    resetFlags();
  }
});
