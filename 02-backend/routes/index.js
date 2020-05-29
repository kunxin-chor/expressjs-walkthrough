var express = require('express');
var router = express.Router();
const mongoUtil = require('../mongoUtil.js');

/* GET home page. */
router.get('/', async function(req, res, next) {
  db = mongoUtil.getDb();
  animals = await db.collections('animals').find({}).toArray();
  res.render('index', { animals:animals});
});

router.get('/animals/add', function(req, res, next) {
  res.render('add_animal.hbs');
});

router.post('/animals/add', async function(req, res, next){
    db = mongoUtil.getDb();
    await db.collections('animals').insertOne({
        'name': req.body['animal-name'],
        'breed': req.body.breed
    });
    res.json(req.body)
});


module.exports = router;
