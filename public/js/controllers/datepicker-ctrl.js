angular.module("manga.datepicker.ctrl", [])
// basic controller to pick authors birthday
.controller("DatePickerCtrl", function(
  AuthorsInfo, // share date with AuthorsInfoCtrl
  $scope) {
  // === Variables ===
  $scope.formats = ['dd-MMMM-yyyy'];
  $scope.format = $scope.formats[0];
  $scope.status = {opened: false};
  // === Private ===
  // constructor
  $scope.init = function() {
    $scope.date = AuthorsInfo.getBirthDate();
  }
  // === Start module ===
  $scope.init();
  // === Handlers ===
  $scope.$on("SharedBirthDate", function() {
    $scope.date = AuthorsInfo.getBirthDate();
  });
  // === Public ===
  $scope.changeDate = function() {
    AuthorsInfo.setBirthDate($scope.date);
  }
  $scope.clear = function() {
    $scope.date = null;
  }
  $scope.open = function($event) {
    $scope.status.opened = true;
  }
})
// more complex controller to select year only
.controller("YearPickerCtrl", function(
  SeriesInfo, // service to share year with SeriesInfoCtrl
  $scope) { // use scope to control view
  // === Variables ===
  // set date format to year-only
  $scope.formats = ['yyyy'];
  $scope.format = $scope.formats[0];
  // date options
  $scope.dateOptions = {
    formatYear: 'yyyy',
    startingDay: 1,
    minMode: 'year'
  };
  // closed by default
  $scope.status = {opened: false};
  // === Private ===
  // constructor
  $scope.init = function() {
    // create date
    $scope.date = new Date();
    // get year from SeriesInfo
    $scope.year = SeriesInfo.getYear();
    // set year to calendar
    $scope.date.setFullYear($scope.year);
    // month, day, etc. is not important!
  }
  // === Start module ===
  $scope.init();
  // === Handlers ===
  // catch data change event from SeriesInfoCtrl
  $scope.$on("SharedYear", function() {
    $scope.year = SeriesInfo.getYear();
    // set year to $scope.date through temp variable
    var today = new Date();
    today.setFullYear($scope.year);
    $scope.date = today;
  });
  // === Public ===
  // watch for changes in input elements
  $scope.changeDate = function() {
    $scope.year = $scope.date.getFullYear();
    SeriesInfo.setYear($scope.year);
  }
  $scope.clear = function() {
    $scope.date = null;
  }
  $scope.open = function($event) {
    $scope.status.opened = true;
  }
});
