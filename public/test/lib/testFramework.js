(function(exports){

  function printTestHeader(headerType, message){
    indentation = {
      describe : "",
      it : "  "
    };
    style = {
      describe : 'font-weight: bold; color: black',
      it : 'color: black'
    };

    console.log('%c' + indentation[headerType] + message, style[headerType]);
  }

  function saveState(){
    return document.body.innerHTML;
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
  }

  function describe(message, codeBlock){
    testHeader('describe',message, codeBlock);
  }

  function printAssertResults(args){
    errorOutcomes = {
      isEqual: {
        expected :  'Expected: ',
        got :       'Got:      '
      },
      isNotEqual: {
        expected :  'Expected not to be: ',
        got :       'Got:                '
      },
      toContain: {
        expected :  'String to be contained:',
        got :       'The whole string is:   '
      },
      toNotContain: {
        expected :  'String not to be contained: ',
        got :       'The whole string is:        '
      },
      toThrow: {
        expected :  'Expected: ',
        got :       'Got:      '
      },
      toNotThrow: {
        expected :  'No error message expected:          ',
        got :       'But instead got this error message: '
      }
    };

    indentation = {
      mainLevel : "  ".repeat(2),
      subLevel : "  ".repeat(5)
    };

    var matcher = args.matcherType;
    message = indentation.mainLevel + "Failure/Error: while checking " + args.matcherType + "\n" +
              indentation.subLevel + errorOutcomes[matcher].expected  + args.expectation + "\n" +
              indentation.subLevel + errorOutcomes[matcher].got + args.functionToTest;

    console.error(message);
  }

  function AssertObj(functionToTest){
    this.functionToTest = functionToTest;
  }

  AssertObj.prototype.testAbstraction = function (args) {
    args.functionToTest = this.functionToTest;
    var results = args.testFunction(args.functionToTest, args.expectation, args);
    if (args.not) {
      results = !results;
     }
    if (!results){
      printAssertResults(args);
    }
  };

  AssertObj.prototype.isEqualAbstraction = function (args) {
    args.testFunction = function(functionToTest, expectation) {
      return functionToTest === expectation;
    };
    this.testAbstraction(args);
  };

  AssertObj.prototype.toContainAbstraction = function (args) {
    args.testFunction = function(functionToTest, string) {
      return functionToTest.indexOf(string) !== -1;
    };
    this.testAbstraction(args);
  };

  AssertObj.prototype.isEqual = function (expectation) {
    var args = {
      expectation : expectation,
      matcherType : 'isEqual'
    };
    this.isEqualAbstraction(args);
  };

  AssertObj.prototype.isNotEqual = function(expectation) {
    var args = {
      expectation : expectation,
      matcherType : 'isNotEqual',
      not : true
    };
    this.isEqualAbstraction(args);
  };

  AssertObj.prototype.toContain = function (expectation) {
    var args = {
      expectation : expectation,
      matcherType : 'toContain'
    };
    this.toContainAbstraction(args);
  };

  AssertObj.prototype.toNotContain = function(expectation) {
    var args = {
      expectation : expectation,
      matcherType : 'toNotContain',
      not : true
    };
    this.toContainAbstraction(args);
  };

  AssertObj.prototype.toThrow = function (expectation) {
    var results = false;
    var args = {
      testFunction : function(functionToTest, expectation, args){
        try {
          functionToTest();
          args.functionToTest = "NO ERROR MESSAGE";
        }
        catch(error){
          if (error == expectation) {
            return results = true;
          }
          args.functionToTest = error;
        }
      },
      expectation : expectation,
      matcherType : 'toThrow'
    };
    this.testAbstraction(args);
  };

  AssertObj.prototype.toNotThrow = function(functionToTest) {
    var results = false;
    var args = {
      matcherType : 'toNotThrow',
      expectation : '',
      not : true,
      testFunction : function(functionToTest) {
        try {
          functionToTest();
          return results;
        }
        catch(e) {
          args.functionToTest = e;
          return results = true;
        }
      }
    };
    this.testAbstraction(args);
  };

  var assert = function(functionToTest){
    return new AssertObj(functionToTest);
  };

  exports.it = it;
  exports.describe = describe;
  exports.assert = assert;
})(this);
