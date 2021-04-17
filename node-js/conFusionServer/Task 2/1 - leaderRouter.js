const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
const mongoose = require('mongoose');
const Leaders = require('../models/leaders');
const assert = require('assert');
leaderRouter.use(express.json());

leaderRouter.route('/')
.get((req,res,next) => {
    Leaders.find({})
    .then((leader) => {
        if(leader != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
        }
        else {
            const err = new Error('Leader not found');
            err.statusCode = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post((req, res, next) => {
    Leaders.create(req.body)
    .then(() =>{
        res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
    }, (err) => next(err))
    .catch((err) => next(err))
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete((req, res, next) => {
    Leaders.find({})
    .then((leaders) => {
        if(leaders != null) {
            for (var i = (leaders.length -1); i >= 0; i--) {
                leaders[i].remove();
            }
        }
        res.end("Leaders are deleted");
    }, (err) => next(err))
    .catch((err) => next(err));
});

leaderRouter.route('/:leaderId')
.get((req,res,next) => {
    Leaders.findById(req.params.leaderId)
    .then((it) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(it);
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/'+ req.params.leaderId);
})
.put((req, res, next) => {
    Leaders.findByIdAndUpdate(req.params.leaderId, {$set: {"name": req.body.name, "image": req.body.image, "label": req.body.label, "price": req.body.price, "description": req.body.description, "featured": req.body.featured}},{new: true}).exec()
    .then((leader) =>{
        leader.save();
    }, (err) => next(err))
    .then(() => {
        res.end('Done');
    }, (err) => next(err))
    .catch((err) => next(err))
})
.delete((req, res, next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then(() =>{
        res.end('Success');
    }, (err) => next(err))
    .catch((err) => next(err))
});

module.exports = leaderRouter;