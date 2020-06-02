var express = require('express');

var app = express();
var port = process.env.port || 3000;

app.get('/', function(req, res) {

    res.status(200).write("Hello, viewer!");
    res.send();
    
});

app.listen(port, function() {

    console.log("Server is listening on port: ", port);

});