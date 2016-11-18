angular.module("series.service", [])
.factory("Series", function(
  MOCK, // global config variable, do we need to use mock data?
  MOCK_SERIES_COUNT, // how many mock series generate
  SeriesMock, $http) {
  // === Private ===
  return {
    getAll: function() {
      if (MOCK) {
        return new Promise(function(resolve, reject) {
          resolve(SeriesMock.createList(MOCK_SERIES_COUNT));
        });
      } else {
        return $http.get("/api/series").then(function(response) {
          return response.data;
        });
      }
    },
    get: function(id) {
      if (MOCK) {
        return new Promise(function(resolve, reject) {
          resolve(SeriesMock.createManga(id));
        });
      } else {
        return $http.get("/api/series/" + id).then(function(response) {
          return response.data;
        });
      }
    }
  };
});
