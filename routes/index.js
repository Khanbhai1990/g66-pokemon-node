const knex = require('../db/knex.js');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.redirect('/pokemon');
});

module.exports = router;
