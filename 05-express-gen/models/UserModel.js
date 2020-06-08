const mongoUtil = require('../mongoUtil');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs')

async function createUser(name, email, password) {
    // salt the password first
    let salt = await bcrypt.genSalt(10);
    let encryptedPassword = await bcrypt.hash(password, salt);
    let result = await mongoUtil.getDb().collection('users').insertOne({
        name, email, password: encryptedPassword
    });
    return result.insertedId;
}

async function findUserById(userid) {
    let user = await mongoUtil.getDb().collection('users').findOne({
        "_id": new ObjectId(userid)
    })
    return user;
}

async function findByEmail(email) {
    let user = await mongoUtil.getDb().collection('users').findOne({
        'email': email
    })
    return user;
}

module.exports = {
    createUser, findByEmail, findUserById
}