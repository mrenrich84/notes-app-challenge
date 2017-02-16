describe("NoteList", function(){
  var text_test = new note('Hello');
  var list_test = new noteList();
  it("Can have notes pushed into the notes array", function(){
    list_test.pushNote(text_test);
    assert(list_test.getNotes()[0]).isEqual(text_test);
  });
});
