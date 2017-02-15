(function(exports) {

  var domInjector = function(id, htmlString) {
    var element = document.getElementById(id);
    element.innerHTML = htmlString;
  };

  exports.domInjector = domInjector;

})(this);
