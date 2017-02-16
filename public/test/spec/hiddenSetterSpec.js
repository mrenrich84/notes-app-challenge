describe("HiddenSetter", function(){

  it ("is expected to set class .hidden on an element which is not yet hidden", function(){
    var homePageDiv = document.getElementById("home_page_content");
    var noteContentDiv = document.getElementById("note_content");
    hiddenSetter("home_page_content");

    assert(homePageDiv.getAttribute('class')).toContain('hidden');
  });

  it ("It is expected to remove class .hidden on an element that is currently hidden", function(){

    var homePageDiv = document.getElementById("home_page_content");
    var noteContentDiv = document.getElementById("note_content");

    hiddenSetter("home_page_content");
    hiddenSetter("home_page_content");

    assert(homePageDiv.getAttribute('class')).toNotContain('hidden');

  });
});
