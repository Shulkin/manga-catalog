angular.module("series.info.service", [])
/*
 * This is special factory to share
 * data between controllers
 */
.factory("SeriesInfo", function($rootScope) {
  return {
    data: {
      // share between SeriesInfoCtrl and YearPickerCtrl
      year : 2007 // some default number
    },
    getYear: function() {
      return this.data.year;
    },
    setYear: function(year) {
      this.data.year = year;
    },
    // share data through $broadcast
    shareYear: function() {
      console.log("SeriesInfo.shareYear()");
      console.log("[SeriesInfo.shareYear] this.data.year = " + this.getYear());
      // fire notify event
      $rootScope.$broadcast("SharedYear");
    }
  };
});
