const MongoClient = require( 'mongodb' ).MongoClient;
const url =  "mongodb+srv://root:rotiprata123@cluster0-encm1.mongodb.net/test?retryWrites=true&w=majority";
const dbName = "animal_shelter";
let _db;

module.exports = {

  connect: function( callback ) {
    MongoClient.connect( url,  { useUnifiedTopology: true  }, function( err, client ) {
      _db  = client.db(dbName);
      return callback( err, _db );
    } );
  },

  getDb: function() {
    return _db;
  }
};