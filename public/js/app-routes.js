angular.module("manga.routes", []).config(
  ["$stateProvider", "$urlRouterProvider",
  function($stateProvider, $urlRouterProvider) {
    // all other routes will lead to /news
    $urlRouterProvider.otherwise("/news");
    $stateProvider
    // news page state
    .state("news", {
      url: "/news",
      templateUrl: "./views/news.html",
      controller: "NewsCtrl as news"
    })
    // list of mangakas
    .state("authors", {
      url: "/authors",
      templateUrl: "./views/authors.html",
      controller: "AuthorsCtrl as authors"
    })
    // mangaka info card (not nested!)
    .state("authors-info", {
      url: "/authors/:id",
      templateUrl: "./views/authors-info.html",
      controller: "AuthorsInfoCtrl as author"
    })
    // list of series
    .state("series", {
      url: "/series",
      templateUrl: "./views/series.html",
      controller: "SeriesCtrl as series"
    })
    // series info card (not nested!)
    .state("series-info", {
      url: "/series/:id",
      templateUrl: "./views/series-info.html",
      controller: "SeriesInfoCtrl as manga"
    });
  }]
);
