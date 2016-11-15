angular.module("authors.ctrl", [])
.value("AUTHORS_HEADERS", ["Name", "Series", "Most Numerous Genre"])
.controller("AuthorsCtrl", function(
  AUTHORS_HEADERS, // columns names
  Authors) { // authors service
  // === Variables ===
  var vm = this;
  // === Private ===
  function getMostNumerousGenre(author) {
    var allUsed = new Object();
    var series = author.series;
    // look through all genres in all mangas of this author
    for (var i = 0; i < series.length; i++) {
      var genre = series[i].genre;
      for (var j = 0; j < genre.length; j++) {
        // count the number of appearance
        var key = genre[j].name; // by genre name
        if (!(key in allUsed)) allUsed[key] = 0;
        allUsed[key]++;
      }
    }
    // sort genre by appearance count
    var sorted = Object.keys(allUsed).sort((a, b) => allUsed[b] - allUsed[a]);
    var mostUsed = sorted.slice(0, 5); // first 5 most used genres
    // return elements separated by comma
    return mostUsed.join(", ");
  }
  // constructor
  function init() {
    vm.list = []; // array of authors
    Authors.getAll()
    .success(function(data) {
      vm.list = data;
      // create new field for most used genres in author's works
      for (var i = 0; i < vm.list.length; i++) {
        vm.list[i].mostNumerousGenre = getMostNumerousGenre(vm.list[i]);
      }
    })
    .error(function(err) {
      console.log("Error " + err)
    });
    // fill up columns names
    vm.columns = AUTHORS_HEADERS;
  }
  // === Start module ===
  init();
  // === Public ===
});
