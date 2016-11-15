angular.module("genres.service", [])
.factory("Genres", function($http) {
  return {
    getAll: function() {
      return $http.get("/api/genres");
    },
    get: function(id) {
      return $http.get("/api/genres/" + id);
    }
  };
});
