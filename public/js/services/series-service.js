angular.module("series.service", [])
.factory("Series", function(
  MOCK, // global config variable, do we need to use mock data?
  MOCK_SERIES_COUNT, // how many mock series generate
  SeriesMock, $http) {
  // === Private ===
  return {
    getAll: function() {
      // use 'then' in $http to get rid of success/error handlers
      return $http.get("/api/series").then(function(response) {
        // swap response.data with generated mock data
        if (MOCK) return SeriesMock.createList(MOCK_SERIES_COUNT)
        else
          // still need to wait for answer from server
          return response.data;
      });
    },
    get: function(id) {
      return $http.get("/api/series/" + id).then(function(response) {
        if (MOCK) return SeriesMock.createManga(id)
        else return response.data;
      });
    }
  };
});
