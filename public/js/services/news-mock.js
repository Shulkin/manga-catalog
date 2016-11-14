angular.module("news.mock", [])
.value("TITLES", [
  "This is first title",
  "This is second title"
])
.value("TEXTS", [
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit"
])
.value("AUTHORS", ["admin", "user"])
.factory("NewsMock", function(TITLES, TEXTS, AUTHORS) {
  return {
    createList: function(count) {
      var result = [];
      // random int function
      function random(min, max) {
        var rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
      }
      for (var i = 0; i < count; i++) {
        var obj = {
          title: TITLES[random(0, TITLES.length - 1)],
          body: TEXTS[random(0, TEXTS.length - 1)],
          author: AUTHORS[random(0, AUTHORS.length - 1)],
          date: new Date()
        }
        result.push(obj);
      }
      return result;
    }
  };
});
