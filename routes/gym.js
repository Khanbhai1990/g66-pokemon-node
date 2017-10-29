const knex = require('../db/knex.js');
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {

  if (!req.session.pokemonOneCp){
    req.session.pokemonOneCp = 0
    req.session.pokemonOne = ""
  }

  if (!req.session.pokemonTwoCp){
    req.session.pokemonTwoCp = 0
    req.session.pokemonTwo = ""
  }
  knex('pokemon')
      .then((pokemon)=>{
        res.render('gym/index', {pokemon, pokemonOneCp:req.session.pokemonOneCp, pokemonTwoCp:req.session.pokemonTwoCp, pokemonOneName:req.session.pokemonOneName, pokemonTwoName:req.session.pokemonTwoName});
      })
      .catch((err)=>{
        console.error(err);
      });

});

router.post('/player1', function(req,res){
  if (!req.session.addOne){
    req.session.addOne = 0
  }

    if(req.session.addOne === 0 || !req.session.accum === 3){
    req.session.addOne = 1
  req.session.accum = 3
  knex('pokemon')
      .where('id', req.body.id)
      .update({
        id: undefined,
        name: undefined,
        cp: undefined,
        trainer_id: undefined,
        in_gym: "true"
      }, '*')
      .then((result)=>{
        req.session.pokemonOneCp = result[0].cp
        req.session.pokemonOneName = result[0].name
        req.session.save(function (err){
          if (err) throw err;
          res.redirect('/gym');
        })

      })
      .catch((err)=>{
        console.error(err);
      });
    }

})

router.post('/player2', function(req,res){
  // req.session.PokemonTwoCp = req.body.cp
  if (!req.session.add){
    req.session.add = 0
  }

  if (req.session.add ===0 || !req.session.accum === 1){
  req.session.accum = 1
  req.session.add = 1


  knex('pokemon')
      .where('id', req.body.id)
      .update({
        id: undefined,
        name: undefined,
        cp: undefined,
        trainer_id: undefined,
        in_gym: "true"
      }, '*')
      .then((result)=>{
        req.session.pokemonTwoCp = result[0].cp
        req.session.pokemonTwoName = result[0].name
        req.session.save(function (err){
          if (err) throw err;
          res.redirect('/gym');
        })
      })
      .catch((err)=>{
        console.error(err);
      });
    }

})

router.get('/reset', function(req,res){
    if (req.session.pokemonOneCp>req.session.pokemonTwoCp){
      knex('pokemon')
        .where('name', req.session.pokemonOneName)
        .update({
          id: undefined,
          name: undefined,
          cp: req.session.pokemonOneCp+20,
          trainer_id: undefined,
          in_gym: undefined
        }, "*")
        .then((result)=>{

        })
        .catch((err)=>{
          console.error(err);
        });
    }

    if (req.session.pokemonTwoCp>req.session.pokemonOneCp){
      knex('pokemon')
        .where('name', req.session.pokemonTwoName)
        .update({
          id: undefined,
          name: undefined,
          cp: req.session.pokemonTwoCp+20,
          trainer_id: undefined,
          in_gym: undefined
        }, "*")
        .then((result)=>{

        })
        .catch((err)=>{
          console.error(err);
        });
    }
    req.session.addOne = 0
    req.session.add = 0
    req.session.accum = 0
    req.session.pokemonOneCp = 0
    req.session.pokemonTwoCp = 0
  knex('pokemon')
    .update({
      id: undefined,
      name: undefined,
      cp: undefined,
      trainer_id: undefined,
      in_gym: "false"
    }, "*")
    .then((result)=>{

    })
    .catch((err)=>{
      console.error(err);
    });
    req.session.save(function (err){
      if (err) throw err;
      res.redirect('/gym');
    })
})



module.exports = router;
