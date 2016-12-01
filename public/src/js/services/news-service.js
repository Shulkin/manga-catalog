angular.module("news.service", [])
.factory("News", function(NewsMock, $http) {
  return {
    getAll: function() {
      // do not call api, return promise with mock news by default
      return new Promise(function(resolve, reject) {
        // resolve and reject handlers will be set in 'then'
        resolve(NewsMock.createList(3));
        // any error should go to reject()
      });
    }
  };
});
