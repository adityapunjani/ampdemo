"use strict";
var express = require('express'),
    app = express(),
    http = require('http'),
    compression = require('compression'),
    fs = require('fs'),
    path = require('path'),
    https = require('https'),
    port = process.env.PORT || 8080;

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

require('marko/hot-reload').enable();
var template = require('marko').load(require.resolve('./template.marko'));
//app.use(allowCrossDomain);
app.use(compression());


require('fs').watch(__dirname, function (event, filename) {
    if (/\.marko$/.test(filename)) {
        // Resolve the filename to a full template path:
        var templatePath = path.join(__dirname, filename);

        console.log('Marko template modified: ', templatePath);

        // Pass along the *full* template path to marko
        require('marko/hot-reload').handleFileModified(templatePath);
    }
});

app.get('/search.html', function (req, res) {
    res.set('content-type', 'text/html; charset=UTF-8');
    res.end(fs.readFileSync(path.join('search.html')));
});

app.get('/robots.txt', function (req, res) {
    res.write('User-agent: * ');
    res.end('Allow: /');
});

app.get('/*', function (req, res) {
    template.render({
        name: 'Moto g',
        count: 30
    },
    function(err, output) {
        if (err) {
            console.error('Rendering failed');
            return;
        }
 
        res.end(output);
    });
});

http.createServer(app).listen(port, function (err) {
    console.log('Express server running on port', port);
});