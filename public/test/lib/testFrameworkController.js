(function(exports){

  function saveState(){
    return document.body.innerHTML;
  }

  function restoreState(myOriginalBody){
    document.body.innerHTML = myOriginalBody;
  }

  function testController(args){
    testPrinter.printTestHeader(args);
    myOriginalBody = saveState();
    args.codeBlock();
    restoreState(myOriginalBody);
  }

  function it(message, codeBlock){
    var args = {
      testHeaderType :  'it',
      message :         message,
      codeBlock :       codeBlock
    };
    testController(args);
  }

  function describe(message, codeBlock){
    var args = {
      testHeaderType :  'describe',
      message :         message,
      codeBlock :       codeBlock
    };
    testController(args);
  }

  exports.it = it;
  exports.describe = describe;
})(this);
