angular.module("series.mock", [])
.value("MANGA_TITLES", [
  "One Piece", "Naruto", "Bleach", "Karakuri Circus", "Shaman King",
  "Berserk", "Shamo", "JoJo's Bizarre Adventure", "Blame!", "Homunculus",
  "Air Gear", "Shigurui", "Toriko", "Ushio and Tora"
])
.value("MANGA_GENRES", [
  "Shounen", "Action", "Adventure", "Horror", "Drama", "Comedy", "Seinen"
])
.value("AUTHORS", [
  "Oda Eiichiro", "Kishimoto Masashi", "Araki Hirohiko", "Akira Toriyama"
])
.factory("SeriesMock", function(
  MANGA_TITLES, MANGA_GENRES, AUTHORS, Utilities) {
  // === Private ===
  function generateMangaObject(id) {
    var genres = [];
    var genresNum = Utilities.randomInt(1, 10);
    for (var i = 0; i < genresNum; i++) {
      genres.push({
        _id: "genre_" + i,
        name: MANGA_GENRES[Utilities.randomInt(0, MANGA_GENRES.length - 1)]
      });
    }
    var author = {
      // authors name is enough for mock manga
      _id: "author_0",
      name: AUTHORS[Utilities.randomInt(0, AUTHORS.length - 1)]
    };
    var result = {
      // generated _ids must be unique
      _id: "manga_" + id,
      title: MANGA_TITLES[Utilities.randomInt(0, MANGA_TITLES.length - 1)],
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
      year: Utilities.randomInt(1950, 2014),
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
});
