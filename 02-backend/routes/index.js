var express = require('express');
var router = express.Router();
const mongoUtil = require('../mongoUtil.js');
const mongo = require('mongodb')

/* GET home page. */
router.get('/', async function(req, res, next) {
  db = mongoUtil.getDb();
//   let animals = await db.collection('animals').find({}).toArray();
//   res.render('index', { animals:animals});
    db.collection('animals').find({}).toArray().then(function(animalsArray){
        res.render('index', { animals:animalsArray});
    });
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

router.get('/animals/checkups/:id', async function(req,res,next){
    db = mongoUtil.getDb();
    let animal = await db.collection('animals').findOne({
        "_id": new mongo.ObjectId(req.params.id)
    },{
        projection:{ checkups:1 }
    });
    return res.json(animal);
})

router.get('/animals/checkups/add/:id', async (req, res, next)=>{
    res.render('add_checkup.hbs');
})

router.post('/animals/checkups/add/:id', async (req, res, next)=>{
    db = mongoUtil.getDb();
    let animal = await db.collection('animals').updateOne({
        "_id": new mongo.ObjectId(req.params.id)
    }, {
        "$push": {
            checkups: {
                checkup_id : new mongo.ObjectId(),
                vet: req.body['vet-name'],
                diagnosis: req.body.diagnosis
            }
            
        }
    })
    res.json(animal)
})


module.exports = router;
