(function(exports) {

  function NoteList(){
    this._notes = [];
  };

  NoteList.prototype.pushNote = function(note){
    this._notes.push(note)
  };

  NoteList.prototype.getNotes = function() {
    return this._notes;
  };
  exports.noteList = NoteList;

})(this);
