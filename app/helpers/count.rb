# Written by Elisabeth Hendrickson, Quality Tree Software, Inc.
# Copyright (c) 2009 Quality Tree Software, Inc.
#
# This work is licensed under the 
# Creative Commons Attribution 3.0 United States License.
#
# To view a copy of this license, visit 
#      http://creativecommons.org/licenses/by/3.0/us/

def count_syllables(word)
  consonants = "bcdfghjklmnpqrstvwxz"
  vowels = "aeiouy"
  processed = word.downcase
  suffix_bonus = 0
  #puts "*** 0 #{processed}"
  if processed.match(/ly$/)
    suffix_bonus = 1
    processed.gsub!(/ly$/, "")
  end
  if processed.match(/[a-z]ed$/)
    # Not counting "ed" as an extra symbol. 
    # So 'blessed' is assumed to be said as 'blest'
    suffix_bonus = 0 
    processed.gsub!(/ed$/, "")
  end
  #puts "*** 1 #{processed}"
  processed.gsub!(/you|iou|eau|ai|au|ay|ea|ee|ei|oa|oi|oo|ou|ui|oy/, "@") #vowel combos
  #puts "*** 2 #{processed}"
  processed.gsub!(/qu|ng|ch|ce|rt|[#{consonants}h]/, "=") #consonant combos
  #puts "*** 3 #{processed}"
  processed.gsub!(/[#{vowels}@][#{consonants}=]e$/, "@|") # remove silent e
  #puts "*** 4 #{processed}"
  processed.gsub!(/[#{vowels}]/, "@") #all remaining vowels will be counted
  #puts "*** 5 #{processed}"
  return processed.count("@") + suffix_bonus
end

if __FILE__ == $0

p count_syllables('a') == 1
p count_syllables('at') == 1
p count_syllables('ion') == 2
p count_syllables('mister') == 2
p count_syllables('amsterdam') == 3
p count_syllables('lightning') == 2
p count_syllables('bureau') == 2
p count_syllables('aspiring') == 3
p count_syllables('you') == 1
p count_syllables('prince') == 1
p count_syllables("can't") == 1


"someday"
"amphibious"
"curiousity"

end
