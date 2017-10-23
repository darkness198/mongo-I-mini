const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const Bear = require('./models');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

// allow server to parse JSON bodies from POST/PUT/DELETE requests
server.use(bodyParser.json());

server.post('/bears', (req, res) => {
  if (!req.body.species || !req.body.latinName) {
    res.status(STATUS_USER_ERROR).json({ err: "didn't provide everything!" });
  }
  Bear.create(req.body).then((bear) => {
    res.json(bear);
  });
});

server.get('/bears', (req, res) => {
  Bear.find({}, (err, bears) => {
    if (err) {
      return res.status(STATUS_SERVER_ERROR).json({ err: 'no bears!' });
    }
    res.json(bears);
  });
});

server.get('/bears/:id', (req, res) => {
  Bear.findById(req.params.id, (err, bear) => {
    if (err) {
      return res
        .status(STATUS_SERVER_ERROR)
        .json({ err: 'no bear by that id' });
    }
    res.json(bear);
  });
});

// TODO: write your server code here

mongoose.Promise = global.Promise;
const connect = mongoose.connect('mongodb://localhost/bears', {
  useMongoClient: true,
});

/* eslint no-console: 0 */
connect.then(
  () => {
    const port = 3000;
    server.listen(port);
    console.log(`Server Listening on ${port}`);
  },
  (err) => {
    console.log('\n************************');
    console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
    console.log('************************\n');
  },
);
