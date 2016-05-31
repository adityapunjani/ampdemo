var express = require('express'),
    app = express(),
    http = require('http'),
    compression = require('compression'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    https = require('https'),
    port = process.env.PORT || 8080;

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);
app.use(compression());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/*', function (req, res) {
    res.end(fs.readFileSync('index.html'));
});

http.createServer(app).listen(port, function (err) {
    console.log('Express server running on port', port);
});