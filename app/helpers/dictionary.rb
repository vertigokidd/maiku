require 'net/http'
require 'rexml/document'

def fetch(url)
  uri = URI.parse(url)
  xml_data = Net::HTTP.get_response(uri).body
  p xml_data
end

def extract_syllable_count(word, xml_data)
  doc = REXML::Document.new(xml_data)
  marked_words = []
  doc.elements.each('entry_list/entry/hw') do |ele|
    marked_words << ele.text if ele.text.delete('*') == word
  end
  doc.elements.each('entry_list/entry/in/if') do |ele|
    marked_words << ele.text if ele.text.delete('*') == word
  end
  count_asterisks(marked_words.first)
end

def count_asterisks(dictionary_string)
  p dictionary_string.split('*').count.to_s
end