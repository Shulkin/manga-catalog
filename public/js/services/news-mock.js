angular.module("news.mock", [])
.value("TITLES", [
  "Lorem ipsum",
  "Lorem ipsum dolor sit amet",
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit, " +
    "sed do eiusmod tempor",
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit, " +
    "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
])
.value("TEXTS", [
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod " +
    "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim " +
    "veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex " +
    "ea commodo consequat. Duis aute irure dolor in reprehenderit in " +
    "voluptate velit esse cillum dolore eu fugiat nulla pariatur. " +
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui " +
    "officia deserunt mollit anim id est laborum.",
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod " +
    "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim " +
    "veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex " +
    "ea commodo consequat. Duis aute irure dolor in reprehenderit in " +
    "voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod " +
    "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim " +
    "veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex " +
    "ea commodo consequat.",
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod " +
    "tempor incididunt ut labore et dolore magna aliqua",
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
])
.factory("NewsMock", function(TITLES, TEXTS) {
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
          date: ""
        }
        result.push(obj);
      }
      return result;
    }
  };
});
