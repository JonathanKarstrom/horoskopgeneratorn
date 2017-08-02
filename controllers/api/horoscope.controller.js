var express = require('express');
var router = express.Router();
var service = require('services/horoscope.service');

router.get('/', getAll);
router.post('/upvote/:id', upvote);
router.post('/downvote/:id', downvote);
router.get('/lastupdated', getLastUpdated);

module.exports = router;

function getAll(req, res) {
    service.getAll()
        .then(function (zodiacs) {
        data ={
            zodiacs: zodiacs,
            date: new Date()
        };
            res.send(data);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });

}

function upvote(req, res) {
    service.upvote(req.params.id)
    res.sendStatus(200);
}

function downvote(req, res) {
    service.downvote(req.params.id)
    res.sendStatus(200);
}

function getLastUpdated(req, res) {
    res.send(service.getLastUpdated());
}