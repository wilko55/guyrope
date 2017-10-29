const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/campsites');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('here!')
});

const Campsite = require('./data/campsite');

let json = {
  country: 'France',
  region: 'Alsace',
  name: 'Camping Palmer Aire naturelle',
  type: 'Aire naturelle',
  facilities: ['Showers', 'Toilets', 'BBQ', 'Electricity hookup'],
  tax: '.5',
  tariffs: {
    adult: '3.7',
    child: '2',
    animal: '1',
    tent: '4',
    caravan: '5'
  },
  'groupTarrifs': [
    {
      description: '1 tente, 2 personnes et 1 voiture avec taxe de séjour',
      price: '12.5'
    }
  ],
  pitches: {
    tent: 7,
    caravan: 3
  },
  paymentMethods: {
    creditCard: true,
    cash: true
  },
  contact: {
    email: 'andycamping@tent.com',
    phone: {
      diallingCode: '+34',
      phoneNumber: '6354632'
    }
  },
  address: {
    address: [
      ''
    ],
    gps: {
      latitude: '12.4325',
      longitude: '31.3432'
    }
  },
  openTimes: {
    opens: '31st May',
    closes: '31st September'
  },
  lastUpdated: '12/10/2017'

};


app.get('/find/:country/?region', (req, res) => {
  let country = req.params.country;

  db.collection('campsites').find({ country: country }).toArray((err, results) => {
    console.log(err)
    res.send(results);
  });
})

app.get('/location/:latitude/:longitude/:range', (req, res) => {
  let country = req.params.country;

  db.collection('campsites').find({ country: country }).toArray((err, results) => {
    console.log(err)
    res.send(results);
  });
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.listen(3000, function () {
  console.log('Kicking off on port 3000!')
})
