angular.module("manga.utilities", [])
.factory("Utilities", function() {
  return {
    randomInt: function(min ,max) {
      var rand = min + Math.random() * (max + 1 - min);
      rand = Math.floor(rand);
      return rand;
    },
    split: function(array, n) {
      var result = [];
      while (array.length) {
        result.push(array.splice(0, n));
      }
      return result;
    }
  };
});
