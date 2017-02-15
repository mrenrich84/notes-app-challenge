(function(exports){

  function printTestHeader(headerType, message){
    indentationType = {
      it: "  ",
      describe: ""
    }

    console.log(indentationType[headerType] + message);
  }

  function saveState(){
    return document.body.innerHTML
  }

  function restoreState(myOriginalBody){
    document.body.innerHTML = myOriginalBody;
  }

  function testHeader(testHeaderType, message, codeBlock){
    printTestHeader(testHeaderType, message);
    myOriginalBody = saveState();
    codeBlock();
    restoreState(myOriginalBody);
  }

  function it(message, codeBlock){
    testHeader('it',message, codeBlock);
  };

  function describe(message, codeBlock){
    testHeader('describe',message, codeBlock);
  };

  function printAssertResults(testType, expected, got){
    message = "    Failure/Error: while checking " + testType + "\n" +
              "        Expected: " + expected + "\n" +
              "        Got     : " + got

    console.log(message);
  };

  function AssertObj(functionToTest){ // any better naming?
    this.functionToTest = functionToTest

  };

  AssertObj.prototype.isEqual = function (expectation) {
    var results = (this.functionToTest === expectation);
    if (!results){
      printAssertResults("isEqual", expectation, this.functionToTest)
    };
  };

  var assert = function(functionToTest){
    return new AssertObj(functionToTest)
  };

  exports.it = it;
  exports.describe = describe;
  exports.assert = assert;
})(this);
