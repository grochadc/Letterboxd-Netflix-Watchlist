const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'list'}));
app.set('view engine', 'handlebars');

app.get('/list', function (req, res) {
	res.render(
			'list',
			{
				movies:[
					{title:'Finding Nemo'},
					{title:'Toy Story'},
					{title:'Wall-E'}
				],
				user: req.query.user
			},
		       	(err,html) => {
				if(err) throw err;
				res.send(html);
			}
	);
});

app.get('/login', (req, res)=> {
	var html = '<h1>Helloworld!</h1>';
	res.send(html);
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
