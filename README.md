# Maiku

A Ruby web app built using Sinatra that encourages people to write haikus.

# Installation

Clone the repo and download to your local machine. Run `bundle` and `rake funky` from the app's directory to create the database. Then run `shotgun` to start the local server. App will be hosted at `localhost:9393`.

# Twitter

Twitter posts are made using OAuth. For local tests, create a `twitter.yaml` file and save it in the `config` directory. The YAML file should contain the following lines:

>TWITTER_KEY: [YOUR_TWITTER_KEY]

>TWITTER_SECRET: [YOUR_TWITTER_SECRET]

>OAUTH_TOKEN: [YOUR_APP_OAUTH_TOKEN]

>OAUTH_TOKEN_SECRET: [YOUR_APP_OAUTH_SECRET]

Currently, users can post either using the app's Twitter account or their own.

# Syllable Counting

The Javascript algorithm is based largely on [testobssessed](https://github.com/testobsessed/Ruby-Syllable-Counter/blob/master/syllablecount_spec.rb)'s Ruby-Syllable Counter, but this has been translated for dynamic responsiveness.

Still, it is not wholly accurate. A more accurate version might involved using a dictionary API.
