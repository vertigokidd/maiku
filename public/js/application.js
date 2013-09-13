

$(document).ready(function() {

// Give user feedback after AJAX request //

  $(".button").first().click(function(event){
    event.preventDefault();
    var poem_form = $(".poem-form").serialize();
    console.log(poem_form);
    $.post('/', poem_form, function(response){
      $(".selection").html(response);
      $("#userfeedback").fadeIn('slow').delay(2000).fadeOut('slow');
      $(".poem-form input").first().val("");
      $($(".poem-form input")[1]).val("");
      $($(".poem-form input")[2]).val("");
    });
  });

  // $("button").last().click(function(event){
  //   event.preventDefault();
  //   $.get('/login', function(data) {
  //     /*optional stuff to do after success */
  //   });
  // });


// Count Syllables Using Word Object and Chaining Methods //

  function returnCount(words, count) {
    totalSyllables = 0
    for (var i=0;i<words.length;i++){
      words[i] = new Word(words[i])
      totalSyllables += words[i].findLy().findEd().findTailEs().markSilentEs().markConsCombos().markVowelCombos().markRemainingVowels().countSyllables();
    }
    return (count - totalSyllables)
  }

// Live Document Checking //

  $("#lineOne").keyup(function(){
    var line = $(this).val();
    words = line.split(/[ ,]+/);
    $("#lineOneCount").html("<p>Syllables Remaining: " + returnCount(words, 5) + "</p>");
  });

  $("#lineTwo").keyup(function(){
    var line = $(this).val();
    words = line.split(/[ ,]+/);
    $("#lineTwoCount").html("<p>Syllables Remaining: " + returnCount(words, 7) + "</p>");
  });

  $("#lineThree").keyup(function(){
    var line = $(this).val();
    words = line.split(/[ ,]+/);
    $("#lineThreeCount").html("<p>Syllables Remaining: " + returnCount(words, 5) + "</p>");
  });

// Word object and object methods //
// Adapted from Ruby-Syllable Counter //
// https://github.com/testobsessed/Ruby-Syllable-Counter //

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

  Word.prototype.findTailEs = function(){
    var es = new RegExp("me$|ce$|se$|re$", "ig");
    if (es.test(this.word)) {
      this.word = this.word.replace(es, "")
      this.suffixBonus = 0;
    }
    return this;
  }

  Word.prototype.markVowelCombos = function(){
    var vowelCombos = new RegExp("you|yea|iou|eau|oe|ai|au|ay|ey|ea|ee|ie|ei|oa|oi|oo|ou|ui|oy", "ig");
    this.word = this.word.replace(vowelCombos, "@");
    return this;
  }

  Word.prototype.markConsCombos = function(){
    var consCombos = new RegExp("qu|ng|ch|rt|[#{" + consonants + "}h]", "ig");
    this.word = this.word.replace(consCombos, "=");
    return this;
  }

  Word.prototype.markSilentEs = function(){
    var silentE = new RegExp("[#{vowels}@][#{consonants}=]e[#{consonants}=]|[#{vowels}@][#{consonants}=]e$", "ig");
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