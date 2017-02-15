var text = new Note('Hello');

it("can be created with text string and returns that string", function(){
  assert.isEqual(text.getText(), "Hello");
})
