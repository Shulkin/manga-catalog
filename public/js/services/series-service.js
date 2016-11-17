angular.module("series.service", [])
.factory("Series", function(SeriesMock, $http) {
  return {
    getAll: function() {
      //return $http.get("/api/series");
      return SeriesMock.createList(10);
    },
    get: function(id) {
      return SeriesMock.createManga(id);
      //return $http.get("/api/series/" + id);
    }
  };
});
