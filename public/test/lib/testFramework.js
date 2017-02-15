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

  AssertObj.prototype.isEqualAbstraction = function (expectation, isNotEqual = false) {
    var results = ( this.functionToTest === expectation );
    var testType = 'isEqual';
    if (isNotEqual) {
      results = !results;
      testType = 'isNotEqual';
     };
    if (!results){
      printAssertResults(testType, expectation, this.functionToTest)
    };
  };

  AssertObj.prototype.isEqual = function (expectation) {
    this.isEqualAbstraction(expectation)
  };

  AssertObj.prototype.isNotEqual = function(expectation) {
    this.isEqualAbstraction(expectation, true)
  };

  AssertObj.prototype.toContainAbstraction = function (string, toNotContain = false) {
    var results = ( this.functionToTest.indexOf(string) !== -1 );
    var testType = 'toContain';
    if (toNotContain) {
      results = !results;
      testType = 'toNotContain';
     };
    if (!results){
      printAssertResults(testType, expectation, this.functionToTest)
    };
  };

  AssertObj.prototype.toContain = function (expectation) {
    this.toContainAbstraction(expectation)
  };

  AssertObj.prototype.toNotContain = function(expectation) {
    this.toContainAbstraction(expectation, true)
  };


  var assert = function(functionToTest){
    return new AssertObj(functionToTest)
  };

  exports.it = it;
  exports.describe = describe;
  exports.assert = assert;
})(this);
