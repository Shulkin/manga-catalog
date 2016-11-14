angular.module("series.service", [])
.factory("Series", function($http) {
  return {
    getAll: function() {
      return $http.get("/api/series");
    }
  };
});
