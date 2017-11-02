'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let db = require('./data/connection');

let Campsite = require('./data/campsite');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
console.log('!', typeof Campsite)
app.get('/find/:country', (req, res) => {
  let country = req.params.country;

  db.collection('campsites').find({ country: country }).toArray((err, results) => {
    res.send(results);
  });
})

app.get('/location/:latitude/:longitude/:range', (req, res) => {
  db.collection('campsites').find({ location:
   { $geoWithin:
      { $centerSphere: [ [ Number(req.params.latitude), Number(req.params.longitude) ], Number(req.params.range) / 3963.2 ] } } })
      .toArray((err, results) => {
        res.send(results);
      });
})

app.post('/campsite', (req, res) => {
  let newCampsite = new Campsite({
    country: 'france',
    region: 'alsace',
    name: 'test2'
  })

  newCampsite.save((err, campsite) => {
    console.log('here!')
    if (err) { console.log('err!!', err); res.sendStatus(500)}
    res.sendStatus(200);
  });
})

// update route

// delete route

// other search routes?

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.listen(3000, function () {
  console.log('Kicking off on port 3000!')
})
