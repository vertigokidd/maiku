def get_tweets
  Twitter.user_timeline("maikuapp", count: 10)

end