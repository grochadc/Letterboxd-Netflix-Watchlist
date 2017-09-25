var Promise = require('bluebird');
var fs = require('fs');
var path = require('path');

getFilenames = function(){
	return new Promise((resolve, reject) => {
		fs.readFile('filenames.txt', 'utf8', (err,data) => {
			if(err) reject(err);
			resolve(data);
		});
	});
};

getFilenames().then(fileNames =>  { 
	fileNames = fileNames.substr(0,fileNames.length-1).split(' ');
	return new Promise.all(fileNames.map(file => {
		return new Promise((resolve, reject) => {
			fs.readFile(path.join('./',file), 'utf8', (err, data) => {
				if (err) reject (err);
				resolve(data);
			});
		});
	}));
}).then(values => console.log(values)).catch((err) => console.log(err));
