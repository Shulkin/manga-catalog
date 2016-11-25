angular.module("manga.datepicker.ctrl", [])
.controller("YearPickerCtrl", function(
  SeriesInfo, // service to share date with SeriesInfoCtrl
  $scope) { // use scope to control view
  // === Variables ===
  // set date format to year-only
  $scope.formats = ['yyyy'];
  $scope.format = $scope.formats[0];
  // date options
  $scope.dateOptions = {formatYear: 'yyyy', startingDay: 1, minMode: 'year'};
  // closed by default
  $scope.status = {opened: false};
  // === Private ===
  // constructor
  $scope.init = function() {
    console.log("YearPickerCtrl.init()");
    // create date
    $scope.date = new Date();
    // get year from SeriesInfo
    $scope.year = SeriesInfo.getYear();
    console.log("[YearPickerCtrl.init] $scope.year = " + $scope.year);
    // set year to calendar
    $scope.date.setFullYear($scope.year);
    // month, day, etc. is not important!
    console.log("[YearPickerCtrl.init] $scope.date.fullYear = " + $scope.date.getFullYear());
  }
  // === Start module ===
  $scope.init();
  // === Handlers ===
  // catch data change event from SeriesInfoCtrl
  $scope.$on("SharedYear", function() {
    console.log("YearPickerCtrl.$on('SharedYear')");
    $scope.year = SeriesInfo.getYear();
    console.log("[YearPickerCtrl.$on('SharedYear')] $scope.year = " + $scope.year);
    // set year to $scope.date through temp variable
    var today = new Date();
    today.setFullYear($scope.year);
    $scope.date = today;
    console.log("[YearPickerCtrl.$on('year_shared')] $scope.date.fullYear = " + $scope.date.getFullYear());
  });
  // === Public ===
  // watch for changes in input elements
  $scope.changeDate = function() {
    console.log("YearPickerCtrl.changeYear()");
    $scope.year = $scope.date.getFullYear();
    SeriesInfo.setYear($scope.year);
    console.log("[YearPickerCtrl.changeYear] SeriesInfo.data.year = " + SeriesInfo.getYear());
  }
  $scope.clear = function() {
    $scope.date = null;
  }
  $scope.open = function($event) {
    $scope.status.opened = true;
  }
});
