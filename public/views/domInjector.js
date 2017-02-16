(function(exports) {

  var domInjector = function(id, htmlString) {
    var element = document.getElementById(id);
      if (!element) {
        throw "No element found";
      } else {
        element.innerHTML = htmlString;
      }
  };

  exports.domInjector = domInjector;

})(this);
