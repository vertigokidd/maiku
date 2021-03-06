# GET ===============================

get '/' do
  session.clear
  if tweets_stale?
    destroy_tweets
    get_tweets
  end
  @haiku = Haiku.order("created_at DESC").last
  erb :index
end

get '/login' do
  # the `request_token` method is defined in `app/helpers/oauth.rb`
  redirect request_token.authorize_url
end

get '/auth' do
  # the `request_token` method is defined in `app/helpers/oauth.rb`
  @access_token = request_token.get_access_token(:oauth_verifier => params[:oauth_verifier])
  # our request token is only valid until we use it to get an access token, so let's delete it from our session
  session.delete(:request_token)
  # at this point in the code is where you'll need to create your user account and store the access token
  
  user_token = @access_token.params[:oauth_token]
  user_secret = @access_token.params[:oauth_token_secret]

  tweeter = Twitter::Client.new(:oauth_token => user_token,
                                :oauth_token_secret => user_secret
                                )
  tweeter.update(session[:tweet] + "(made with @maikuapp)")

  @haiku = Haiku.last
  @feedback = "true"
  erb :index
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
