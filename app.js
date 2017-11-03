const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/campsites');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('here!')
});

const Campsite = require('./data/campsite');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/find/?country/?region/?name', (req, res) => {
  let query = {};
  req.params.forEach((e) => {
    query[e] = req.params[e];
  })

  db.collection('campsites').find(query).toArray((err, results) => {
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
  // validate req.body-parser?

  let newCampsite = new Campsite({
    country: 'france',
    region: 'alsace',
    name: req.body.name
  })

  newCampsite.save((err, campsite) => {
    if (err) { console.log('err!!', err); res.sendStatus(500)}
    res.sendStatus(200);
  });
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.listen(3000, function () {
  console.log('Kicking off on port 3000!')
})
