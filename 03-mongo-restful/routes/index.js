var express = require('express');
var router = express.Router();
const mongoUtil = require('../mongoUtil.js')
/* GET home page. */
router.get('/', async function(req, res, next) {
    let db = mongoUtil.getDb();

    // have to access collections with db.collections(<collection name>)
    // toArray() is async function call
    let animals = await db.collection('users').find({}).toArray();

    res.json(animals);

});

module.exports = router;
