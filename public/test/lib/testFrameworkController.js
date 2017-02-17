(function(exports){

  function saveDOMBody(){
    return document.body.innerHTML;
  }

  function restoreDOMBody(myOriginalBody){
    document.body.innerHTML = myOriginalBody;
  }

  function testController(args){
    testPrinter.printTestHeader(args);
    myOriginalBody = saveDOMBody();
    args.testCodeBlock();
    restoreDOMBody(myOriginalBody);
  }

  function it(message, testCodeBlock){
    var args = {
      testHeaderType :  'it',
      message :         message,
      testCodeBlock :   testCodeBlock
    };
    testController(args);
  }

  function describe(message, testCodeBlock){
    var args = {
      testHeaderType :  'describe',
      message :         message,
      testCodeBlock :   testCodeBlock
    };
    testController(args);
  }

  exports.it = it;
  exports.describe = describe;
})(this);
