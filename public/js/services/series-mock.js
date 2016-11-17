angular.module("series.mock", [])
.factory("SeriesMock", function() {
  return {
    createList: function(count) {
      var result = [];
      for (var i = 0; i < count; i++) {
        var obj = {
          // generated _ids must be unique
          _id: "series_1",
          title: "Title",
          description: "Bla-bla-bla...",
          year: 1999,
          // simulate populate from Mongo find function
          genre: [{_id: "genre_1", name: "Action"}, {_id: "genre_2", name: "Horror"}],
          // don't need to go deep population here
          author: "author_1" // authors id is enough
        };
        result.push(obj);
      }
      return result;
    }
  };
});
