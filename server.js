var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var fallback = require('express-history-api-fallback');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './')));
app.use('/node_modules', express.static(path.join(__dirname, './node_modules/')));

app.get('/', function(req, res) {
  res.render('./index.html');
});

app.listen(process.env.PORT || 3002, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

module.exports = app;
