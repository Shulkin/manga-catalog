angular.module("manga.auth.ctrl", [])
/*
 * Controller for login and register views
 */
.controller("AuthCtrl", [
  "Auth", "$scope", "$state", function(Auth, $scope, $state) {
    $scope.user = {};
    $scope.register = function() {
      Auth.register($scope.user)
      .then(function(error) {
        if (error !== undefined) {
          // error on register user
          $scope.error = error;
        } else {
          // return to main page
          $state.go("home");
        }
      });
    };
    $scope.logIn = function() {
      Auth.logIn($scope.user)
      .then(function(error) {
        if (error !== undefined) {
          $scope.error = error;
        } else {
          $state.go("home");
        }
      });
    };
}]);
