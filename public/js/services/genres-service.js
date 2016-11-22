angular.module("genres.service", [])
.factory("Genres", function($http) {
  return {
    getAll: function() {
      return $http.get("/api/genres");
    },
    get: function(id) {
      return $http.get("/api/genres/" + id);
    },
    // convert array of genres to string
    toString: function(genre) {
      var result = "";
      for (var i = 0; i < genre.length; i++) {
        result += genre[i].name;
        if (i < genre.length - 1) result += ", ";
      }
      return result;
    },
    // get ids from array of genres
    extractIds: function(genre) {
      var result = [];
      for (var i = 0; i < genre.length; i++) {
        result.push(genre[i]._id);
      }
      return result;
    }
  };
});
