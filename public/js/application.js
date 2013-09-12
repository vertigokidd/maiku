

$(document).ready(function() {

  function returnCount(words, count) {
    totalSyllables = 0
    for (var i=0;i<words.length;i++){
      words[i] = new Word(words[i])
      totalSyllables += words[i].findLy().findEd().markVowelCombos().markConsCombos().markSilentEs().markRemainingVowels().countSyllables();
    }
    return (count - totalSyllables)
  }


// Live Document Checking //


  $("#lineOne").keyup(function(){
    var line = $(this).val();
    words = line.split(/[ ,]+/);
    $("#lineOneSCount").html("<p>Syllables Remaining: " + returnCount(words, 5) + "</p>");
  });

  $("#lineTwo").keyup(function(){
    var line = $(this).val();
    words = line.split(/[ ,]+/);
    $("#lineTwoSCount").html("<p>Syllables Remaining: " + returnCount(words, 7) + "</p>");
  });

  $("#lineThree").keyup(function(){
    var line = $(this).val();
    words = line.split(/[ ,]+/);
    $("#lineThreeSCount").html("<p>Syllables Remaining: " + returnCount(words, 5) + "</p>");
  });

// Word object and object methods //

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
    var vowelCombos = new RegExp("you|yea|iou|eau|ai|au|ay|ey|ea|ee|ei|oa|oi|oo|ou|ui|oy", "ig");
    this.word = this.word.replace(vowelCombos, "@");
    return this;
  }

  Word.prototype.markConsCombos = function(){
    var consCombos = new RegExp("qu|ce|ng|ch|rt|[#{" + consonants + "}h]", "ig");
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

  Word.prototype.countSyllables = function(){
    var goalCounter = RegExp("@", "g");
    var count = this.word.match(goalCounter);
    return count.length + this.suffixBonus;
  }



});