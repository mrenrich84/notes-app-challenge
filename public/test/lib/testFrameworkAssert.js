(function(exports){

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
      testPrinter.printAssertResults(args);
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

  var toThrowEvaluationFunction = function(args){
    try {
      args.assertion();
      args.assertion = "NO ERROR MESSAGE"; // nice hack !!
      return false;
    }
    catch(error){
      if (error == args.expectation) {
        return true;
      }
      args.assertion = error;
      return false;
    }
  }

  AssertObj.prototype.toThrow = function (expectation) {
    var args = {
      evaluationFunction : toThrowEvaluationFunction,
      expectation : expectation,
      matcherType : 'toThrow'
    };
    this.testAbstraction(args);
  };

  var toNotThrowEvaluationFunction = function(args) {
    try {
      args.assertion();
      return true;
    }
    catch(error) {
      args.assertion = error;
      return false;
    }
  }

  AssertObj.prototype.toNotThrow = function() {
    var args = {
      matcherType : 'toNotThrow',
      expectation : '',
      // not : true,
      evaluationFunction : toNotThrowEvaluationFunction
    };
    this.testAbstraction(args);
  };

  var assert = function(assertion){
    return new AssertObj(assertion);
  };

  exports.assert = assert;
})(this);
