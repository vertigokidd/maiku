

$(document).ready(function() {

  function returnCount(word, count) {
    return count - (word.length)
  }


  var consonants = "bcdfghjklmnpqrstvwxz";
  var vowels = "aeiouy";

  function Word(word) {
    this.word = word
    this.suffixBonus = 0
  }

  Word.prototype.findLy = function() {
    var ly = new RegExp("ly$", "ig");
    if (ly.test(this.word)) {
      this.word = this.word.replace(ly, "");
      this.suffixBonus += 1;
    }
    return this;
  }

  Word.prototype.findEd = function(){
    var ed = new RegExp("[a-z]ed$", "ig");
    if (ed.test(this.word)) {
      this.word = this.word.replace(ed, "")
      this.suffixBonus = 0;
    }
    return this;
  }

  Word.prototype.markVowelCombos = function(){
    var vowelCombos = new RegExp("iou|eau|ai|au|ay|ea|ee|ei|oa|oi|oo|ou|ui|oy", "ig");
    this.word = this.word.replace(vowelCombos, "@");
    return this;
  }

  Word.prototype.markConsCombos = function(){
    var consCombos = new RegExp("qu|ng|ch|rt|[#{" + consonants + "}h]", "ig");
    this.word = this.word.replace(consCombos, "=");
    return this;
  }

  Word.prototype.markSilentEs = function(){
    var silentE = new RegExp("[#{" + vowels + "}@][#{" + consonants + "}=]e$", "ig");
    this.word = this.word.replace(silentE, "@|");
    return this;
  }

  Word.prototype.markRemainingVowels = function(){
    var remainingVowels = new RegExp("[#{" + vowels + "}]", "ig");
    this.word = this.word.replace(remainingVowels, "@");
    return this;
  }


  // function markSyllables(word) {
  //   markVowelCombos(word, function(response){
  //     return markConsCombos(response);
  //   });
  // }

  // function markVowelCombos(word, response) {
  //   var vowelCombos = new RegExp("iou|eau|ai|au|ay|ea|ee|ei|oa|oi|oo|ou|ui|oy");
  //   response = word.replace(vowelCombos, "@");
  //   return response;
  // }

  // function markConsCombos(word) {
  //   var consCombos = new RegExp("qu|ng|ch|rt|[#{" + consonants + "}h]");
  //   response = word.replace(consCombos, "=");
  //   return response
  // }

  // function marksilentEs(word) {
  //   var silentE = new RegExp("[#{" + vowels + "}@][#{" + consonants + "}=]e\$");
  //   response = word.replace(silentE, "@|");
  //   return response
  // }

  // function markRemainingVowels(word) {
  //   var remainingVowels = new RegExp("[#{" + vowels + "}]");
  //   return word.replace(remainingVowels, "@");  
  // }

  $("#lineOne").keyup(function(){
    var lineOne = $(this).val();
    $("#lineOneSCount").html("<p>Syllables Remaining: " + returnCount(lineOne, 7) + "</p>");
  });

  $("#lineTwo").keyup(function(){
    var lineTwo = $(this).val();
    $("#lineTwoSCount").html("<p>Syllables Remaining: " + markSyllables(lineTwo) + "</p>");
  });






});