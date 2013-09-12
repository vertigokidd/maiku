

$(document).ready(function() {

  function countSyllables(word){
    
    var processed = word;
    var suffix_bonus = 0;
    return processed;
  }

  function returnCount(word, count) {
    return count - (word.length)
  }

  function countSyllable(word) {
    var consonants = "bcdfghjklmnpqrstvwxz";
    var vowels = "aeiouy";
    var processed = word;
    var vowelCombos = new RegExp("iou|eau|ai|au|ay|ea|ee|ei|oa|oi|oo|ou|ui|oy");
    var consCombos = new RegExp("qu|ng|ch|rt|[#{" + consonants + "}h]/")
    word = word.replace(vowelCombos, "@");
    word = word.replace(consCombos, "=");
    return word
  }

  $("#lineOne").keyup(function(){
    var lineOne = $(this).val();
    $("#lineOneSCount").html("<p>Syllables Remaining: " + returnCount(lineOne, 7) + "</p>");
  });

  $("#lineTwo").keyup(function(){
    var lineTwo = $(this).val();
    $("#lineTwoSCount").html("<p>Syllables Remaining: " + countSyllable(lineTwo) + "</p>");
  });






});