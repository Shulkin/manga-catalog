// inject all modules to main module
var mangaApp = angular.module("manga.app", [
  "ui.router", // states router
  "manga.routes", // app states
  // news controllers
  "news.ctrl",
  // news services
  "news.service",
  "news.mock",
  // authors controllers
  "authors.ctrl",
  // authors services
  "authors.service",
  // series controllers
  "series.ctrl",
  "series.info.ctrl",
  // series services
  "series.service",
  // genres services
  "genres.service"
]);
