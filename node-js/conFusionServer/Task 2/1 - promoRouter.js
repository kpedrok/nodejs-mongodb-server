const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();
const mongoose = require('mongoose');
const Promos = require('../models/promotions');
const assert = require('assert');
promoRouter.use(express.json());

promoRouter.route('/')
.get((req,res,next) => {
    Promos.find({})
    .then((promo) => {
        if(promo != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promo);
        }
        else {
            const err = new Error('Promo not found');
            err.statusCode = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post((req, res, next) => {
    Promos.create(req.body)
    .then(() =>{
        res.end('Will add the promo: ' + req.body.name + ' with details: ' + req.body.description);
    }, (err) => next(err))
    .catch((err) => next(err))
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promos');
})
.delete((req, res, next) => {
    Promos.find({})
    .then((promos) => {
        if(promos != null) {
            for (var i = (promos.length -1); i >= 0; i--) {
                promos[i].remove();
            }
        }
        res.end("Promotions are deleted");
    }, (err) => next(err))
    .catch((err) => next(err));
});

promoRouter.route('/:promoId')
.get((req,res,next) => {
    Promos.findById(req.params.promoId)
    .then((it) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(it);
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promos/'+ req.params.promoId);
})
.put((req, res, next) => {
    Promos.findByIdAndUpdate(req.params.promoId, {$set: {"name": req.body.name, "image": req.body.image, "label": req.body.label, "price": req.body.price, "description": req.body.description, "featured": req.body.featured}},{new: true}).exec()
    .then((promo) =>{
        promo.save();
    }, (err) => next(err))
    .then(() => {
        res.end('Done');
    }, (err) => next(err))
    .catch((err) => next(err))
})
.delete((req, res, next) => {
    Promos.findByIdAndRemove(req.params.promoId)
    .then(() =>{
        res.end('Success');
    }, (err) => next(err))
    .catch((err) => next(err))
});

module.exports = promoRouter;