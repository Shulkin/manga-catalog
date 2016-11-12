angular.module("news.service", [])
.factory("News", function(NewsMock) {
  return {
    getAll: function() {
      return NewsMock.createList(3);
    }
  };
});
