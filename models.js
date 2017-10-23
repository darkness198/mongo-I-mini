const mongoose = require('mongoose');

/* A schema is a description of the format of documents within a
 * collection. In this case, each Bear is a document of the form:
 *
 * {
 *   species: "American Black Bear",
 *   latinName: "Ursus americanus",
 *   createdAt: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT)
 * }
 *
 * Make createdAt default to the current date.
 */
const Bear = new mongoose.Schema({
  // TODO: write your schema here
  species: {
    type: String,
    required: [true, 'Need a species name!']
  },
  latinName: {
    type: String,
    required: [true, 'Need a latin name!']
  },
  createdAt: {
    type: String,
    required: [true, 'Need to set to current date!'],
    default: new Date()
  }
});

module.exports = mongoose.model('Bears', Bear);
