describe("Note List Builder",function(){

  var test_app = new app();
  var testNoteList = new noteList();
  var testNote = new note("Hello hello! It's me, Varya!");

  it("displays the notelist on the page", function(){
    testNoteList.pushNote(testNote);
    noteListBuilder(testNoteList);
    var element = document.getElementById('notes_list_ul');
    assert(element.innerHTML).toContain("Hello hello! It's me");
  });

  it("displays just first 20 characters of the string", function(){
    testNoteList.pushNote(testNote);
    noteListBuilder(testNoteList);
    var element = document.getElementById('note_0');
    assert(element.innerHTML).isEqual("Hello hello! It's me");
  });

  it("displays notes in the list represented as links", function(){
    testNoteList.pushNote(testNote);
    noteListBuilder(testNoteList);
    var element = document.getElementById('notes_list_ul');
    assert(element.innerHTML).toContain("<a href=\"#showNote_"+0+"\"><li id=\"note_"+0+"\">"+testNote.getText().slice(0, 20)+"</li></a>");
  });
});
