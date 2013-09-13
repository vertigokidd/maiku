def tweets_stale?
  item = Haiku.last
  now = Time.new
  if ((now - item.created_at) / 60) > 120
    true
  else 
    false
  end 
end

def get_tweets
  tweets = Twitter.user_timeline("maikuapp", count: 10)
  tweets.each do |tweet|
    Haiku.create(content: tweet.text,
                 tweeted_at: tweet.created_at)
  end
end

def destroy_tweets
  Haiku.destroy_all
end

def split_tweets(content)
  content.split("\n")
end