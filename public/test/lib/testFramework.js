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
    testTypePrintouts = {
      isEqual: {
        expectation: 'Expected',
        got: 'Got'
      },
      isNotEqual: {
        expectation: 'Expected not to be',
        got: 'Got'
      },
      toContain: {
        expectation: 'String to be contained',
        got: 'The whole string is'
      },
      toNotContain: {
        expectation: 'String not to be contained',
        got: 'The whole string is'
      },
      toThrow: {
        expectation: 'Expected',
        got: 'Got'
      },
      toNotThrow: {
        expectation: 'No error message expected',
        got: 'But got this error message'
      }
    }

    indentation = "  "
    message = indentation.repeat(3) + "Failure/Error: while checking " + testType + "\n" +
              indentation.repeat(4) + testTypePrintouts[testType].expectation + ": " + expected + "\n" +
              indentation.repeat(4) + testTypePrintouts[testType].got + ": " + got

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
      printAssertResults(testType, string, this.functionToTest)
    };
  };

  AssertObj.prototype.toContain = function (expectation) {
    this.toContainAbstraction(expectation)
  };

  AssertObj.prototype.toNotContain = function(expectation) {
    this.toContainAbstraction(expectation, true)
  };

  AssertObj.prototype.toThrowAbstraction = function (expectation, toNotThrow = false) {
    // var results = false;
    // try {
    //   this.functionToTest();
    // }
    // catch(e){
    //   if (e == expectation){
    //     results = true;
    //   } else {
    //     throw e;
    //   }
    // }
    //
    // var testType = 'toThrow';
    // if (toNotThrow) {
    //   results = !results;
    //   testType = 'toNotThrow';
    //  };
    // if (!results){
    //   printAssertResults(testType, expectation, this.functionToTest)
    // };
  };

  AssertObj.prototype.toThrow = function (expectation) {
        // this.toThrowAbstraction(expectation)
    var results;
    try {
      this.functionToTest();
      results = "NO ERROR MESSAGE";
    }
    catch(e){
      if (e == expectation){
        results = false;
      } else {
        results = e;
      }
    }

    var testType = 'toThrow';

    if (results){
      printAssertResults(testType, expectation, results)
    };
  };

  AssertObj.prototype.toNotThrow = function(expectation) {
    // this.toThrowAbstraction(expectation, true)
    var results;
    try {
      this.functionToTest();
      // results = true;
    }
    catch(e){
      results = e;
    }

    var testType = 'toNotThrow';

    if (results){
      printAssertResults(testType, "", results)
    };
  };

  var assert = function(functionToTest){
    return new AssertObj(functionToTest)
  };

  exports.it = it;
  exports.describe = describe;
  exports.assert = assert;
})(this);
