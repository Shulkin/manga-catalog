angular.module("authors.mock", [])
.factory("AuthorsMock", function() {
  return {
    createList: function(count) {
      return [];
    },
    createAuthor: function(id) {
      return {};
    }
  };
});
