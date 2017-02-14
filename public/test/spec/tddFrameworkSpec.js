var getSomething = function(something){
  return something;
};

it("it(): displays a message and executes lines of code inside with assert",function(){
  assert.isEqual(getSomething('Hello'), "Hello");
});
