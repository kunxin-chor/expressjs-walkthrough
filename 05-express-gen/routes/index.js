var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/restricted', (req,res)=>{
    console.log(req.isAuthenticated());
    if (!req.isAuthenticated()){
        res.send("Requires login");
    } else {
        res.send("Login detected");
    }
})

module.exports = router;
