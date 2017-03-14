var express = require('express');
var app = express();

app.use(express.static(__dirname + '/html'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/js'));


app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.listen(3000, function () {
});
