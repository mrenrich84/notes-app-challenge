describe("Note", function(){
  var text = new note('Hello');
  it("Can be created with text string and returns that string", function(){
    assert(text.getText()).isEqual("Hello");
  });
});
