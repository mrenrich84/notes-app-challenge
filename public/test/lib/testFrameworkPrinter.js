(function(exports){

  var RESULTS_ERROR_OUTCOMES = {
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

  var RESULTS_INDENTATION = {
    mainLevel : "  ".repeat(2),
    subLevel : "  ".repeat(5)
  };

  var HEADER_INDENTATION = {
    describe : "",
    it : "  "
  };

  var HEADER_STYLE = {
    describe : 'font-weight: bold; color: black',
    it : 'color: black'
  };



  var testPrinter = {

    printTestHeader : function(args){
      var testHeaderType = args.testHeaderType;
      var message = args.message;
      console.log('%c' + HEADER_INDENTATION[testHeaderType] + message, HEADER_STYLE[testHeaderType]);
    },

    printAssertResults : function(args){
      var matcher = args.matcherType;
      message = RESULTS_INDENTATION.mainLevel + "Failure/Error: while checking " + args.matcherType + "\n" +
                RESULTS_INDENTATION.subLevel + RESULTS_ERROR_OUTCOMES[matcher].expected  + args.expectation + "\n" +
                RESULTS_INDENTATION.subLevel + RESULTS_ERROR_OUTCOMES[matcher].got + args.assertion;

      console.error(message);
    }
  };



  exports.testPrinter = testPrinter;

})(this);
