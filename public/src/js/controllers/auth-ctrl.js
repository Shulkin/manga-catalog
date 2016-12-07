angular.module("manga.auth.ctrl", [])
/*
 * Controller for login and register views
 */
.controller("AuthCtrl", [
  "Auth", "$scope", "$state", function(Auth, $scope, $state) {
    $scope.user = {};
    $scope.register = function() {
      console.log("[AuthCtrl] Ready to register...");
      Auth.register($scope.user).error(function(error) {
        console.log("[AuthCtrl.Register] Error: " + JSON.stringify(error));
        $scope.error = error;
      }).then(function() {
        console.log("[AuthCtrl.Register] Success, go home!");
        $state.go("home");
      });
    };
    $scope.logIn = function() {
      console.log("[AuthCtrl] Ready to login...");
      Auth.logIn($scope.user).error(function(error) {
        console.log("[AuthCtrl.Login] Error: " + JSON.stringify(error));
        $scope.error = error;
      }).then(function() {
        console.log("[AuthCtrl.Login] Success, go home!");
        $state.go("home");
      });
    };
}]);
