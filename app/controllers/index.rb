# GET ===============================

get '/' do
  session.clear
  if tweets_stale?
    destroy_tweets
    get_tweets
  end
  @haiku = Haiku.order("tweeted_at").last
  erb :index
end

get '/login' do
  # the `request_token` method is defined in `app/helpers/oauth.rb`
  redirect request_token.authorize_url
end

get '/auth' do
  # the `request_token` method is defined in `app/helpers/oauth.rb`
  @access_token = request_token.get_access_token(:oauth_verifier => params[:oauth_verifier])
  session.delete(:request_token)

  tweeter = Twitter::Client.new(:oauth_token => @access_token.params[:oauth_token],
                                :oauth_token_secret => @access_token.params[:oauth_token_secret]
                                )
  tweeter.update(session[:tweet] + "(made with @maikuapp)")

  @haiku = Haiku.order("tweeted_at").last
  @feedback = "true"
  erb :index
end

get '/syllables/:word' do
  cross_origin :allow_origin => "http://www.dictionaryapi.com",
  :allow_methods => [:get]
  content_type :xml
  headers['Access-Control-Allow-Origin'] = 'http://www.dictionaryapi.com'
  redirect "http://www.dictionaryapi.com/api/v1/references/collegiate/xml/#{params[:word]}?key=7e46a4ea-6306-44a5-b73e-512180dd0374"
end


# POST ==============================

post '/' do
  @tweet = <<-TWEET
#{params[:poem][:line_one]}
#{params[:poem][:line_two]}
#{params[:poem][:line_three]}
  TWEET
  if request.xhr?
    Twitter.update(@tweet)  
    @haiku = Haiku.last
    erb :_poem_layout, layout: false
  else
    session[:tweet] = @tweet
    redirect '/login'
  end
end
