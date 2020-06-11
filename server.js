var express = require('express');
var exphbs = require('express-handlebars');
var fs = require('fs');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;


var HttpOAuth2 = new XMLHttpRequest();
var oAuth2URL = "https://api.oregonstate.edu/oauth2/token";


var app = express();
var port = process.env.port || 3000;

var listings_data = require("./book_data/listings.json");
var requests_data = require("./book_data/requests.json");

var key_data;
try{
	key_data = require("./keys.json");
} catch (error){
	key_data = "";
}



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


app.get('/byClass', function (req, res) {
	if(key_data != ""){
		HttpOAuth2.open("POST", oAuth2URL, false);
		HttpOAuth2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
		HttpOAuth2.send( "client_id=" + key_data["consumerKey"] + "&client_secret=" + key_data["consumerSecret"] + "&grant_type=client_credentials");
	}
	res.status(200).render('search', {
		keys_exist: key_data != "",
		text: "Response from the textbook api give a 500 Internal server error response, so here is the OAuth2 call response instead:  \n" +  HttpOAuth2.responseText,
		pageTitle: "Class Search",
		logged_in: false,
	});	
});

app.get('/byClass/:user', function (req, res) {
	if(key_data != ""){
		HttpOAuth2.open("POST", oAuth2URL, false);
		HttpOAuth2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
		HttpOAuth2.send( "client_id=" + key_data["consumerKey"] + "&client_secret=" + key_data["consumerSecret"] + "&grant_type=client_credentials");
	}
	res.status(200).render('search', {
		keys_exist: key_data != "",
		text: "Response from the textbook api give a 500 Internal server error response, so here is the OAuth2 call response instead:  \n" +  HttpOAuth2.responseText,
		pageTitle: "Class Search",
		logged_in: true,
		user: req.params.user,
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
