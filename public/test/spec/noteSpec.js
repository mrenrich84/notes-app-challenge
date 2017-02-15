var text = new note('Hello');

it("it(): can be created with text string and returns that string", function(){
  assert(text.getText()).isEqual("Hello");
})
