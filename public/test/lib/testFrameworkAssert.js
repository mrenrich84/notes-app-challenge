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
            results = true;
            return results;
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
          results = true;
          return results;
        }
      }
    };
    this.testAbstraction(args);
  };

  var assert = function(assertion){
    return new AssertObj(assertion);
  };

  exports.assert = assert;
})(this);
