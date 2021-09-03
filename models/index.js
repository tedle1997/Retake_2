/**
 * Web Atelier 2020  Exercise 7 - Single-Page Web Applications with Fetch and Client-side Views
 *
 * Student: Thuong L Le
 *
 *
 */

const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const mongodb_uri = 'mongodb://localhost:27017';
const db_name = 'web-atelier-album';

const model = {};

MongoClient
  .connect(mongodb_uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    model.db = client.db(db_name);
    model.timers = model.db.collection('timers');
  })
  .catch(err => console.error(err));

exports.model = model;