angular.module("series.mock", [])
.value("MANGA_TITLES", [
  "One Piece", "Naruto", "Bleach", "Karakuri Circus", "Shaman King",
  "Berserk", "Shamo", "JoJo's Bizarre Adventure", "Blame!", "Homunculus",
  "Air Gear", "Shigurui", "Toriko", "Ushio and Tora"
])
.value("MANGA_GENRES", [
  "Shounen", "Action", "Adventure", "Horror", "Drama", "Comedy", "Seinen"
])
.factory("SeriesMock", [
  "MANGA_TITLES", "MANGA_GENRES", "AUTHOR_NAMES", "Utils", function(
  MANGA_TITLES, MANGA_GENRES, AUTHOR_NAMES, Utils) {
  // === Private ===
  function generateSimpleAuthorObject(id) {
    // don't populate series list!
    var result = {
      _id: "author_" + id,
      name: AUTHOR_NAMES[Utils.randomInt(0, AUTHOR_NAMES.length - 1)]
    };
    return result;
  }
  function generateMangaObject(id) {
    // generate genres
    var genres = [];
    var genresNum = Utils.randomInt(1, MANGA_GENRES.length);
    for (var i = 0; i < genresNum; i++) {
      genres.push({
        _id: "genre_" + i,
        name: MANGA_GENRES[Utils.randomInt(0, MANGA_GENRES.length - 1)]
      });
    }
    // create simple author with only name
    var author = generateSimpleAuthorObject("0");
    var result = {
      // generated _ids must be unique
      _id: "manga_" + id,
      title: MANGA_TITLES[Utils.randomInt(0, MANGA_TITLES.length - 1)],
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
      year: Utils.randomInt(1950, 2014),
      // simulate populate from Mongo find function
      genre: genres,
      author: author
    };
    return result;
  }
  // === Public ===
  return {
    // create list of mangas
    createList: function(count) {
      var result = [];
      for (var i = 0; i < count; i++) {
        var obj = generateMangaObject(i);
        result.push(obj);
      }
      return result;
    },
    // create one manga
    createManga: function(id) {
      return generateMangaObject(id);
    }
  };
}]);
