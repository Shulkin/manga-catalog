// inject all controllers to main module
var mangaApp = angular.module("manga.app", [
  "ui.router", // states router
  "manga.routes" // app states
]);
