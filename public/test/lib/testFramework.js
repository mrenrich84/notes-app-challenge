(function(exports){

  function printTestHeader(args){
    indentation = {
      describe : "",
      it : "  "
    };
    style = {
      describe : 'font-weight: bold; color: black',
      it : 'color: black'
    };

    var testHeaderType = args.testHeaderType;
    var message = args.message;
    console.log('%c' + indentation[testHeaderType] + message, style[testHeaderType]);
  }

  function saveState(){
    return document.body.innerHTML;
  }

  function restoreState(myOriginalBody){
    document.body.innerHTML = myOriginalBody;
  }

  function testController(args){
    printTestHeader(args);
    myOriginalBody = saveState();
    args.codeBlock();
    restoreState(myOriginalBody);
  }

  function it(message, codeBlock){
    var args = {
      testHeaderType :  'it',
      message :         message,
      codeBlock :       codeBlock
    }
    testController(args);
  }

  function describe(message, codeBlock){
    var args = {
      testHeaderType :  'describe',
      message :         message,
      codeBlock :       codeBlock
    }
    testController(args);
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
              indentation.subLevel + errorOutcomes[matcher].got + args.assertion;

    console.error(message);
  }

  function AssertObj(assertion){
    this.assertion = assertion;
  }

  AssertObj.prototype.testAbstraction = function (args) {
    args.assertion = this.assertion;
    var isTestPassed = args.evaluationFunction(args);
    if (args.not) {
      isTestPassed = !isTestPassed;
     }
    if (!isTestPassed){
      printAssertResults(args);
    }
  };

  AssertObj.prototype.isEqualAbstraction = function (args) {
    args.evaluationFunction = function(args) {
      return args.assertion === args.expectation;
    };
    this.testAbstraction(args);
  };

  AssertObj.prototype.toContainAbstraction = function (args) {
    args.evaluationFunction = function(args) {
      var assertionString = args.assertion;
      var expectationSubstring = args.expectation;
      return assertionString.indexOf(expectationSubstring) !== -1;
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
    var args = {
      evaluationFunction : function(args){
	      var results = false;
        try {
          assertion();
          args.assertion = "NO ERROR MESSAGE";
        }
        catch(error){
          if (error == expectation) {
            return results = true;
          }
          args.assertion = error;
        }
	return results;
      },
      expectation : expectation,
      matcherType : 'toThrow'
    };
    this.testAbstraction(args);
  };

  AssertObj.prototype.toNotThrow = function(assertion) {
    var args = {
      matcherType : 'toNotThrow',
      expectation : '',
      not : true,
      evaluationFunction : function(assertion) {
      	var results = false;
      	try {
          assertion();
          return results;
        }
        catch(e) {
          args.assertion = e;
          return results = true;
        }
      }
    };
    this.testAbstraction(args);
  };

  var assert = function(assertion){
    return new AssertObj(assertion);
  };

  exports.it = it;
  exports.describe = describe;
  exports.assert = assert;
})(this);
