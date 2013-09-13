# GET ===============================

get '/' do
  random = rand(1..Haiku.count)
  @haiku = Haiku.find(random)
  # if @haiku.author[0] == "@"
  #   @author = @haiku.author
  #   @link = "http://twitter.com/#{@haiku.author[1..-1]}"
  # elsif @haiku.author != ""
  #   @author = @haiku.author
  # else
  #   @author = "anonymous"
  # end
  erb :index
end

# POST ==============================

post '/' do
  Haiku.create(params)
  tweet = <<-TWEET
#{params[:line_one]}
#{params[:line_two]}
#{params[:line_three]}
  TWEET
  Twitter.update(tweet)

  if request.xhr?
    random = rand(1..Haiku.count)
    @haiku = Haiku.find(random)
    erb :_poem_layout, layout: false
  else
    redirect '/'
  end
end
