var express = require('express');
var app = express();

var Xray = require('x-ray');
var x = Xray();

var Promise  = require('bluebird');
var request = require('request');

var debug = true;

app.get('/', function (req,res){

    if(debug) console.log('Page requested!');

    var username = 'medicengonzo';
    var pages = 3;

    var scrapeMovies = function(){
	    if(debug) console.log('scrapeMovies()');
	    return new Promise((resolve,reject) => {
		    x('https://letterboxd.com/'+username+'/watchlist/', 'li.poster-container', [{
				    title: 'img@alt'
				    }])((err, results) => {
				    console.log('x()');
			    if(err) reject(err);
			    resolve(results);
		    })
		    .paginate('.paginate-current+li a@href')
		    .limit(pages);

	    });
    };

    scrapeMovies().then(
		    movies => {
	    if(debug) console.log('scrapeMovies() resolved');
	    return new Promise.all(movies.map((movie, index) => {
		    return new Promise((resolve, reject)=> {
			    if(debug) console.log('Requesting: ', movie.title);
			    request('http://netflixroulette.net/api/api.php?title='+encodeURIComponent(movie.title), (err, response, body) => {
					    if(debug) console.log('Flixroulette requested');
					    var flixMovie = JSON.parse(body);
					    if(flixMovie.errorcode != 404){
						    resolve('Movie found: '+flixMovie.show_title, 'ID: '+flixMovie.show_id);
					    }
					   else{
						    resolve('No movie found...');
					    }
			    });
		    });
	    }));
    }).then((movies) => res.send(movies)).catch((err) => console.log(err));

});

app.listen(3000, function(){
    console.log('Listening on port 3000!');
});
