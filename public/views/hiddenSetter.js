(function(exports) {

  var getElementClass = function(id){
    var element = document.getElementById(id);
    var elementClass = element.getAttribute('class');
    return elementClass;
  };

  var hide = function(id){
    var elementClass = getElementClass(id);
    console.log(elementClass);
    if (!isHidden(elementClass)){
      document.
        getElementById(id).
        setAttribute('class', [elementClass, ' hidden'].join(''));
    }
  };

  var unhide = function(id){
    var elementClass = getElementClass(id);
    if (isHidden(elementClass)){
      document.
        getElementById(id).
        setAttribute('class', elementClass.replace('hidden', '').trim());
      }
  };

  var isHidden = function(elementClass){
    return (elementClass && elementClass.includes('hidden'));
  };

  exports.hide = hide;
  exports.unhide = unhide;
  exports.isHidden = isHidden;

})(this);
