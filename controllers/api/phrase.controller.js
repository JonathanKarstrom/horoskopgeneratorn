var express = require('express');
var router = express.Router();
var service = require('services/phrase.service');

router.get('/', getAll);
router.post('/addphrase', addPhrase);
router.put('/updatephrase', updatePhrase);
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
    service.newPhrase(req.body.part,req.body.text);
    res.sendStatus(200);
}

function updatePhrase(req, res) {
    res.send(service.updatePhrase);
}

function deletePhrase(req, res) {
    res.send(service.deletePhrase(req.body.part,req.body.id));
}