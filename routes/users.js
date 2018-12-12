var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.route('/login')
.get(function(req,res){

  res.render('Users/login');

}).post(function(req,res){

  res.render('Users/login');
})

module.exports = router;
