var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/campsites');
var Campsite = require('./campsite');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to mongo!')
});


module.exports = db;
