require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var keys = require('./keys.js');


//These two below will be used to GET data from api's
var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);
/////////////////////////////////////////////////////

var input = process.argv[2];
// console.log(spotify)
// console.log(twitter)

// var request = require('request');

// // * `my-tweets`
// // * This will show your last 20 tweets and when they were created at in your terminal/bash window.
// var params = {
//     count : 20
// }
// var myTweets = twitter.get('statuses/user_timeline', params, results);
// function results(err, data, response) {
//     for (var i  = 0; i < params.count; i++){
//         var tweet = data[i].text;
//         var created = data[i].created_at
//         console.log(tweet + ' created at ' + created);
//     }
// }
// //on node command, run function myTweets
// if (input === 'my-tweets') {
//     myTweets;
// }

// * `spotify-this-song`
//* This will show the following information about the song in your terminal/bash window
// * Artist(s) ------------------- 
// * The song's name
// * A preview link of the song from Spotify
// * The album that the song is from
// * If no song is provided then your program will default to "The Sign" by Ace of Base.

spotify.search({type : 'track', query: 'tiesto', limit: 2}, function(err,data) {
    if (err) {
        return console.log('error occurred: ' + err);
    } 
    // console.log(data.tracks.items[0].artists[0].name);
    console.log(data.tracks.items[0].artists[1].name); //name
    console.log(data.tracks.items[0].name); //song
    console.log(data.tracks.items[0].preview_url); //preview url of song
    console.log(data.tracks.items[0]);


    


  
});






// * `movie-this`

// * This will output the following information to your terminal/bash window:

// ```
//   * Title of the movie.
//   * Year the movie came out.
//   * IMDB Rating of the movie.
//   * Rotten Tomatoes Rating of the movie.
//   * Country where the movie was produced.
//   * Language of the movie.
//   * Plot of the movie.
//   * Actors in the movie.
// ```










// * `do-what-it-says`

// * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
// * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

// * Feel free to change the text in that document to test out the feature for other commands.