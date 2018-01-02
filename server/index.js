const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./data/db');

const Campsite = require('./data/campsite');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// find campsite
app.get('/find/?country/?region/?name', (req, res) => {
  let query = {};
  req.params.forEach((e) => {
    query[e] = req.params[e];
  })

  db.collection('campsites').find(query).toArray((err, results) => {
    res.send(results);
  });
})

// search by location
app.get('/location/:latitude/:longitude/:range/:limit', (req, res) => {
  req.params.limit = req.params.limit ? req.params.limit : 10;
  db.collection('campsites').find({ location:
   { $geoWithin:
      { $centerSphere: [ [ Number(req.params.latitude), Number(req.params.longitude) ], Number(req.params.range) / 3963.2 ] } } }).limit(parseInt(req.params.limit, 10))
      .toArray((err, results) => {
        res.send(results);
      });
})

// update campsite
app.post('/update/:id/', (req, res) => {
  req.body.forEach((e) => {
    query[e] = req.params[e];
  })

  db.collection('campsites').findOneAndUpdate(
   { "id" : req.params.id },
   { $inc: req.body }, { new: true }, function (err, updatedCampsite) {
      if (err) return handleError(err);
      res.send(updatedCampsite);
    });
});

// post new campsite
app.post('/campsite', (req, res) => {
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

app.listen(3000, function () {
  console.log('Kicking off on port 3000!')
})
