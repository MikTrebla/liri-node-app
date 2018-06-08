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


// // * `my-tweets`

var params = {
    count: 20
}
var myTweets = twitter.get('statuses/user_timeline', params, results);

function results(err, data, response) {
    for (var i = 0; i < params.count; i++) {
        var tweet = data[i].text;
        var created = data[i].created_at
        console.log(tweet + ' created at ' + created);
    }
}
//on node command, run function myTweets  to create last 20 tweets
if (input === 'my-tweets') {
    myTweets;
}

// * `spotify-this-song`
var spotifyThis = '';
for (var i = 3; i < process.argv.length; i++) {
    spotifyThis = spotifyThis + process.argv[i] ;
}


var spotifyMe = spotify.search({
    type: 'track',
    query: spotifyThis,
    limit: 2
}, function (err, data) {
    if (err) {
        // spotifyThis =  'the sign';
        // spotifyMe;
        // console.log('We coulodn\'t find what you were looking for. We suggest this song ' + data.tracks.items[0].name + ' by ' + data.tracks.items[0].artist[0].name);
        return console.log('error occurred: ' + err);
    } else {
        // console.log(data.tracks.items[0].artists[0].name);
        console.log('Artist: ' + data.tracks.items[0].artists[1].name); //name
        console.log('Song name: ' + data.tracks.items[0].name); //song
        console.log('Click this link to preview the track: ' + data.tracks.items[0].preview_url); //preview url of song
    }
});

if (input === 'spotify-this-song') {
    spotifyMe;
}





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