// creating necessary requirements
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
var keys = require("./keys.js")
// new variables
var functionUsed = process.argv[2];
var twitterKeys = keys.twitterKeys;
var spotifyKeys = keys.spotifyKeys;
var searchTerms = process.argv.slice(3).toString();
console.log(searchTerms);

switch(functionUsed) {
    case "my-tweets":
        console.log("switch")
        myTweets()
        break;
    case "spotify-this-song":
        console.log("second switch")
        spotifyThisSong()
        break;
    case "movie-this":
        console.log("third switch")
        break;
    case "do-what-it-says":
        console.log("fourth switch")
        break;
}
// core functions
function myTweets() {
    console.log("running")
    // console.log(searchTerms + "1")
// import keys
    var client = new Twitter({
        consumer_key: twitterKeys.consumer_key,
        consumer_secret: twitterKeys.consumer_secret,
        access_token_key: twitterKeys.access_token_key,
        access_token_secret: twitterKeys.access_token_secret
    })
// set the user to searchTerms
    // if (searchTerms = undefined) {
    //     searchTerms = "lhocke";
    // } else {
    //     searchTerms = searchTerms
    // }
// grab the last 20 tweets and display with timestamps
    console.log(searchTerms)
    var params = {screen_name: searchTerms, count: "20"}
    // console.log(params)
    client.get('statuses/user_timeline', params, function(error, tweets, response){
        if (error) {
            return console.log('Error occurred: ' + error);
        }
        else{
            for (var i = 0; i < tweets.length; i++){
                console.log(i + 1 + ": " + tweets[i].text);
            }
        }
        // console.log(tweets);
    })
};

function spotifyThisSong() {
// import keys
    var spotify = new Spotify({
        id: spotifyKeys.client_id,
        secret: spotifyKeys.client_secret
    });

// construct objects for songs returned
    // var Song = function(artist, name, preview, album) {
    //     this
    // }
    if (searchTerms = undefined){
        searchTerms = 'The Sign'
        console.log(searchTerms)
    }
    // console.log(search)
    // console.log(typeOf)
    spotify.search({ type: 'track', query: searchTerms }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items[0].name);
        });
    }

// function movie-this() {
// connect to omdbapi and get json info
// default to Mr. Nobody if now user input

// output the following
// Title of the movie.

// Year the movie came out.

// IMDB Rating of the movie.

// Rotten Tomatoes Rating of the movie.

// Country where the movie was produced.

// Language of the movie.

// Plot of the movie.

// Actors in the movie.

// };

// function do-what-it-says() {
// fs.readFile("random.txt", "utf8", function(error, data){
//       if (error){
//         return console.log(error)
//       }
//       console.log(data)
// })

// };