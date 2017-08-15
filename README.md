# LIRI

LIRI us a Node app that takes input from the command line to determine which function to call, then uses inquirer to walk the user through that function to return the desired results. After each command is run it is written to a log file.

Liri is called using node liri.js and one of the following options:
## my-tweets

Uses the Twitter API to retrieve the 20 most recent tweets from a specified user, or returns the 20 most recent from the default account if no username is entered.

![Get Tweets](/demo-gifs/call-tweets.gif)
## spotify-this-song

Calls the Spotify API to retrieve the top 10 responses to a users request. If no artist or song is specified LIRI makes a call for The Sign by Ace of Base.

![Check Spotify](/demo-gifs/call-spotify.gif)
## movie-this

Calls on the OMDB API to retrieve infomation on a given movie. If no movie is specified, it will instead call for Mr. Nobody.

![Get Movie Info](/demo-gifs/call-movie.gif)
## do-what-it-says

Reads a text file for a command and the values it requires.

![Get Command From File](/demo-gifs/call-text.gif)

## Live Demo:

<a href="http://www.youtube.com/watch?feature=player_embedded&v=XfLck-LdYcg
" target="_blank"><img src="http://img.youtube.com/vi/XfLck-LdYcg/0.jpg" 
alt="LIRI Demo" width="700" height="392" border="10" /></a>

## Code Walkthrough:

<a href="http://www.youtube.com/watch?feature=player_embedded&v=JwFwQR2xckA
" target="_blank"><img src="http://img.youtube.com/vi/JwFwQR2xckA/0.jpg" 
alt="LIRI Code Walkthrough" width="700" height="392" border="10" /></a>
