//Set Up important modules
var Promise  = require('bluebird');
var request = require('request');
var path = require('path');

//Set Up x-ray for scraping
var Xray = require('x-ray');
var x = Xray();

//Setup express server
var express = require('express');
var app = express();
var exphbs = require('express-handlebars');

app.engine('handlebars',exphbs({
	defaultLayout: 'main',
	helpers: {
		nextRow: function(index_count, block){
			if(parseInt(index_count)%3 === 0){
				return block.fn(this);
			}
		}
	}
}));

app.set('view engine', 'handlebars');

var debug = true;

app.get('/list', function (req,res){

    if(debug) console.log('Page requested!');

    var username = ((req.query.user) ? req.query.user : 'medicengonzo');
    var pages = 3;

    if(debug) console.log(username);
    if(debug) console.log(req.query.user);

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
						    var outMovie = (({show_title,show_id,poster})=> ({show_title, show_id, poster}))(flixMovie);
						    outMovie.found = true;
						    resolve(outMovie);
					    }
					   else{
						   var missing_movie = {show_title: movie.title, found:false, errmsg: 'This movie wasn\'t found', poster:'https://cdn.amctheatres.com/Media/Default/Images/noposter.jpg'};
						    resolve(missing_movie);
					    }
			    });
		    });
	    }));
    }).then((movies_data) => {
	    res.render('main', {movies: movies_data}, (err,html) =>{
		    console.log('rendering');
		    console.log(movies_data);
		    res.send(html);
	    });
    }).catch((err) => console.log(err));

});

app.listen(3000, function(){
    console.log('Listening on port 3000!');
});
