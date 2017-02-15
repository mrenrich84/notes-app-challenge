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
      }
    };

    this.createNewNote = function(){
      var noteText = document.getElementById('new_note_textarea').value;
      var newNote = new note(noteText);
      noteList.pushNote(newNote);
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
var noteList = new noteList();
//EVENTS
window.onhashchange = notesApp.handleHashChange;
