const Xray = require('x-ray');
const x = new Xray();

var request = require('request');
var yargs = require('yargs').argv

var username = yargs.user
var pages = yargs.pages

if(!username){
	username = 'medicengonzo'
	console.log('No username specified, looking for default: '+username)
}
else{
	console.log('Looking for username '+username)
}

if(!pages){
	pages = 3
	console.log('No number of pages to scrape sepcified, using default '+pages)
}
else{
	console.log('Scrapping '+pages+' page(s)')
}

x('https://letterboxd.com/'+username+'/watchlist/', 'li.poster-container', [{
		movie: 'img@alt'
}])(function (err,results){
	results.forEach(function(result, index){
		request('http://netflixroulette.net/api/api.php?title='+encodeURIComponent(result.movie),
		function(err, response, body){
			obj = JSON.parse(body)
			if(obj.errorcode != 404){
				
				console.log('Movie found: '+obj.show_title, 'ID: '+obj.show_id);
			}
		})
	})
})
.paginate('.paginate-current+li a@href')
.limit(pages)
