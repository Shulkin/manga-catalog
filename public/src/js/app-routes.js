angular.module("manga.routes", []).config(
  ["$stateProvider", "$urlRouterProvider",
  function($stateProvider, $urlRouterProvider) {
    // all other routes will lead to /home/news page
    $urlRouterProvider.otherwise("/home/news");
    $stateProvider
    // parent state
    .state("home", {
      url: "/home",
      templateUrl: "./views/home.html"
    })
    // nested states
    .state("home.news", {
      url: "/news",
      templateUrl: "./views/news.html",
      controller: "NewsCtrl as news"
    })
    .state("home.series", {
      url: "/series",
      templateUrl: "./views/series.html",
      controller: "SeriesCtrl as series"
    })
    .state("home.series-info", {
      url: "/series/:id",
      templateUrl: "./views/series-info.html",
      controller: "SeriesInfoCtrl as manga"
    })
    .state("home.series-create", {
      url: "/add/manga",
      templateUrl: "./views/series-create.html",
      controller: "SeriesAddCtrl as manga"
    })
    .state("home.authors", {
      url: "/authors",
      templateUrl: "./views/authors.html",
      controller: "AuthorsCtrl as authors"
    })
    .state("home.authors-info", {
      url: "/authors/:id",
      templateUrl: "./views/authors-info.html",
      controller: "AuthorsInfoCtrl as author"
    })
    .state("home.authors-create", {
      url: "/add/author",
      templateUrl: "./views/authors-create.html",
      controller: "AuthorsAddCtrl as author"
    })
    // independent states
    .state("login", {
      url: "/login",
      templateUrl: "./views/login.html",
      controller: "AuthCtrl"
    })
    .state("register", {
      url: "/register",
      templateUrl: "./views/register.html",
      controller: "AuthCtrl"
    });
  }]
);
