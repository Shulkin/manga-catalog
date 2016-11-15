angular.module("authors.info.ctrl", [])
.controller("AuthorsInfoCtrl", function(
  Authors, // authors service
  $stateParams) {
  // === Variables ===
  var vm = this;
  // receive author id from url
  var id = $stateParams.id;
  // === Private ===
  // constructor
  function init() {
    Authors.get(id)
    .success(function(author) {
      /*
      name: String,
      gender: {
        type: String,
        enum: ["Male", "Female"],
        default: "Male"
      },
      birthDate: Date,
      // define ref to populate field on find
      series: [{type: mongoose.Schema.Types.ObjectId, ref: "Manga"}]
      */
      vm.name = author.name;
      vm.gender = author.gender;
      vm.birthDate = author.birthDate;
      // ===
      vm.json = author; // delete later!
    })
    .error(function(err) {
      console.log("Error " + err);
    })
  }
  // === Start module ===
  init();
  // === Public ===
});
