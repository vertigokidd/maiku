require 'net/http'

def fetch(url)
  uri = URI.parse(url)
  response = Net::HTTP.get_response(uri)
  p response.body
end