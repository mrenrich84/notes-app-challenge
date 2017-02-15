(function(exports){


  function printIt(message){
    console.log(message);
  }

  function printAssertResults(testType, expected, got){
    message = "    Failure/Error: while checking " + testType + "\n" +
              "        Expected: " + expected + "\n" +
              "        Got     : " + got

    console.log(message);
  }

  function AssertObj(functionToTest){ // any better naming?
    this.functionToTest = functionToTest

  }

  AssertObj.prototype.isEqual = function (expectation) {
    var results = (this.functionToTest === expectation);
    if (!results){
      printAssertResults("isEqual", expectation, this.functionToTest)
    };
  };

  var assert = function(functionToTest){
    return new AssertObj(functionToTest)
  };

  function saveState(){
    return document.body.innerHTML
  }

  function restoreState(myOriginalBody){
    document.body.innerHTML = myOriginalBody;
  }

  function it(message, codeBlock){
    printIt(message);
    myOriginalBody = saveState();
    codeBlock();
    restoreState(myOriginalBody);
  };

  exports.it = it;
  exports.assert = assert;
})(this);
