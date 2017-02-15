(function(exports) {

  function App() {
    var self = this;

    this.getHome = function() {
      console.log("in getHome");
    };

    this.handleHashChange = function(){
      if (location.hash === "#createNewNote") {
        self.createNewNote();
        self.clearForm();
        location.hash = "#home";
      } else {
        if (location.hash === "#home") {
          noteListBuilder(appNoteList);
        }
      }
    };

    this.createNewNote = function(){
      var noteText = document.getElementById('new_note_textarea').value;
      var newNote = new note(noteText);
      appNoteList.pushNote(newNote);
    };

    this.clearForm = function() {
      var element = document.getElementById('new_note_textarea');
      element.value = "";
    };
  }


  //Export app constructor to window
  exports.app = App;

})(this);

var notesApp = new app();
var appNoteList = new noteList();
//EVENTS
window.onhashchange = notesApp.handleHashChange;
