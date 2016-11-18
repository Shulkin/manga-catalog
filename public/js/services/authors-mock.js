angular.module("authors.mock", [])
.value("AUTHOR_NAMES", [
  "Oda Eiichiro", "Kishimoto Masashi", "Araki Hirohiko", "Akira Toriyama"
])
.value("AUTHOR_GENDERS", ["Male", "Female"])
.factory("AuthorsMock", function(
  MOCK_SERIES_COUNT, // up to N series for one author
  AUTHOR_NAMES, AUTHOR_GENDERS, // author params
  Utilities, SeriesMock) {
  // === Private ===
  function generateAuthorObject(id) {
    // generate list of authors works
    var series = [];
    var seriesCount = Utilities.randomInt(0, MOCK_SERIES_COUNT);
    for (var i = 0; i < seriesCount; i++) {
      series.push(SeriesMock.createManga(i));
    }
    var result = {
      _id: "author_" + id,
      name: AUTHOR_NAMES[Utilities.randomInt(0, AUTHOR_NAMES.length - 1)],
      gender: AUTHOR_GENDERS[Utilities.randomInt(0, AUTHOR_GENDERS.length - 1)],
      birthDate: new Date(),
      series: series
    };
    return result;
  }
  function generateSimpleAuthorObject(id) {
    var result = {
      _id: "author_" + id,
      name: AUTHOR_NAMES[Utilities.randomInt(0, AUTHOR_NAMES.length - 1)]
    };
    return result;
  }
  // === Public ===
  return {
    // create list of authors
    createList: function(count) {
      var result = [];
      for (var i = 0; i < count; i++) {
        var obj = generateAuthorObject(i);
        result.push(obj);
      }
      return result;
    },
    // create one author
    createAuthor: function(id) {
      return generateAuthorObject(id);
    },
    // create author without populate series list
    createSimpleAuthor: function(id) {
      return generateSimpleAuthorObject(id);
    }
  };
});
