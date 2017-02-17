(function(exports) {

  function App(noteList) {
    this.appNoteList = noteList;
    var self = this;

    this.handleHashChange = function(){
      if (location.hash === "#createNewNote") {
        self.createNewNote();
        self.clearForm();
        location.hash = "#home";
      } else if (location.hash === "#home") {
        var homePageDiv = document.getElementById("home_page_content");
        var noteContentDiv = document.getElementById("note_content");

          if (isHidden(homePageDiv.getAttribute('class'))) {
            unhide("home_page_content");
          }
          if (!isHidden(noteContentDiv.getAttribute('class'))) {
            hide("note_content");
          }
        noteListBuilder(self.appNoteList);

      } else if (location.hash.includes("showNote")){

        var note_id = location.hash.split("_")[1];
        var note_text = self.appNoteList.getNoteById(note_id).getText();
        domInjector("note_content", "<p>"+note_text+"</p>");
        hide("home_page_content");
        unhide("note_content");
        }
      };


    this.createNewNote = function(){
      var noteText = document.getElementById('new_note_textarea').value;
      var newNote = new note(noteText);
      self.appNoteList.pushNote(newNote);
    };

    this.clearForm = function() {
      var element = document.getElementById('new_note_textarea');
      element.value = "";
    };
  }


  //Export app constructor to window
  exports.app = App;

})(this);

var appNoteList = new noteList();
var notesApp = new app(appNoteList);
//EVENTS
window.onhashchange = notesApp.handleHashChange;
