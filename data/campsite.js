'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var campsiteSchema = Schema({
  country: String,
  region: String,
  name: String,
  location: {
    coordinates: [],
    type: String
  },
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
  groupTarrifs: [],
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
  address: [],
  openTimes: {
    opens: String,
    closes: String
  },
  lastUpdated: Date
});

module.exports = mongoose.model('Campsite', campsiteSchema);
