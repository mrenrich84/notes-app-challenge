

(function(exports){
  function printIt(message){
    console.log(message);
  }

function assert(){
}

assert.prototype.isEqual = function() {
};


// assert.isEqual();

  // var assert = function(functionToTest,expectations){
  //   results = functionToTest() //with args
  //   var isEqual = function(results){
  //
  //   }
  //   //...
  // };


  function it(message, codeBlock){
    printIt(message);
    codeBlock();
  };

  exports.it = it;
  exports.assert = assert;
})(this);
