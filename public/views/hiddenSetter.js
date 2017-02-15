(function(exports) {
  var hiddenSetter = function(id){
    var element = document.getElementById(id);
    var elementClass = element.getAttribute('class');
    if (checkIfHidden(elementClass) === false) {
      element.setAttribute('class', (elementClass + " hidden").trim());
    } else {
      element.setAttribute('class', elementClass.replace('hidden', '').trim());
    }
  };

  var checkIfHidden = function(elementClass){
    if (elementClass && elementClass.includes('hidden')) {
      return true;
    } else {
      return false;
    }
  };

  exports.hiddenSetter = hiddenSetter;
  exports.checkIfHidden = checkIfHidden;

})(this);
