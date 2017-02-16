describe("domInjector", function(){

  var test_div = document.getElementById("note_content");

  it("Inserts given html string into element", function(){
    var string = "Test String";
    domInjector('note_content', string);
    assert(test_div.innerHTML).toContain(string);
  });
});
