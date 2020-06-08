var express = require('express');
var router = express.Router();
const UserModel = require('../models/UserModel');
const passport = require('passport')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/create',(req, res)=>{
    return res.render('users/create')
})

router.post('/create', async (req,res)=>{
    let insertedid = await UserModel.createUser(req.body.username, req.body.email, req.body.password);
    res.send("User has been created!");
})

router.get('/login', async (req,res)=>{
    return res.render('users/login')
})

router.post('/login', (req,res, next)=>{
    // second argument is the callback functoon that activates when authentication has finished processing
   let authProcess= passport.authenticate("local",  async (err, user, info)=>{
        if (err) {
            return res.send("Cannot login");
        }
        if (!user) {
            return res.send("Cannot find user");
        }
        let loginError =  req.logIn(user, (loginError)=>{
                if (loginError) {
                     res.send("Error logging in");
                } else {
                    res.send("User has logged in")
                }
            });
        });
     
    // run the authentication process
    authProcess(req, res, next);
})

router.get('/profile', (req,res)=>{
    res.send(req.user);
})

router.get('/logout', (req,res)=>{
    req.logOut();
    res.send("logged out");
})

module.exports = router;
