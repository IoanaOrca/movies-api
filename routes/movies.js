'use strict'
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Movie = require('../models/movie')

/* GET home page. */
router.get('/', (req, res, next) => {
  Movie.find ({})
  .then((result) => {
    res.json(result)
  })
  .catch(next)
});

router.post('/', (req, res, next) => {
  //throw new Error('fast');
  const title = req.body.title;
  const year = Number(req.body.year);
  const posterUrl = req.body.posterUrl;

  if (!title || !year || !posterUrl){
    return res.status(422).json({code: 'unprocessable-entity'});
  }

  //check if the name is already in use

  const newMovie = new Movie({title, year, posterUrl});

  newMovie.save()
  .then((result) => {
    res.status(201).json({code: 'okey'})
  })
  .catch(next);
});

router.get('/:id', (req, res, next) => {
  Movie.findById (req.params.id)
  .then((result) => {
    res.json(result)
  })
  .catch(next)
});

router.put('/:id', (req, res, next) => {

// if not mongoose type
if (!mongoose.Types.ObjectId.isValid(req.params.id))  {
  return res.status(422).json({code : 'unprocessable-entity'})
}

  const newData = {
    title: req.body.title,
    posterUrl: req.body.posterUrl,
    year: req.body.year
  }

  //update the new one from mogoose --without user experience
  const options ={
    new: true
  }
  //if there is no movie with this id
  Movie.findById(req.params.id)
  .then((result) => {
    if(!result) {
      return res.status(404).json({code: 'not-found'});
    }
    
    result.title=newData.title;
    result.year=newData.year;
    result.posterUrl=newData.posterUrl;
    result.save()
    .then(()=> {
      res.json(result);
    })
    .catch(next);
  })
  .catch(next)
});


router.delete('/:id', (req, res, next) =>{

// if not mongoose type
if (!mongoose.Types.ObjectId.isValid(req.params.id))  {
  return res.status(422).json({code : 'unprocessable-entity'})
}

  //if there is no movie with this id
  Movie.findById(req.params.id)
  .then((result) => {
    if(!result) {
      return res.status(404).json({code: 'not-found'});
    }
    
    result.remove()
    .then(()=> {
      res.json(result);
    })
    .catch(next);
  })
  .catch(next)
});



module.exports = router;
