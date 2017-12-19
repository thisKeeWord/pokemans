var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var fallback = require('express-history-api-fallback');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './client')));
app.use('/node_modules', express.static(path.join(__dirname, './node_modules/')));
app.use(fallback('index.html', { root: __dirname + './client' }));



app.get('/', function(req, res) {
  res.render('index.html');
});


app.listen(3002);

module.exports = app;
