const LocalStrategy = require("passport-local").Strategy;
const mysql = require('mysql');
const connection = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"root"
});
connection.query("USE wedding");

module.exports = function(passport){
 passport.deserializeUser(function(id,done){
   connection.query("select * from users where id = "+id,function(err,rows){
     done(err,rows[0]);
   });
 });

 passport.use("local-signup", new LocalStrategy({
   usernameField : "email",
   passwordField: "password",
   passReqToCallback : true
 },
 function(req,email,password,done){
   connection.query("select * from users where email ='"+email+"'",function(err,rows){
     console.log(rows);
     console.log("above row object");
     if(err)
     return done (err);
     if(rows.length){
       return done(null,false,req.flash("signupMessage","That email is already taken."));
     }else{
       var newUserMysql = new Object();
       newUserMysql.email = email;
       newUserMysql.password = password;
       var inserQuery = "INSERT INFO users(email, password) values ('"+email+"','"+password+"')";
       console.log(inserQuery);
       connection.query(inserQuery,function(err,rows){
         newUserMysql.id = rows.insertId;
         return done (null, newUserMysql)
       });
     }
   });
 }));

 passport.use("local-login", new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback:true
 },
 function(req,email, passport,done){
  connection("SELECT * FROM `users` WHERE `email` = '"+email+"'",function(err,rows){
    if(err) return done(err)
    if(!rows.length){
      return done(null,false, req.flash("loginMessage","No user found."));
    }
    if (!( rows[0].password == password))
    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'))
    return done(null, rows[0]);
  });
 }));
};