// const mongoose = require('mongoose');

const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/campsites');
//
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('Mongo connected')
// });

// module.exports = db;


const campsiteSchema = mongoose.Schema({
  country: String,
  region: String,
  name: String,
  type: String,
  facilities: [],
  tax: String,
  tarrifs: {
    adult: String,
    child: String,
    animal: String,
    tent: String,
    caravan: String
  },
  groupTarrifs: [mongoose.Schema.Types.Mixed],
  pitches: {
    tent: Number,
    caravan: Number
  },
  paymentMethods: {
    creditCard: Boolean,
    cash: Boolean
  },
  contact: {
    email: String,
    phone: {
      diallingCode: String,
      phoneNumber: String
    }
  },
  address: {
    postalAddress: [],
    gps: {
      latitude: String,
      longitude: String
    }
  },
  openTimes: {
    opens: String,
    closes: String
  },
  lastUpdated: Date
});

const Campsite = mongoose.model('Campsite', campsiteSchema);

module.export = Campsite;
