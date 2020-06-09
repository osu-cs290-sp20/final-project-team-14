var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
var port = process.env.port || 3000;

var listings_data = require("./book_data/listings.json");
var requests_data = require("./book_data/requests.json");

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(express.static('public'))

app.get('/', function(req, res) {

    res.status(200).render('page', {
        pageTitle: "Listings",
        listings: listings_data,
        logged_in: false,
        aboutPage: false
    });

});

app.get('/requests', function (req, res) {

  res.status(200).render('page', {
    pageTitle: "Requests",
    listings: requests_data,
    logged_in: false,
    aboutPage: false
  });

});

app.get('/listings/:user', function (req, res) {

  res.status(200).render('page', {
    pageTitle: "My Listings",
    listings: listings_data.filter(function(obj) {
      return obj.user == req.params.user;
    }),
    logged_in: true,
    user: req.params.user,
    aboutPage: false
  });

});

app.get('/requests/:user', function (req, res) {

  res.status(200).render('page', {
    pageTitle: "My Requests",
    listings: requests_data.filter(function(obj) {
      return obj.user == req.params.user;
    }),
    logged_in: true,
    user: req.params.user,
    aboutPage: false
  });

});

app.get('/home/:user', function (req, res) {

  res.status(200).render('page', {
    pageTitle: "Listings",
    listings: listings_data,
    logged_in: true,
    user: req.params.user,
    aboutPage: false
  });

});

app.get('/homeRequests/:user', function (req, res) {

  res.status(200).render('page', {
    pageTitle: "Requests",
    listings: requests_data,
    logged_in: true,
    user: req.params.user,
    aboutPage: false
  });

});

app.get('/about', function (req, res) {

  res.status(200).render('page', {
    pageTitle: "About",
    logged_in: false,
    aboutPage: true
  });

});

app.get('/about/:user', function (req, res) {

  res.status(200).render('page', {
    pageTitle: "About",
    logged_in: true,
    user: req.params.user,
    aboutPage: true
  });

});

app.listen(port, function() {

    console.log("Server is listening on port: ", port);

});
