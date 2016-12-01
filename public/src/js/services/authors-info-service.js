angular.module("authors.info.service", [])
.factory("AuthorsInfo", ["$rootScope", function($rootScope) {
  return {
    data: {
      birthDate : new Date()
    },
    getBirthDate: function() {
      return this.data.birthDate;
    },
    setBirthDate: function(date) {
      this.data.birthDate = date;
    },
    shareBirthDate: function() {
      $rootScope.$broadcast("SharedBirthDate");
    }
  };
}]);
