angular.module("series.service", [])
.factory("Series", function($http) {
  return {
    getAll: function() {
      return $http.get("/api/series");
    },
    get: function(id) {
      return $http.get("/api/series/" + id);
    }
  };
});
