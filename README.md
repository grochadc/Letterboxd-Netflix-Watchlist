# Letterboxd-Watchlist-Netflix
A simple web app that scrapes a letterboxd watchlist and returns the movies found on Netflix.

## Getting Started
First install all the dependencies: `npm install`

### Server
Start the server with `npm start` then open in a browser the page `http://localhost:3000/list`
By default it scrapes my watchlist but you can override this by calling `user` as an url parameter: `http://localhost:3000/list?user=username` where `username` is the letterboxd username.

### CLI
This repo also includes a `cli.js` file that takes two arguments `--user` and `--pages`. The first one is to pass the Letterboxd username and the second one to select how many pages in the watchlist are going to be scraped.

`node cli.js --user medicengonzo --pages 3`
