const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Favorites = require('../models/favorite');

const favoriteRouter = express.Router();
var authenticate = require('../authenticate');
const cors = require('./cors');

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .get(cors.cors, (req, res, next) => {
    Favorites.find({})
      .populate('user')
      .populate('dishes')
      .then((favorites) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findById(req.params.dishId)
      .then((dish) => {
        if (dish != null) {
          req.body.author = req.user._id;
          dish.comments.push(req.body);
          dish.save()
            .then((dish) => {
              Dishes.findById(dish._id)
                .populate('comments.author')
                .then((dish) => {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.json(dish);
                })
            }, (err) => next(err));
        }
        else {
          err = new Error('Dish ' + req.params.dishId + ' not found');
          err.status = 404;
          return next(err);
        }
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .put(cors.corsWithOptions, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
  })
  .delete(cors.corsWithOptions, authenticate.verifyAdmin, (req, res, next) => {
    Favorites.remove({})
      .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
      }, (err) => next(err))
      .catch((err) => next(err));
  });

favoriteRouter.route('/:favoriteId')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .get(cors.cors, (req, res, next) => {
    Favorites.findById(req.params.favoriteId)
      .then((favorite) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /favorites/' + req.params.favoriteId);
  })
  .put(cors.corsWithOptions, authenticate.verifyAdmin, (req, res, next) => {
    Favorites.findByIdAndUpdate(req.params.favoriteId, {
      $set: req.body
    }, { new: true })
      .then((favorite) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .delete(cors.corsWithOptions, authenticate.verifyAdmin, (req, res, next) => {
    Favorites.findByIdAndRemove(req.params.favoriteId)
      .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
      }, (err) => next(err))
      .catch((err) => next(err));
  });

module.exports = favoriteRouter;
