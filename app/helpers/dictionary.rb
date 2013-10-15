require 'net/http'
require 'rexml/document'

def fetch(url)
  uri = URI.parse(url)
  xml_data = Net::HTTP.get_response(uri).body
end

def extract_syllable_count(xml_data)
  doc = REXML::Document.new(xml_data)
  hws = []
  doc.elements.each('entry_list/entry/hw') do |ele|
    hws << ele.text
  end
  count_asterisks(hws.first)
end

def count_asterisks(dictionary_string)
  p dictionary_string.split('*').count.to_s
end