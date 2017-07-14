// creating necessary requirements
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var inquirer = require('inquirer');
var fs = require('fs');
var keys = require("./keys.js")

// new variables
var functionUsed = process.argv[2];
var twitterKeys = keys.twitterKeys;
var spotifyKeys = keys.spotifyKeys;
var searchTerms;
var song = "";
var band = "";
var count;

core()

function core() {
    switch(functionUsed) {
        case "my-tweets":
            myTweets()
            break;
        case "spotify-this-song":
            spotifyThisSong()
            break;
        case "movie-this":
            movieThis()
            break;
        case "do-what-it-says":
            doWhatItSays()
            break;
    }
}
// core functions
function myTweets() {
// import keys
    var client = new Twitter({
        consumer_key: twitterKeys.consumer_key,
        consumer_secret: twitterKeys.consumer_secret,
        access_token_key: twitterKeys.access_token_key,
        access_token_secret: twitterKeys.access_token_secret
    })
// grab the last 20 tweets and display with timestamps
    console.log("Let's get some tweets!")
    inquirer.prompt([
        // "Let's get some tweets!"
        {
            type: "input",
            message: "What twitter handle would you like to see? (do not use the @ symbol)",
            name: "twitterHandle"
            // validate: function(){

            // }
        }
    ]).then(function(twitterResponse){
        var params = {screen_name: twitterResponse.twitterHandle, count: "20"};
        var userName = twitterResponse.twitterHandle;
        client.get('statuses/user_timeline', params, function(error, tweets, response){
            if (error) {
                return console.log('Error occurred: ' + error);
            } else {
                console.log("\nTweets from: @" + userName + "\n")
                for (var i = 0; i < tweets.length; i++){
                    console.log(i + 1 + ": " + tweets[i].text + "\n    " + tweets[i].created_at + "\n-----------------------------------------------");
                }
            }
            // fs.appendFile('log.txt', "my-tweets (" + twitterResponse.twitterHandle + "), ")
        })
        fs.appendFile('log.txt', "my-tweets (" + userName + "), ")

    })

};

function spotifySearch() {
    // import keys
    var spotify = new Spotify({
        id: spotifyKeys.client_id,
        secret: spotifyKeys.client_secret
    });

    // run search
    spotify.search({ type: ['track'], query: song + " " + band, limit: count}, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var tracks = data.tracks.items;
        for (var i = 0; i < tracks.length; i++){
            console.log("inside loop")
            console.log("\nTrack Name: " + tracks[i].name + "\nArtist: " + tracks[i].artists[0].name + "\nPreview: " + tracks[i].preview_url + "\n------------------------------------------------\n");
        }
    })
}

function spotifyThisSong() {

// construct objects for songs returned
    if (searchTerms) {
        song = searchTerms;
        count = 1;
        spotifySearch()
    } else {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What song would you like?",
                name: "song"
            },
            {
                type: "input",
                message: "Which artist?",
                name: "band"
            }

        ]).then(function(spotifyResponse){
            if (!spotifyResponse.song && !spotifyResponse.band){
                song = "The Sign";
                band = "Ace of Base";
                count = 1
            } else {
                song = spotifyResponse.song;
                band = spotifyResponse.band;
                count = 10
            }
            fs.appendFile('log.txt', "spotify-this-song (" + song + "), ")
            spotifySearch()
        })
    }
}

function movieThis() {
// connect to omdbapi and get json info
// default to Mr. Nobody if no user input
inquirer
    .prompt([
        {
            name: "title",
            type: "input",
            message: "What movie would you like?"
        }
    ]).then(function(movieResponse){

            fs.appendFile('log.txt', "movie-this (" + movieResponse.title + "), ")

            var title;

            if (!movieResponse.title && !searchTerms){
                title = "mr+nobody";
            } else if (searchTerms){
                title = searchTerms.toLowerCase();
                title.replace(" ", "+");
            } else {
                title = movieResponse.title.toLowerCase();
                title.replace(" ", "+");
            };

            request('http://www.omdbapi.com/?apikey=40e9cece&s=' + title, function (error, response, body) {
            if (error) {
                console.log('error:', error);
            } else { 
            // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
            // Print the HTML for the Google homepage.
            // output the following:
                var bodyParse = JSON.parse(body);
                var results = bodyParse.Search;
                var movieID;

                for (var i = 0; i < results.length; i++){
                    movieID = results[i].imdbID;
                    request('http://www.omdbapi.com/?apikey=40e9cece&i=' + movieID, function (error, response, body) {
                        // console.log(JSON.parse(body, null, 2))
                        var newResults = JSON.parse(body)
                        // Title of the movie.
                        console.log("\nTitle: " + newResults.Title);

                        // Year the movie came out.
                        console.log("Year: " + newResults.Year);

                        // IMDB Rating of the movie.
                        console.log("IMDB Rating: " + newResults.imdbRating);

                        // Rotten Tomatoes Rating of the movie.
                        if (!newResults.Ratings[2]) {
                            console.log("Rotten Tomatoes: N/A");
                        } else {
                            console.log("Rotten Tomatoes: " + newResults.Ratings[2].Value);
                        }
                        // Country where the movie was produced.
                        console.log("Country: " + newResults.Country);

                        // Language of the movie.
                        console.log("Language: " + newResults.Language);

                        // Plot of the movie.
                        console.log("Plot: " + newResults.Plot);

                        // Actors in the movie.
                        console.log("Cast: " + newResults.Actors + "\n-------------------------------------------------\n")
                    })
                }
            }
        })

    })
};

function doWhatItSays() {
    fs.readFile('random.txt', 'utf8', function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
        return console.log(error);
    }

    var dataArr = data.split(',');
    if (dataArr[0] === "do-what-it-says"){
        return false;
    } else {
        functionUsed = dataArr[0];
        searchTerms = dataArr[1];
        searchTerms = searchTerms.slice(1,-1)
        fs.appendFile('log.txt', "do-what-it-says, ")
    }
    core();
    });
}