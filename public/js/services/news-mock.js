angular.module("news.mock", [])
.value("NEWS_TITLES", [
  "This is first title",
  "This is second title"
])
.value("USERS", ["admin", "user"])
.factory("NewsMock", function(NEWS_TITLES, USERS, Utilities) {
  return {
    createList: function(count) {
      var result = [];
      for (var i = 0; i < count; i++) {
        var obj = {
          title: NEWS_TITLES[Utilities.randomInt(0, NEWS_TITLES.length - 1)],
          body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
          author: USERS[Utilities.randomInt(0, USERS.length - 1)],
          date: new Date()
        }
        result.push(obj);
      }
      return result;
    }
  };
});
