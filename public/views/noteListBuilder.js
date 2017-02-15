(function(exports) {
  var noteListBuilder = function(noteList){
    var element = document.getElementById('notes_list_ul');
    clearElement(element);

    noteList.getNotes().forEach(function(note){
      var li = "<a><li>"+note.getText().slice(0, 20)+"</li></a>";
      element.innerHTML += li;
    });
  };

  var clearElement = function(element){
    element.innerHTML = "";
  };

  exports.noteListBuilder = noteListBuilder;
  exports.clearElement = clearElement;

})(this);
