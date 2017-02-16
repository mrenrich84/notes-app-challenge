describe("clearForm", function(){
  var testApp = new app();
  var testNoteList = new noteList();

  it("clears the content of the new_note_textarea div", function(){
    var element = document.getElementById('new_note_textarea');
    element.value = "Test";
    testApp.clearForm();
    assert(document.getElementById('new_note_textarea').value).isEqual("");
  });

});
