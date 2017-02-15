it("it(): displays a message and executes lines of code inside with assert when failing",function(){
  assert(true).isEqual(false);
});

it("it(): when assert doesn't fail, shows nothing",function(){
  assert(true).isEqual(true);
});



function isElementHidden(id) {
  var element = document.getElementById(id);
  var elementClass = element.getAttribute('class');
  return checkIfHidden(elementClass);
}

var id = "note_form";

it("it(): saves body state upon launching and restore it when everything finish",function(){
  var elementOutsideTestState = isElementHidden(id); // false
  it("hiddensetter() toggles hidden class from element",function(){
    var elementInsideTestState = isElementHidden(id); // false
    hiddenSetter(id);
    var elementInsideTestNewState = isElementHidden(id); // true
    assert(elementInsideTestNewState).isEqual(!elementInsideTestState);
  });
  var elementOutsideTestNewState = isElementHidden(id); // false
  assert(elementOutsideTestNewState).isEqual(elementOutsideTestState);
});
