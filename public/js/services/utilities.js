angular.module("utilities", [])
.factory("Utilities", function() {
  return {
    randomInt: function(min ,max) {
      var rand = min + Math.random() * (max + 1 - min);
      rand = Math.floor(rand);
      return rand;
    }
  };
});
