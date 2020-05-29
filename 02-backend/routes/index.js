var express = require('express');
var router = express.Router();
const mongoUtil = require('../mongoUtil.js');

/* GET home page. */
router.get('/', async function(req, res, next) {
  db = mongoUtil.getDb();
  animals = await db.collection('animals').find({}).toArray();
  res.render('index', { animals:animals});
});

router.get('/animals/add', function(req, res, next) {
  res.render('add_animal.hbs');
});

router.post('/animals/add', async function(req, res, next){
    db = mongoUtil.getDb();
    await db.collection('animals').insertOne({
        'name': req.body['animal-name'],
        'breed': req.body.breed
    });
    req.flash('info', "New animal added!");
    res.redirect('/')
});


module.exports = router;
