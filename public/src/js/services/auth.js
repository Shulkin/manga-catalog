angular.module("manga.auth", [])
/*
 * Simple controller for nevigation header that exposes isLoggedIn,
 * currentUser, and logOut methods from Auth factory.
 */
.controller("NavCtrl", ["Auth", "$scope", function(Auth, $scope) {
  $scope.isLoggedIn = Auth.isLoggedIn;
  $scope.currentUser = Auth.currentUser;
  $scope.logOut = Auth.logOut;
}])
/*
 * Controller for login and register views
 */
.controller("AuthCtrl", [
  "Auth", "$scope", "$state", function(Auth, $scope, $state) {
    $scope.user = {};
    $scope.register = function() {
      Auth.register($scope.user).error(function(error) {
        // error on register user
        $scope.error = error;
      }).then(function() {
        // return to main page
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
}])
/*
 * We'll need to inject $http for interfacing with our server, and $window
 * for interfacing with localStorage.
 */
.factory("Auth", ["$http", "$window", function($http, $window) {
  return {
    saveToken: function(token) {
      $window.localStorage["manga-catalog-token"] = token;
    },
    getToken: function() {
      return $window.localStorage["manga-catalog-token"];
    },
    isLoggedIn: function(token) {
      var token = auth.getToken();
      if (token) {
        /*
         * If a token exists, we'll need to check the payload to see if the
         * token has expired, otherwise we can assume the user is logged out.
         */
        var payload = JSON.parse($window.atob(token.split(".")[1]));
        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    },
    currentUser: function() {
      if (auth.isLoggedIn()) {
        var token = auth.getToken();
        var payload = JSON.parse($window.atob(token.split(".")[1]));
        return payload.username;
      }
    },
    register: function(user) {
      return $http.post("/auth/register", user).then(function(response) {
        auth.saveToken(response.data.token);
      });
    },
    logIn: function(user) {
      return $http.post("/auth/login", user).then(function(response) {
        auth.saveToken(response.data.token);
      });
    },
    logOut: function(user) {
      $window.localStorage.removeItem("manga-catalog-token");
    }
  };
}]);
