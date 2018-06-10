require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var inquirer = require('inquirer');

var keys = require('./keys.js');
var input = process.argv[2];

//These two below will be used to GET data from api's
var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);
var fs = require('fs');

/////////////////////////////////////////////////////


var text = '';




// * `my-tweets`
// if (input === 'my-tweets') {
var params = {
    count: 20
}
// var myTweets =
function getTweets() {
    twitter.get('statuses/user_timeline', params, results);

    function results(err, data, response) {
        for (var i = 0; i < params.count; i++) {
            var tweet = data[i].text;
            var created = data[i].created_at
            console.log(tweet + ' created at ' + created);
            text += tweet + ' created at ' + created + '\r\n'
            logText();
            text = ''
        };
    }
}
// }

//on node command, run function myTweets  to create last 20 tweets


// * `spotify-this-song`
// if (input === 'spotify-this-song') {
var spotifyThis = '';
// for (var i = 3; i < process.argv.length; i++) {
//     spotifyThis = spotifyThis + process.argv[i] + ' ';
// }
// console.log(spotifyThis)
// var spotifyMe =
function spotifyMe() {
    spotify.search({
        type: 'track',
        query: spotifyThis,
        limit: 1
    }, function (err, data) {
        if (err) {
            return console.log('error occurred: ' + err);
        } else if (spotifyThis !== '') {
            console.log('Album Name: ' + data.tracks.items[0].album.name);
            console.log('Artist: ' + data.tracks.items[0].artists[0].name); //name
            console.log('Song name: ' + data.tracks.items[0].name); //song
            console.log('Click this link to preview the track: ' + data.tracks.items[0].preview_url);
            // console.log(JSON.stringify(data.tracks.items.preview_url, null, 2))
            console.log('Click this link to log in to Spotify and play the track: ' + data.tracks.items[0].external_urls.spotify)
            text += 'Album Name: ' + data.tracks.items[0].album.name + '\r\n' + 'Artist: ' + data.tracks.items[0].artists[0].name + '\r\n' + 'Song name: ' + data.tracks.items[0].name + '\r\n' + 'Click this link to preview the track: ' + data.tracks.items[0].preview_url + '.\r\n'
            logText();
            text = ''
        } else if (spotifyThis === '') {
            spotify.search({
                type: 'The Sign',
                query : spotifyThis,
                artist : 'Ace of Base',
                limit: 1
            }, function (err, data) {
                console.log('Album Name: ' + data.tracks.items[0].album.name + '\r\n' + 'Artist: ' + data.tracks.items[0].artists[0].name + '\r\n' + 'Song name: ' + data.tracks.items[0].name + '\r\n' + 'Click this link to preview the track: ' + data.tracks.items[0].preview_url + '.\r\n');
                logText();
                text =''
            })
        }
    });
}
// }




// * `movie-this`

// if (input === 'movie-this') {
var omdb = require('request');
var searchInput = '';
// for (var i = 3; i < process.argv.length; i++) {
//     if (i > 3 && i < process.argv.length) {
//         searchInput = searchInput + '+' + process.argv[i];
//     } else {
//         searchInput += process.argv[i];
//     }
// }
// searchInput.slice(0, -1);
// console.log(searchInput);



function searchMovie() {
        if (searchInput !== '') {
            queryURL = 'http://www.omdbapi.com/?apikey=trilogy&t=' + searchInput + '&y=&plot=short';

            omdb(queryURL, function (error, response, data) {
            // console.log(JSON.parse(data));
            var info = JSON.parse(data);
            console.log(info.Title + ' was released on ' + info.Released + '. IMDB rated it a ' + info.Ratings[0].Value + ', but Rotten Tomatoes rated it a ' + info.Ratings[1].Value + '. The movie was produced in the ' + info.Country + '. The movie can be watched in the following languages: ' + info.Language + '. \r\n You can read a short synopsis here: \n\r' + info.Plot + '\r\n\ Featured actors are : \n\r' + info.Actors + '.');
            // console.log(data.)
            text += info.Title + ' was released on ' + info.Released + '. IMDB rated it a ' + info.Ratings[0].Value + ', but Rotten Tomatoes rated it a ' + info.Ratings[1].Value + '. The movie was produced in the ' + info.Country + '. The movie can be watched in the following languages: ' + info.Language + '. \r\n You can read a short synopsis here: ' + info.Plot + '\r\n\ Featured actors are : ' + info.Actors + '. \r\n'
            logText();
            text = ''
            })
        } else if (searchInput === '') {
            {
                queryURL = 'http://www.omdbapi.com/?apikey=trilogy&t=Mr.+Nobody&y=&plot=short'
                omdb(queryURL, function (error, response, data) {
                    var info = JSON.parse(data);
                    console.log(info.Title + ' was released on ' + info.Released + '. IMDB rated it a ' + info.Ratings[0].Value + ', but Rotten Tomatoes rated it a ' + info.Ratings[1].Value + '. The movie was produced in the ' + info.Country + '. The movie can be watched in the following languages: ' + info.Language + '.');
                    console.log('You can read a short synopsis here: \n\r' + info.Plot);
                    console.log('Featured actors are : \n\r' + info.Actors + '.');
                    text += info.Title + ' was released on ' + info.Released + '. IMDB rated it a ' + info.Ratings[0].Value + ', but Rotten Tomatoes rated it a ' + info.Ratings[1].Value + '. The movie was produced in the ' + info.Country + '. The movie can be watched in the following languages: ' + info.Language + '. \r\n You can read a short synopsis here: ' + info.Plot + '\r\n\ Featured actors are : ' + info.Actors + '. \r\n'
                    logText();
                    text = ''
                })

            }


        }
}

// }




// * `do-what-it-says`
// if (input === 'do-what-it-says') {

function whatever() {
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
                        text += 'Album Name: ' + data.tracks.items[0].album.name + '\r\n Artist: ' + data.tracks.items[0].artists[0].name + '\r\n Song name: ' + data.tracks.items[0].name + '\r\n Click this link to preview the track: ' + data.tracks.items[0].preview_url + '.\r\n'
                        logText();
                        text = ''
                    };
                });
            };
        };
    });
}

// Bonus attempt

function logText() {
    fs.appendFile('log.txt', text, function (error) {
        if (error) {
            console.log('Something went wrong: ' + error);
        } else {
            console.log('Yay');
        }
    });
}


inquirer.prompt([{
    type: 'list',
    message: 'Choose which command to execute.',
    choices: ['Twitter', 'Spotify', 'Movie', 'Whatever'],
    name: 'list'
}]).then(function (results) {
    if (results.list === 'Twitter') {
        getTweets();
    } else if (results.list === 'Spotify') {
        inquirer.prompt([{
            type: 'input',
            message: 'What song do you want to look for?',
            name: 'searchSong'
        }]).then(function (spotifySearch) {
            spotifyThis = spotifySearch.searchSong;
            spotifyMe();
        })

    } else if (results.list === 'Movie') {
        inquirer.prompt([{
            type: 'input',
            message: 'What movie do you want to look for?',
            name: 'movieInput'
        }]).then(function (movieSearch) {

            searchInput = movieSearch.movieInput;
            searchMovie();
        })
    } else {
        whatever();
    }
})