const knex = require('../db/knex.js');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  knex('pokemon')
      .then((pokemon)=>{
        res.render('trainers/index', {pokemon});
      })
      .catch((err)=>{
        console.error(err);
      });


});

module.exports = router;
