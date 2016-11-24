angular.module("series.info.ctrl", [
  // inject module with datepicker controller
  "manga.datepicker.ctrl" // use YearPickerCtrl in view
])
.controller("SeriesInfoCtrl", function(
  Genres, // genres service
  Series, // series service
  SeriesInfo, // share data with YearPickerCtrl
  $stateParams) {
  // === Variables ===
  var vm = this;
  // receive manga id from url
  var id = $stateParams.id;
  // === Private ===
  function resetFlags() {
    vm.editing = new Object();
  }
  // reload current manga
  function reload() {
    console.log("SeriesInfoCtrl.reload()");
    Series.get(id)
    .then(function(manga) {
      console.log("[SeriesInfoCtrl.reload] Reload success!");
      vm.title = manga.title;
      vm.description = manga.description;
      vm.genre = manga.genre; // save for use later
      vm.genreString = Genres.toString(manga.genre);
      vm.author = manga.author;
      vm.year = manga.year;
      // send year to YearPickerCtrl through SeriesInfo service
      console.log("[SeriesInfoCtrl.reload] Ready to share year, loaded from server...");
      SeriesInfo.setYear(vm.year); // set value
      SeriesInfo.shareYear(); // share by $broadcast
      console.log("[SeriesInfoCtrl.reload] SeriesInfo.date.year = " + SeriesInfo.getYear());
    }, function(err) {
      console.log("Error " + err);
    });
  }
  function saveAll() {
    console.log("SeriesInfoCtrl.saveAll()");
    // get year from YearPickerCtrl
    vm.year = SeriesInfo.getYear();
    console.log("[SeriesInfoCtrl.saveAll] vm.year = " + vm.year);
    // fill all manga fields
    var manga = {
      title: vm.title,
      description: vm.description,
      // get rid of populated objects
      genre: Genres.extractIds(vm.genre),
      // we need to save only ids
      author: vm.author._id,
      year: vm.year
    };
    console.log("[SeriesInfoCtrl.saveAll] Update manga " + JSON.stringify(manga));
    /*
    Series.update(id, manga)
    .then(function() {
      // reload to get properly populated fields
      reload();
    }, function(err) {
      console.log("Error " + err);
    });
    */
  }
  // constructor
  function init() {
    console.log("SeriesInfoCtrl.init()");
    reload(); // load data on start
    resetFlags(); // delete all previous edit flags
  }
  // === Start module ===
  init();
  // === Public ===
  vm.edit = function(field) {
    vm.editing[field] = true;
  }
  vm.isEdit = function(field) {
    // check if key 'field' in Object and Object[key] == true
    return (field in vm.editing && vm.editing[field]);
  }
  vm.save = function(field) {
    saveAll();
    resetFlags();
  }
});
