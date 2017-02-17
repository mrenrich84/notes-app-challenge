(function(exports){

  var testPrinter = {};

  testPrinter.printTestHeader = function(args){
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
  };

  testPrinter.printAssertResults = function(args){
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
  };

  exports.testPrinter = testPrinter;

})(this);
