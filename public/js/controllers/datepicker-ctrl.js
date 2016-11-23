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
  $scope.today = function() {
    $scope.date = new Date();
  }
  // === Start module ===
  $scope.today();
  // === Public ===
  $scope.clear = function() {
    $scope.date = null;
  }
  $scope.open = function($event) {
    $scope.status.opened = true;
  }
  $scope.setDate = function(year, month, day) {
    $scope.date = new Date(year, month, day);
  }
});
