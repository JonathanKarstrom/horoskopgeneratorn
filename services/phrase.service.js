var config = require('config.json');
var mongo = require('mongoskin');
var Q = require('q');
var db = require('mongoskin').db(config.connectionString, { native_parser: true });
db.bind('phrases');

var service = {};

service.getAll = getAll;
service.newPhrase = newPhrase;
service.updatePhrase = updatePhrase;
service.deletePhrase = deletePhrase;

module.exports = service;

function getAll() {
    var deferred = Q.defer();

    db.collection('phrases').find().toArray(function (err,phrases){
        if(err) deferred.reject(err.name + ': '+err.message);
        deferred.resolve(phrases);
    });
    return deferred.promise;
}

function newPhrase(id,text) {
    db.collection('phrases').update({name:id}, {$push:{phrases:text}}, function(err, result) {
    if (err) console.log('error while addning new phrases!');
  });
}
    

function updatePhrase() {
    return "not implemented yet";
    /*
     var deferred = Q.defer();

     db.users.find().toArray(function (err,users){
     if(err) deferred.reject(err.name + ': '+err.message);
     deferred.resolve(users);
     });

     return deferred.promise;
     */
}

function deletePhrase() {
    return "not implemented yet";
    /*
     var deferred = Q.defer();

     db.users.find().toArray(function (err,users){
     if(err) deferred.reject(err.name + ': '+err.message);
     deferred.resolve(users);
     });

     return deferred.promise;
     */
}


