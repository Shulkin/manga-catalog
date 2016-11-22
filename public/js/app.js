// inject all modules to main module
var mangaApp = angular.module("manga.app", [
  "ui.router", // states router
  "manga.routes", // app states
  // third-party directive for table data pagination
  "angularUtils.directives.dirPagination", // by Michael Bromley
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
  // series controllers
  "series.ctrl",
  "series.info.ctrl",
  // series services
  "series.service",
  "series.mock",
  // genres services
  "genres.service"
]);
