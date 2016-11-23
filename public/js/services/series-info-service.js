angular.module("series.info.service", [])
/*
 * This is special factory to pass data from nested controllers in
 * series-info view to global series-info controller
 */
.factory("SeriesInfo", function() {
  var year;
  return {
    setYear: function(value) {
      year = value;
    },
    getYear: function() {
      return year;
    }
  };
});
