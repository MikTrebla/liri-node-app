require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var keys = require('./keys.js');
var input = process.argv[2];

//These two below will be used to GET data from api's
var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);
var fs = require('fs');

/////////////////////////////////////////////////////






// // * `my-tweets`
if (input === 'my-tweets') {
    var params = {
        count: 20
    }
    var myTweets = twitter.get('statuses/user_timeline', params, results);

    function results(err, data, response) {
        for (var i = 0; i < params.count; i++) {
            var tweet = data[i].text;
            var created = data[i].created_at
            console.log(tweet + ' created at ' + created);
        };
    }
}

// //on node command, run function myTweets  to create last 20 tweets


// * `spotify-this-song`
if (input === 'spotify-this-song') {
    var spotifyThis = '';
    for (var i = 3; i < process.argv.length; i++) {
        spotifyThis = spotifyThis + process.argv[i] + ' ';
    }
    // console.log(spotifyThis)
    var spotifyMe = spotify.search({
        type: 'track',
        query: spotifyThis,
        limit: 1
    }, function (err, data) {
        if (err) {
            return console.log('error occurred: ' + err);
        } else {
            console.log('Album Name: ' + data.tracks.items[0].album.name);
            console.log('Artist: ' + data.tracks.items[0].artists[0].name); //name
            console.log('Song name: ' + data.tracks.items[0].name); //song
            console.log('Click this link to preview the track: ' + data.tracks.items[0].preview_url);
        }
    });
}




// * `movie-this`

if (input === 'movie-this') {
    var omdb = require('request');
    var searchInput = '';
    for (var i = 3; i < process.argv.length; i++) {
        if (i > 3 && i < process.argv.length) {
            searchInput = searchInput + '+' + process.argv[i];
        } else {
            searchInput += process.argv[i];
        }
    }
    searchInput.slice(0, -1);
    // console.log(searchInput);
    var queryURL = 'http://www.omdbapi.com/?apikey=trilogy&t=' + searchInput + '&y=&plot=short';

    omdb(queryURL, function (error, response, data) {
        if (!error && response.statusCode === 200) {
            // console.log(JSON.parse(data));
            var info = JSON.parse(data);
            console.log(info.Title + ' was released on ' + info.Released + '. IMDB rated it a ' + info.Ratings[0].Value + ', but Rotten Tomatoes rated it a ' + info.Ratings[1].Value + '. The movie was produced in the ' + info.Country + '. The movie can be watched in the following languages: ' + info.Language + '.');
            console.log('You can read a short synopsis here: \n\r' + info.Plot);
            console.log('Featured actors are : \n\r' + info.Actors + '.');
            // console.log(data.)
        }
    })
}




// * `do-what-it-says`
if (input === 'do-what-it-says') {

    fs.readFile('random.txt', 'utf8', function (error, data) {
        if (error) {
            return console.log('Error occurred: ' + error);
        } else {
            var splitData = data.split(','); // split random.txt into an array with 2 strings
            var input = splitData[0]; //set input to call Liri's command
            var spotifyThis = splitData[1]; //set query to song name
            if (input === 'spotify-this-song') {
                // console.log(input);
                // console.log(spotifyThis);
                spotify.search({
                    type: 'track',
                    query: spotifyThis,
                    limit: 1
                }, function (err, data) {
                    if (err) {
                        return console.log('error occurred: ' + err);
                    } else {
                        console.log('Album Name: ' + data.tracks.items[0].album.name);
                        console.log('Artist: ' + data.tracks.items[0].artists[0].name); //name
                        console.log('Song name: ' + data.tracks.items[0].name); //song
                        console.log('Click this link to preview the track: ' + data.tracks.items[0].preview_url);
                    };
                });
            };
        };
    });
};


//Bonus attempt
var text = '';

fs.appendFile('log.txt', text, function (error) {
    if (error) {
        console.log('Something went wrong: ' + error);
    } else {
        console.log('Yay');
    }
});