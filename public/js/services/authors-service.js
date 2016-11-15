angular.module("authors.service", [])
.factory("Authors", function($http) {
  return {
    getAll: function() {
      return $http.get("/api/authors");
    },
    get: function(id) {
      return $http.get("/api/authors/" + id);
    }
  };
});
