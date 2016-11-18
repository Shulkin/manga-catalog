angular.module("news.service", [])
.factory("News", function(NewsMock, $http) {
  return {
    getAll: function() {
      // call $http empty api, response is null
      return $http.get("").then(function(response) {
        // return mock news list by default
        return NewsMock.createList(3);
      });
    }
  };
});
