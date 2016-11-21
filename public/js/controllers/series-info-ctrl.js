angular.module("series.info.ctrl", [])
.controller("SeriesInfoCtrl", function(
  Genres, // genres service
  Series, // series service
  $stateParams) {
  // === Variables ===
  var vm = this;
  // receive manga id from url
  var id = $stateParams.id;
  // === Private ===
  function initEditing() {
    vm.editing = new Object();
    vm.editing['title'] = false;
    vm.editing['description'] = false;
  }
  // constructor
  function init() {
    Series.get(id)
    .then(function(manga) {
      vm.title = manga.title;
      vm.description = manga.description;
      vm.genreString = Genres.toString(manga.genre);
      vm.author = manga.author;
      vm.year = manga.year;
    }, function(err) {
      console.log("Error " + err);
    });
    initEditing();
  }
  // === Start module ===
  init();
  // === Public ===
  vm.edit = function(field) {
    alert("Edit field '" + field + "' in Manga '" + vm.title + "'");
    vm.editing[field] = true;
    // focus input on edit
    angular.element('#' + field).focus();
  }
  vm.isEdit = function(field) {
    return vm.editing[field];
  }
  vm.confirmChange = function(field) {
    alert("Change confirmed!");
    vm.editing[field] = false;
  }
});
