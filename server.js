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
            {name: "a"},
            {name: "b"}
        ]
    });
    
});

app.listen(port, function() {

    console.log("Server is listening on port: ", port);

});