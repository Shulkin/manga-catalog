angular.module("series.info.ctrl", [
  // inject module with datepicker controller
  "manga.datepicker.ctrl" // use YearPickerCtrl in view
])
.controller("SeriesInfoCtrl", function(
  Genres, // genres service
  Series, // series service
  $stateParams) {
  // === Variables ===
  var vm = this;
  // receive manga id from url
  var id = $stateParams.id;
  // === Private ===
  function initEdit() {
    vm.editing = new Object();
    vm.editing['title'] = false;
    vm.editing['description'] = false;
    vm.editing['year'] = false;
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
    alert("saveAll: " + manga);
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
    reload();
    initEdit();
  }
  // === Start module ===
  init();
  // === Public ===
  vm.edit = function(field) {
    alert("Start edit field '" + field + "' in Manga '" + vm.title + "'");
    vm.editing[field] = true;
    // focus on the edited input
    angular.element('#' + field).focus();
  }
  vm.isEdit = function(field) {
    return vm.editing[field];
  }
  vm.save = function(field) {
    alert("Change confirmed!");
    saveAll();
    vm.editing[field] = false;
  }
});
