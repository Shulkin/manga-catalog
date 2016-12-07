angular.module("manga.auth.ctrl", [])
/*
 * Controller for login and register views
 */
.controller("AuthCtrl", [
  "Auth", "$scope", "$state", function(Auth, $scope, $state) {
    $scope.user = {};
    $scope.register = function() {
      Auth.register($scope.user).error(function(error) {
        $scope.error = error;
      }).then(function() {
        $state.go("home");
      });
    };
    $scope.logIn = function() {
      Auth.logIn($scope.user).error(function(error) {
        $scope.error = error;
      }).then(function() {
        $state.go("home");
      });
    };
}]);
