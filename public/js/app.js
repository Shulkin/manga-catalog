// inject all global modules to main module
var mangaApp = angular.module("manga.app", [
  // animate module
  "ngAnimate",
  // angular-ui bootstrap
  "ui.bootstrap",
  // states router
  "ui.router",
  // app states
  "manga.routes",
  // global configuration variables
  "manga.config",
  // utilities functions
  "manga.utilities",
  // news controllers
  "news.ctrl",
  // news services
  "news.service",
  "news.mock",
  // authors controllers
  "authors.ctrl",
  "authors.info.ctrl",
  // authors services
  "authors.service",
  "authors.mock",
  "authors.info.service",
  // series controllers
  "series.ctrl",
  "series.info.ctrl",
  // series services
  "series.service",
  "series.mock",
  "series.info.service",
  // genres services
  "genres.service"
]);
