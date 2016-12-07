angular.module("authors.info.ctrl", [
  // inject datepicker module
  "manga.datepicker.ctrl" // DatePickerCtrl
])
.controller("AuthorsInfoCtrl", [
  "SERIES_COLUMNS", "Auth", "Genres", "Authors",
  "AuthorsInfo", "$stateParams", function(
  SERIES_COLUMNS, // from series controller
  Auth, // expose isLoggedIn
  Genres, // genres service
  Authors, // authors service
  AuthorsInfo, // share data with DatePickerCtrl
  $stateParams) {
  // === Variables ===
  var vm = this;
  // receive author id from url
  var id = $stateParams.id;
  // === Private ===
  function resetFlags() {
    vm.editing = {};
  }
  // reload author
  function reload() {
    Authors.get(id)
    .then(function(author) {
      vm.name = author.name;
      vm.gender = author.gender;
      vm.birthDate = author.birthDate;
      vm.series = author.series;
      // send year to DatePickerCtrl through AuthorsInfo
      AuthorsInfo.setBirthDate(vm.birthDate);
      AuthorsInfo.shareBirthDate();
      // show all genres in authors series
      vm.allGenres = Authors.getAllGenres(author);
      // column headers for manga table
      vm.seriesColumns = SERIES_COLUMNS;
    }, function(err) {
      console.log("Error " + err);
    });
  }
  function saveAll() {
    vm.birthDate = AuthorsInfo.getBirthDate();
    var author = {
      name: vm.name,
      gender: vm.gender,
      birthDate: vm.birthDate
      // anything else is unnecessary!
    };
    Authors.update(id, author)
    .then(function() {
      reload();
    }, function(err) {
      console.log("Error " + err);
    });
  }
  // constructor
  function init() {
    reload();
    resetFlags();
  }
  // === Start module ===
  init();
  // === Public ===
  // check if user is logged in
  vm.isUserLoggedIn = Auth.isLoggedIn;
  // represent author's works genre as string
  vm.genreToString = function(genre) {
    return Genres.toString(genre);
  };
  vm.edit = function(field) {
    vm.editing[field] = true;
  };
  vm.isEdit = function(field) {
    // check if key 'field' in Object and Object[key] == true
    return (field in vm.editing && vm.editing[field]);
  };
  vm.save = function(field) {
    saveAll();
    resetFlags();
  };
}]);
