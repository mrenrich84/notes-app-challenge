(function(exports) {

  function App() {
    // I am a constructor
  };

  //Add prototype functions
  App.prototype.getHome = function() {
    console.log("in getHome");
  };

  //Export app constructor to window
  exports.app = App;

})(this);
