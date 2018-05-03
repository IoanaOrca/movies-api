'use strict'
var express = require('express');
var router = express.Router();

const Movie = require('../models/movie')

/* GET home page. */
router.get('/', (req, res, next) => {
  Movie.find ({})
  .then((result) => {
    res.json(result)
  })
  .catch(next)
});

module.exports = router;
