(function(exports) {
  var hiddenSetter = function(id){
    var element = document.getElementById(id);
    var elementClass = element.getAttribute('class');
    console.log(element);
    console.log(elementClass);
  };

  exports.hiddenSetter = hiddenSetter;
})(this);
