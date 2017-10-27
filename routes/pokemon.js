const knex = require('../db/knex.js');
var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
  if (!req.session.accum){
    req.session.accum = 0
  }
  knex('pokemon')
      .join('trainers','trainers.id', '=', 'trainer_id')
      .select('pokemon.id','pokemon.name', 'pokemon.trainer_id', 'pokemon.cp', 'pokemon.in_gym', 'trainers.name as trainers_name')
      .orderBy('id')
      .then((pokemon)=>{
          knex('trainers')
            .then((trainers)=>{

              res.render('pokemon/index', {pokemon, trainers, accum: req.session.accum});
            })

      })

});

router.post('/addPokemon', function(req, res, next){
  knex('pokemon')
    .insert({
      name: req.body.name,
      cp: req.body.cp,
      in_gym:req.body.in_gym,
      trainer_id:req.body.trainer_id
    }, '*')
    .then((result)=>{
      res.redirect('/');
    })

});

router.get('/delete/:id', function(req, res, next){
  knex('pokemon')
      .del()
      .where('id', req.params.id)
      .then((result)=>{
        res.redirect('/');
      })
      .catch((err)=>{
        console.error(err);
      });

});

router.get('/edit/:id', function(req, res, next) {

  knex('pokemon')
        .join('trainers','trainers.id', '=', 'trainer_id')
        .select('pokemon.id','pokemon.name', 'pokemon.trainer_id', 'pokemon.cp', 'pokemon.in_gym', 'trainers.name as trainers_name')
        .where('pokemon.id', req.params.id)
        .then((data)=>{
          let pokemon = data[0]
          knex('trainers')
            .then((trainers)=>{
          res.render(`pokemon/edit`, {pokemon, trainers});
          })
        })

});

router.post('/edit/:id', function(req,res){
  knex('pokemon')
      .where('id', req.params.id)
      .update({
        id: undefined,
        name: undefined,
        cp:req.body.cp,
        trainer_id: req.body.trainer_id,
        in_gym: req.body.in_gym
      }, '*')
      .then((result)=>{
        res.redirect('/');
      })
      .catch((err)=>{
        console.error(err);
      });
})


router.get('/character/:id', function(req, res, next) {

  knex('pokemon')
        .join('trainers','trainers.id', '=', 'trainer_id')
        .select('pokemon.id','pokemon.name', 'pokemon.trainer_id', 'pokemon.cp', 'pokemon.in_gym', 'trainers.name as trainers_name')
        .where('pokemon.id', req.params.id)
        .then((data)=>{
          let pokemon = data[0]
          knex('trainers')
            .then((trainers)=>{
          res.render(`pokemon/character`, {pokemon, trainers});
          })
        })

});

router.get('/gym/:id', function(req,res,next){
req.session.accum++
  if (req.session.accum===1){
    console.log("p1 is ready")
    req.session.p1 = "true"
  knex('pokemon')
      .where('id', req.params.id)
      .update({
        id: undefined,
        name: undefined,
        cp:undefined,
        trainer_id: undefined,
        in_gym: req.session.p1
      }, '*')
      .then((result)=>{

      })
      .catch((err)=>{
        console.error(err);
      });
  }

  if (req.session.accum===2){
    console.log("p2 is ready")

    req.session.p2 = "true"
  knex('pokemon')
      .where('id', req.params.id)
      .update({
        id: undefined,
        name: undefined,
        cp:undefined,
        trainer_id: undefined,
        in_gym: req.session.p2
      }, '*')
      .then((result)=>{

      })
      .catch((err)=>{
        console.error(err);
      });
  }

  if (req.session.p1 && req.session.accum>2){
    console.log("p1 is ready")
    req.session.p1 = "false"
  knex('pokemon')
      .where('id', req.params.id)
      .update({
        id: undefined,
        name: undefined,
        cp:undefined,
        trainer_id: undefined,
        in_gym: req.session.p1
      }, '*')
      .then((result)=>{

      })
      .catch((err)=>{
        console.error(err);
      });
  }

  if (req.session.p2 && req.session.accum>3){
    console.log("p1 is ready")
    req.session.p2 = "false"
    req.session.accum = 0
  knex('pokemon')
      .where('id', req.params.id)
      .update({
        id: undefined,
        name: undefined,
        cp:undefined,
        trainer_id: undefined,
        in_gym: req.session.p2
      }, '*')
      .then((result)=>{

      })
      .catch((err)=>{
        console.error(err);
      });
  }
  res.redirect('/')
})






module.exports = router;
