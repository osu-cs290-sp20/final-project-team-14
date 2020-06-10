var express = require('express');
var exphbs = require('express-handlebars');
var fs = require('fs');

var app = express();
var port = process.env.port || 3000;

var listings_data = require("./book_data/listings.json");
var requests_data = require("./book_data/requests.json");

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(express.json());

app.get('/', function(req, res) {

    res.status(200).render('page', {
      pageTitle: "Listings",
      listings: listings_data,
      logged_in: false,
      aboutPage: false,
      createPostPage: false
    });

});

app.get('/requests', function (req, res) {

  res.status(200).render('page', {
    pageTitle: "Requests",
    listings: requests_data,
    logged_in: false,
    aboutPage: false,
    createPostPage: false
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
    aboutPage: false,
    createPostPage: false
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
    aboutPage: false,
    createPostPage: false
  });

});

app.get('/home/:user', function (req, res) {

  res.status(200).render('page', {
    pageTitle: "Listings",
    listings: listings_data,
    logged_in: true,
    user: req.params.user,
    aboutPage: false,
    createPostPage: false
  });

});

app.get('/homeRequests/:user', function (req, res) {

  res.status(200).render('page', {
    pageTitle: "Requests",
    listings: requests_data,
    logged_in: true,
    user: req.params.user,
    aboutPage: false,
    createPostPage: false
  });

});

app.get('/about', function (req, res) {

  res.status(200).render('page', {
    pageTitle: "About",
    logged_in: false,
    aboutPage: true,
    createPostPage: false
  });

});

app.get('/about/:user', function (req, res) {

  res.status(200).render('page', {
    pageTitle: "About",
    logged_in: true,
    user: req.params.user,
    aboutPage: true,
    createPostPage: false
  });

});

app.get('/createPost/:user', function (req, res) {

  res.status(200).render('page', {
    pageTitle: "Create Post",
    logged_in: true,
    user: req.params.user,
    aboutPage: false,
    createPostPage: true
  });

});

app.post('/addListing', function (req, res, next) {
  if(req.body && req.body.bookTitle && req.body.bookClass && req.body.bookCondition && req.body.bookPrice && req.body.contact && req.body.url && req.body.user) {
    listings_data.push({
      bookTitle: req.body.bookTitle,
      bookClass: req.body.bookClass,
      bookCondition: req.body.bookCondition,
      bookPrice: req.body.bookPrice,
      contact: req.body.contact,
      url: req.body.url,
      user: req.body.user,
      is_listing: req.body.is_listing
    });
    res.status(200).send("Listing added.");

    fs.writeFileSync('./book_data/listings.json', JSON.stringify(listings_data), 'utf8');
  }
  else {
    res.status(400).send("Bad request.");
  }
});

app.post('/addRequest', function (req, res, next) {
  if(req.body && req.body.bookTitle && req.body.bookClass && req.body.contact && req.body.url && req.body.user) {
    requests_data.push({
      bookTitle: req.body.bookTitle,
      bookClass: req.body.bookClass,
      contact: req.body.contact,
      url: req.body.url,
      user: req.body.user,
      is_listing: req.body.is_listing
    });
    res.status(200).send("Request added.");

    fs.writeFileSync('./book_data/requests.json', JSON.stringify(requests_data), 'utf8');
  }
  else {
    res.status(400).send("Bad request.");
  }
});

app.listen(port, function() {

    console.log("Server is listening on port: ", port);

});
