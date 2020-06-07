var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
var port = process.env.port || 3000;

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(express.static('public'))

app.get('/', function(req, res) {

    res.status(200).render('listingsPage', {
        listings: [
          {
            bookTitle: "Matrix and Power Series Methods",
            bookClass: "Math 264",
            bookCondition: "Great",
            bookPrice: "30",
            contact: "student123@oregonstate.edu",
            url: "https://images-na.ssl-images-amazon.com/images/I/5145i7M5WXL._SX384_BO1,204,203,200_.jpg"
          },
          {
            bookTitle: "Physics for Scientists and Engineers, 4th Edition",
            bookClass: "Physics 213",
            bookCondition: "Good",
            bookPrice: "50",
            contact: "123-456-7891",
            url: "https://images-na.ssl-images-amazon.com/images/I/51t2fjcF43L._SX412_BO1,204,203,200_.jpg"
          }
        ]
    });

});

app.get('/requests', function (req, res) {

  res.status(200).render('requestsPage', {
    requests: [
      {
        bookTitle: "Matrix and Power Series Methods",
        bookClass: "Math 264",
        contact: "student123@oregonstate.edu",
        url: "https://images-na.ssl-images-amazon.com/images/I/5145i7M5WXL._SX384_BO1,204,203,200_.jpg"
      },
      {
        bookTitle: "Physics for Scientists and Engineers, 4th Edition",
        bookClass: "Physics 213",
        contact: "123-456-7891",
        url: "https://images-na.ssl-images-amazon.com/images/I/51t2fjcF43L._SX412_BO1,204,203,200_.jpg"
      }
    ]
  });

});

app.listen(port, function() {

    console.log("Server is listening on port: ", port);

});
