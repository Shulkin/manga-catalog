angular.module("manga.datepicker.ctrl", [])
.controller("YearPickerCtrl", function(
  SeriesInfo, // service to pass data to SeriesInfoCtrl
  $scope) { // use scope to control view
  // === Variables ===
  // bind to variable year from SeriesInfo
  $scope.year = SeriesInfo.date.year;
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
    console.log("YearPickerCtrl.init()");
    // create date
    $scope.date = new Date();
    // get year from SeriesInfo service
    $scope.date.setFullYear($scope.year);
    // month, day, etc. is not important!
    console.log("Set date " + $scope.date.getFullYear());
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
    console.log("Date year is changed " + year);
    $scope.date = new Date(year, month, day);
    console.log("Prepare to save year in SeriesInfo " + $scope.date.getFullYear());
    // this will change vm.year in SeriesInfoCtrl
    SeriesInfo.date.year = $scope.date.getFullYear();
  }
});
