const knex = require('../db/knex.js');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  knex('trainers')
      .then((trainers)=>{
        res.render('trainers/index', {trainers});
      })
      .catch((err)=>{
        console.error(err);
      });


});

router.get('/player/:id', function(req, res, next) {

  knex('trainers')
        .leftJoin('pokemon','trainers.id', '=', 'trainer_id')
        .select('trainers.name','pokemon.id as pokemon_id','pokemon.name as pokemon_name', 'pokemon.trainer_id', 'pokemon.cp', 'pokemon.in_gym')
        .where('trainers.id', req.params.id)
        .then((trainer)=>{
          console.log(trainer)
          res.render(`trainers/player`, {trainer});
        })

});

module.exports = router;
