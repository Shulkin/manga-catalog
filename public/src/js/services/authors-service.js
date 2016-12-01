angular.module("authors.service", [])
.factory("Authors", [
  "MOCK", "MOCK_AUTHORS_COUNT",
  "AuthorsMock", "$http", function(
  MOCK,
  MOCK_AUTHORS_COUNT,
  AuthorsMock, $http) {
  // === Private ===
  function getAllGenresAppearance(author) {
    var allUsed = new Object();
    var series = author.series;
    // look through all genres in all mangas of this author
    for (var i = 0; i < series.length; i++) {
      var genre = series[i].genre;
      for (var j = 0; j < genre.length; j++) {
        // count the number of appearance
        var key = genre[j].name; // by genre name
        if (!(key in allUsed)) allUsed[key] = 0;
        allUsed[key]++;
      }
    }
    return allUsed;
  }
  // === Public ===
  return {
    getAll: function() {
      if (MOCK) {
        return new Promise(function(resolve, reject) {
          resolve(AuthorsMock.createList(MOCK_AUTHORS_COUNT));
        });
      } else {
        return $http.get("/api/authors").then(function(response) {
          return response.data;
        });
      }
    },
    create: function(data) {
      return $http.post("api/authors", data).then(function(response) {
        return response.data;
      });
    },
    get: function(id) {
      if (MOCK) {
        return new Promise(function(resolve, reject) {
          resolve(AuthorsMock.createAuthor(id));
        });
      } else {
        return $http.get("/api/authors/" + id).then(function(response) {
          return response.data;
        });
      }
    },
    update: function(id, data) {
      return $http.put("/api/authors/" + id, data).then(function(response) {
        return response.data;
      });
    },
    addManga: function(id, mangaId) {
      var data = {id: mangaId};
      return $http.put("/api/authors/" + id + "/manga", data).then(function(response) {
        return response.data;
      });
    },
    deleteManga: function(id, mangaId) {
      return $http.delete("/api/authors/" + id + "/manga/" + mangaId).then(function(response) {
        return response.data;
      });
    },
    getMostNumerousGenre: function(author, maxNumber) {
      var allUsed = getAllGenresAppearance(author);
      // sort genres by appearance count
      var sorted = Object.keys(allUsed).sort((a, b) => allUsed[b] - allUsed[a]);
      var mostUsed = sorted.slice(0, maxNumber); // first N most used genres
      // return elements separated by comma
      return mostUsed.join(", ");
    },
    getAllGenres: function(author) {
      var allUsed = getAllGenresAppearance(author);
      // print all genres with number of appearance
      var allGenres = [];
      for (var key in allUsed) {
        allGenres.push(key + ' (' + allUsed[key] + ')');
      }
      return allGenres.join(", ");
    }
  };
}]);
