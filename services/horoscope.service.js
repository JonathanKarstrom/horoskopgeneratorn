var config = require('config.json');
var mongo = require('mongoskin');
var Q = require('q');
var db = require('mongoskin').db(config.connectionString, { native_parser: true });
db.bind('zodicas');

var lastUpdated = new Date();


var service = {};

service.getAll = getAll;
service.upvote = upvote;
service.downvote = downvote;
service.updateText = updateText;
service.getLastUpdated = getLastUpdated;

module.exports = service;

function getAll() {
    var deferred = Q.defer();

    db.collection('zodiacs').find().toArray(function (err,zodiacs){
        if(err) deferred.reject(err.name + ': '+err.message);
        deferred.resolve(zodiacs);
    });

    return deferred.promise;
}

function updateText(id, text) {
    db.collection('zodiacs').update({name:id}, {$set:{text:text,likes:0}}, function(err, result) {
    if (err) console.log('error while updating horoscopes!');
    });
    lastUpdated = new Date();
}

function upvote(id) {
    db.collection('zodiacs').update({name:id}, {$inc:{likes:1}}, function(err, result) {
    if (err) console.log('error while voting!');
    });
}

function downvote(id) {
    db.collection('zodiacs').update({name:id}, {$inc:{likes:-1}}, function(err, result) {
    if (err) console.log('error while voting!');
    });
}

function getLastUpdated(){
    return lastUpdated;
}
