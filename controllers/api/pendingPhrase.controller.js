var express = require('express');
var router = express.Router();
var service = require('services/pendingPhrase.service');

router.get('/', getAll);
router.post('/addphrase', addPhrase);
router.delete('/deletephrase', deletePhrase);

module.exports = router;

function getAll(req, res) {
        service.getAll()
        .then(function (phrases) {
            res.send(phrases);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function addPhrase(req, res) {
    if (req.body.phrase1) service.newPhrase("part1",req.body.phrase1);
    if (req.body.phrase2) service.newPhrase("part2",req.body.phrase2);
    if (req.body.phrase3) service.newPhrase("part3",req.body.phrase3);
    res.sendStatus(200);
}


function deletePhrase(req, res) {
    res.send(service.deletePhrase(req.body.part,req.body.id));
}