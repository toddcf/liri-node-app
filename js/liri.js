// Write the code you need to grab the data from keys.js.

var client 			= require('./keys');

// Then store the keys in a variable.

var twitter 		= require('twitter');
var twitterClient 	= new twitter(client);
var params			= {q: 'liri_tester', count:20};
var spotify 		= require('spotify');
var request			= require('request');
var fs				= require('fs');
var argvArray		= process.argv;
var command 		= process.argv[2];
var title 			= argvArray.slice(3);
var titleCombined	= title.join(" ");
var toAppend		= command + " " + titleCombined + ",";

// Make it so liri.js can take one of the following commands:

/** `my-tweets`

* `spotify-this-song`

* `movie-this`

* `do-what-it-says`*/


// Twitter:
if (command == 'my-tweets') {
	twitterClient.get('search/tweets', params, function(error, data, response) {
		var tweets = data.statuses;
		// For loop to get the last 20 tweets along with their date and time:
		for (var i = 0; i < 20; i++) {
			console.log("Tweet: " + tweets[i].text + " on: " + tweets[i].created_at);
		}
	});
}

// Spotify:
else if (command == 'spotify-this-song') {
	// If search field is left blank, default to Ace of Base "The Sign."
	if (titleCombined == '') {
		// Is this the correct search format??
		titleCombined = 'The Sign Ace of Base';
	}
	spotify.search(type: 'track', query: 'titleCombined', function(err, data) {
		// If there is an error, logs it and stops running:
		if (err) {
			console.log("Error occurred: " + err);
			// Stops running the program if there was an error:
			return;
		}
		// If there is no error, executes the search:
		else {
			// Artist:
			console.log("Artist: " + JSON.stringify(data.tracks.items[0].artists[0].name, null, 3));
			// Track Title:
			console.log("Track: " + JSON.stringify(data.tracks.items[0].name, null, 3));
			// Preview Link:
			console.log("Preview Link: " + JSON.stringify(data.tracks.items[0].preview_url, null, 3));
			// Album:
			console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name, null, 3));
		}
	});
}

// Movies:
else if (command == 'movie-this') {
	// If search field is left blank, default to "Mr. Nobody."
	if (titleCombined == '') {
		titleCombined = 'Mr Nobody';
	}
	// OMDB search:
	var queryURL = "http://www.omdbapi.com/?t=" + titleCombined + "&y=&plot=short&tomatoes=true&r=json";
	request(queryURL, function(error, response, body) {
		// If there is an error, log it and stop running:
		if (err) {
			console.log("Error occurred: " + err);
			// Stops running the program:
			return;
		}
		// If there is no error, executes the search:
		else if (!error && response.statusCode == 200) {
			// Title:
			console.log("Title: " + JSON.parse(body)["Title"]);
			// Release Year:
			console.log ("Release Year: " + JSON.parse(body)["Year"]);
			// IMDB Rating:
			console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
			// Country of Origin:
			console.log("Country of Origin: " + JSON.parse(body)["Country"]);
			// Language:
			console.log("Language: " + JSON.parse(body)["Language"]);
			// Plot:
			console.log("Synopsis: " + JSON.parse(body)["Plot"]);
			// Actors:
			console.log("Cast: " + JSON.parse(body)["Actors"]);
			// Rotten Tomatoes Rating:
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoUserRating"]);
			// Rotten Tomatoes URL:
			console.log("Rotten Tomatoes Link: " + JSON.parse(body)["tomatoURL"]);
		}
	});
}

// LIRI Commands:
else if (command == 'do-what-it-says') {
	// Uses fs to read the random.txt file:
	fs.readFile("random.txt", "utf8", function(error, data) {
		// If error, log and stop running:
		if(error) {
			return console.log("Error");
		}
		else {
			// Split contents of random.txt into array:
			dataArray = data.split(',');
			// First line of the array is the command:
			process.argv[2] = dataArray[0];
			// Second line of array is the song title:
			process.argv[3] = dataArray[1];

			if (process.argv[2] == 'spotify-this-song') {

			}
		}
	});
}