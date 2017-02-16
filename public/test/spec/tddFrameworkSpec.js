describe("describe(): organize example groups",function(){});
console.log('');

describe("it(): stores each example",function(){
  it("* when assert doesn't fails, nothing is outputed",function(){
    assert(true).isEqual(true);
  });

  it("* when assert fails, executes lines of code and displays a message",function(){
    assert(true).isEqual(false);
  });

  function isElementHidden(id) {
    var element = document.getElementById(id);
    var elementClass = element.getAttribute('class');
    return checkIfHidden(elementClass);
  }

  it("* saves body state upon launching and restore it when everything finish",function(){
    var id = "note_form";
    var elementOutsideTestState = isElementHidden(id); // false

    it("* hiddensetter() toggles hidden class from element",function(){
      var elementInsideTestState = isElementHidden(id); // false
      hiddenSetter(id);
      var elementInsideTestNewState = isElementHidden(id); // true
      assert(elementInsideTestNewState).isEqual(!elementInsideTestState);
    });

    var elementOutsideTestNewState = isElementHidden(id); // false
    assert(elementOutsideTestNewState).isEqual(elementOutsideTestState);
  });
});
console.log('');

describe('assert(): interface to tests',function(){
  it('.isEqual(): test if expectation are === to what it has been given',function(){
    assert(2).isEqual(2);
  });
  it('.isNotEqual(): reverts .isEqual',function(){
    assert(2).isNotEqual(3);
  });

  it('.toContain(): looks for a substring inside another string',function(){
    text = document.body.innerHTML;
    string = 'div';
    assert(text).toContain(string);
  });
  it('.toNotContain(): reverts .toContain',function(){
    text = document.body.innerHTML;
    string = 'not Existing String';
    assert(text).toNotContain(string);
  });

  it('.toThrow(): looks for a specific error message',function(){
    assert(function(){throw("error message");}).toThrow('error message');
  });
  it('.toThrow(): throw error if error messages don\'t match',function(){
    assert(function(){throw("message");}).toThrow('error message');
  });
  it('.toThrow(): throw error if no error was raised',function(){
    assert(function(){return 1;}).toThrow('error message');
  });
  it('.toNotThrow(): looks that any error message wasn\'t thrown',function(){
    assert(function(){return 1;}).toNotThrow();
  });
  it('.toNotThrow(): throw error if a throw error was raised',function(){
    assert(function(){throw('Error Message');}).toNotThrow();
  });
  it('.toNotThrow(): throw error if any other error message was raised',function(){
    assert(function(){typo('Error Message');}).toNotThrow();
  });
});
