const knex = require('../db/knex.js');
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {

  if (!req.session.playerOneCp){
    req.session.playerOneCp = 0
  }

  if (!req.session.playerTwoCp){
    req.session.playerTwoCp = 0
  }
  knex('pokemon')
      .then((pokemon)=>{
        res.render('gym/index', {pokemon, playerOneCp:req.session.playerOneCp, playerTwoCp:req.session.playerTwoCp });
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
    req.session.addOne++
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
        req.session.playerOneCp = result[0].cp
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
  req.session.playerTwoCp = req.body.cp
  if (!req.session.add){
    req.session.add = 0
  }

  if (req.session.add ===0 || !req.session.accum === 1){
  req.session.accum = 1
  req.session.add++
  

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
        req.session.playerTwoCp = result[0].cp
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
    req.session.addOne = 0
    req.session.add = 0
    req.session.accum = 0
    req.session.playerOneCp = 0
    req.session.playerTwoCp = 0
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
res.redirect('/gym');
})



module.exports = router;
