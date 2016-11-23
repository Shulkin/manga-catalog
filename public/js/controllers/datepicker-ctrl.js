angular.module("manga.datepicker.ctrl", [])
.controller("YearPickerCtrl", function(
  SeriesInfo, // service to pass data to SeriesInfoCtrl
  $scope) {
  // === Variables ===
  // set date format to year-only
  $scope.formats = ['yyyy'];
  $scope.format = $scope.formats[0];
  // options
  $scope.dateOptions = {
    formatYear: 'yyyy',
    startingDay: 1,
    minMode: 'year'
  };
  // closed by default
  $scope.status = {
    opened: false
  };
  // === Private ===
  // constructor
  $scope.init = function() {
    $scope.date = new Date();
    // init year from intermediate service
    var year = SeriesInfo.getYear();
    $scope.date.setFullYear(year);
    // month, day, etc. is not important!
  }
  // === Start module ===
  $scope.init();
  // === Public ===
  $scope.clear = function() {
    $scope.date = null;
  }
  $scope.open = function($event) {
    $scope.status.opened = true;
  }
  $scope.setDate = function(year, month, day) {
    $scope.date = new Date(year, month, day);
    // save year to service on change date in controller
    SeriesInfo.setYear($scope.date.getFullYear());
  }
});
