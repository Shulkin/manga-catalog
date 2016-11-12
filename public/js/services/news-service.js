angular.module("news.service", [])
.factory("News", function(NewsMock, $http) {
  return {
    getAll: function() {
      return NewsMock.createList(5);
    }
  };
});
