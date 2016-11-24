angular.module("manga.datepicker.ctrl", [])
.controller("YearPickerCtrl", function(
  SeriesInfo, // service to share date with SeriesInfoCtrl
  $scope) { // use scope to control view
  // === Variables ===
  // set date format to year-only
  /*
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
  */
  // === Private ===
  // constructor
  $scope.init = function() {
    console.log("YearPickerCtrl.init()");
    // bind to variable year from SeriesInfo
    $scope.year = SeriesInfo.getYear();
    console.log("[YearPickerCtrl.init] $scope.year = " + $scope.year);
    /*
    // create date
    $scope.date = new Date();
    // get year from SeriesInfo service
    $scope.date.setFullYear($scope.year);
    // month, day, etc. is not important!
    console.log("Set date " + $scope.date.getFullYear());
    */
  }
  // === Start module ===
  $scope.init();
  // === Handlers ===
  // catch data change event from SeriesInfoCtrl
  $scope.$on("year_shared", function() {
    console.log("YearPickerCtrl.$on('year_shared')");
    $scope.year = SeriesInfo.getYear();
    console.log("[YearPickerCtrl.$on('year_shared')] $scope.year = " + $scope.year);
  });
  // === Public ===
  // watch for changes in input elements
  $scope.changeYear = function() {
    console.log("YearPickerCtrl.changeYear()");
    SeriesInfo.setYear($scope.year);
    console.log("[YearPickerCtrl.changeYear] SeriesInfo.data.year = " + SeriesInfo.getYear());
  }
  /*
  $scope.confirm = function() {
    console.log("YearPickerCtrl.confirm()");
    SeriesInfo.setYear($scope.year);
    console.log("[YearPickerCtrl.confirm] SeriesInfo.data.year = " + SeriesInfo.getYear());
  }
  */
  /*
  $scope.clear = function() {
    //$scope.date = null;
  }
  $scope.open = function($event) {
    //$scope.status.opened = true;
  }
  $scope.setDate = function(year, month, day) {
    console.log("Date year is changed " + year);
    $scope.date = new Date(year, month, day);
    console.log("Prepare to save year in SeriesInfo " + $scope.date.getFullYear());
    // this will change vm.year in SeriesInfoCtrl
    SeriesInfo.date.year = $scope.date.getFullYear();
    console.log("SeriesInfo.date.year = " + SeriesInfo.date.year);
  }
  */
});
