var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.route('/login')
  .get(function (req, res) {

    res.render('Users/login');

  }).post(function (req, res) {
    console.log('login attempt!');
    passport.authenticate('local-signup', {
      successRedirect: "/",
      failureRedirect: "/users/login"
    })
    console.log('login attempt end!');
    // res.render('Users/login');
  })

router.route('/register')
  .post(function (req, res, next) {
    passport.authenticate('local-signup', {
      successRedirect: '/',
      failureRedirect: '/users/login'
    });
  });
module.exports = router;
