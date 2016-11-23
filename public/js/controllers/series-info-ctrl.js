angular.module("series.info.ctrl", [
  // inject module with datepicker controller
  "manga.datepicker.ctrl" // use YearPickerCtrl in view
])
.controller("SeriesInfoCtrl", function(
  Genres, // genres service
  Series, // series service
  SeriesInfo, // receive data from minor nested controllers in view
  $stateParams) {
  // === Variables ===
  var vm = this;
  // receive manga id from url
  var id = $stateParams.id;
  // === Private ===
  function resetFlags() {
    vm.editing = new Object();
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
    }, function(err) {
      console.log("Error " + err);
    });
  }
  function saveAll() {
    // fill all manga fields
    var manga = {
      title: vm.title,
      description: vm.description,
      // get rid of populated objects
      genre: Genres.extractIds(vm.genre),
      // we need to save only ids
      author: vm.author._id,
      year: vm.year
    };
    Series.update(id, manga)
    .then(function() {
      // reload to get properly populated fields
      reload();
    }, function(err) {
      console.log("Error " + err);
    })
  }
  // constructor
  function init() {
    reload(); // load data on start
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
    saveAll();
    resetFlags();
  }
});
