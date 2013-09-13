def get_tweets
  Twitter.user_timeline("maikuapp", count: 10)

end


def split_tweets(content)
  content.split("\n")
end