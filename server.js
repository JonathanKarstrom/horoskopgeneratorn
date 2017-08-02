//dependencies for nodejs and expressjs
require('rootpath')();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonfile = require('jsonfile');
var horoscopeService = require('services/horoscope.service');
var phraseService = require('services/phrase.service');

// settings for express routing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/app', require('./controllers/app.controller'));
app.use('/api/horoscopes', require('./controllers/api/horoscope.controller'));
app.use('/api/phrases', require('./controllers/api/phrase.controller'));
app.use('/api/pendingphrases', require('./controllers/api/pendingPhrase.controller'));

app.get('/', function (req, res) {
    return res.redirect('/app');
});

//Variables used to create a random horoscope
var zodiacs = [];
var part1 = [];
var part2 = [];
var part3 = [];

//Max nr of seconds between update
var delay = 600;

getPhrases();

horoscopeService.getAll().then(function (result) {
    zodiacs = result;
});

var intervalFunction = function () {
    clearInterval(interval);
    newHoroskop();
    interval = setInterval(intervalFunction, delay * 1000);
};
var interval = setInterval(intervalFunction, delay * 1000);

var intervalFunction2 = function () {
    clearInterval(interval2);
    horoscopeService.getAll().then(function (result) {
        zodiacs = result;
    });
    getPhrases();
    for (var i = 0; i < zodiacs.length; i++) {
        if (zodiacs[i].likes < -4) {
            text = part1[Math.floor((Math.random() * part1.length))]
                + ". " + part2[Math.floor((Math.random() * part2.length))]
                + ". " + part3[Math.floor((Math.random() * part3.length))]+ ".";
            horoscopeService.updateText(zodiacs[i].name, text);
        }
    }
    interval2 = setInterval(intervalFunction2, 5000);
};
var interval2 = setInterval(intervalFunction2, 5000);

function newHoroskop() {

    getPhrases();
    horoscopeService.getAll().then(function (result) {
        zodiacs = result;
    });
    for (i = 0; i < zodiacs.length; i++) {
        text = part1[Math.floor((Math.random() * part1.length))]
            + ". " + part2[Math.floor((Math.random() * part2.length))]
            + ". " + part3[Math.floor((Math.random() * part3.length))]+ ".";
        horoscopeService.updateText(zodiacs[i].name, text);
    }
}

//function to get newest set of phrases from the db
function getPhrases() {
    phraseService.getAll().then(function (phrases) {
        for (var i = 0; i < phrases.length; i++) {
            if (phrases[i].name === 'part1') {
                part1 = phrases[i].phrases;
            }
            if (phrases[i].name === 'part2') {
                part2 = phrases[i].phrases;
            }
            if (phrases[i].name === 'part3') {
                part3 = phrases[i].phrases;

            }
        }
    });
}

var port = 8100;

// start server
var server = app.listen(process.env.PORT || port, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});


