const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/campsites');
const Campsite = require('./campsite');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongo connected')
});

module.exports = db;
