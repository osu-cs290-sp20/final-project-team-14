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
        listings: listings_data
    });

});

app.get('/requests', function (req, res) {

  res.status(200).render('page', {
    pageTitle: "Requests",
    listings: requests_data
  });

});

app.get('/listings/:user', function (req, res) {

  res.status(200).render('page', {
    pageTitle: "My Requests",
    listings: listings_data.filter(function(obj) {
      return obj.user == req.params.user;
    })
  });

});

app.get('/requests/:user', function (req, res) {

  res.status(200).render('page', {
    pageTitle: "My Requests",
    listings: requests_data.filter(function(obj) {
      return obj.user == req.params.user;
    })
  });

});

app.get('/about', function (req, res) {

  res.status(200).render('aboutPage');

});

app.listen(port, function() {

    console.log("Server is listening on port: ", port);

});
