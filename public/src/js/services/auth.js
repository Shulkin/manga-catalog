angular.module("manga.auth", [])
/*
 * We'll need to inject $http for interfacing with our server, and $window
 * for interfacing with localStorage.
 */
.factory("Auth", ["$http", "$window", function($http, $window) {
  var auth = {};
  auth.saveToken = function(token) {
    $window.localStorage["manga-catalog-token"] = token;
  };
  auth.getToken = function() {
    return $window.localStorage["manga-catalog-token"];
  };
  auth.isLoggedIn = function() {
    var token = auth.getToken();
    if (token) {
      var payload = JSON.parse($window.atob(token.split(".")[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };
  auth.currentUser = function() {
    if (auth.isLoggedIn()) {
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split(".")[1]));
      return payload.username;
    }
  };
  auth.register = function(user) {
    console.log("[AuthService] Send http POST register: " + JSON.stringify(user));
    return $http.post("/auth/register", user).success(function(data) {
      console.log("[AuthService.Register] Success: " + JSON.stringify(data));
      auth.saveToken(data.token);
    });
  };
  auth.logIn = function(user) {
    console.log("[AuthService] Send http POST login: " + JSON.stringify(user));
    return $http.post("/auth/login", user).success(function(data) {
      console.log("[AuthService.Login] Success: " + JSON.stringify(data));
      auth.saveToken(data.token);
    });
  };
  auth.logOut = function(user) {
    $window.localStorage.removeItem("manga-catalog-token");
  };
  return auth;
}])
/*
 * Simple controller for nevigation header that exposes isLoggedIn,
 * currentUser, and logOut methods from Auth factory.
 */
.controller("NavCtrl", ["Auth", "$scope", function(Auth, $scope) {
  $scope.isLoggedIn = Auth.isLoggedIn;
  $scope.currentUser = Auth.currentUser;
  $scope.logOut = Auth.logOut;
}]);
