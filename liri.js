// creating necessary requirements
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
var keys = require("./keys.js")
// new variables
var twitterKeys = keys.twitterKeys;
var spotifyKeys = keys.spotifyKeys;
// var keys = fs.readFile("keys.js");
// console.log(twitterKeys);
// console.log("----------------------")
// console.log(spotifyKeys)
var functionUsed = process.argv[2] + "()";
console.log(typeof(functionUsed))
// functionUsed

// core functions
function myTweets() {
	console.log("running")
// grab the last 20 tweets and display with timestamps
    var client = new Twitter({
        consumer_key: process.env.twitterKeys.consumer_key,
        consumer_secret: process.env.twitterKeys.consumer_secret,
        access_token_key: process.env.twitterKeys.access_token_key,
        access_token_secret: process.env.twitterKeys.access_token_secret,
    })
    client.get('search.tweets', {q: "from:lhocke", count: "20"}, function(error, tweets, response){
    	console.log(tweets);
    })
};

// function spotify-this-song() {

// };

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
// 	fs.readFile("random.txt", "utf8", function(error, data){
//       if (error){
//         return console.log(error)
//       }
//       console.log(data)
// 	})

// };