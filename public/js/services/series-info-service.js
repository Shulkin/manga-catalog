angular.module("series.info.service", [])
/*
 * This is special factory to pass data from nested controllers in
 * series-info view to global series-info controller
 */
.factory("SeriesInfo", function() {
  return {
    // this is binded to both SeriesInfoCtrl and YearPickerCtrl
    date: {
      // change will be reflected in both controllers
      year : 1999 // some default number
    }
  }
});
