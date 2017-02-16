describe("ClearForm", function(){
  var testNoteList = new noteList();
  var testApp = new app(testNoteList);


  it("clears the content of the new_note_textarea div", function(){
    var element = document.getElementById('new_note_textarea');
    element.value = "Test";
    testApp.clearForm();
    assert(document.getElementById('new_note_textarea').value).isEqual("");
  });

});


describe("CreateNewNote", function(){
  var testNoteList = new noteList();
  var testApp = new app(testNoteList);

  it("creates a new Note object and adds to the noteList", function(){
    var element = document.getElementById('new_note_textarea');
    element.value = "Test";
    testApp.createNewNote();
    assert(testApp.appNoteList.getNoteById(0).getText()).isEqual("Test");
  });

});
