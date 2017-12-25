'use strict';

const mongo = require('mongodb');
const mongoClient = mongo.MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'failuremodes';

//Collection name
const collectionName = 'failuremodes';

// DB Object
var dbObject = undefined;

module.exports = {
  getAllFailures: function (callback) {
    mongoClient.connect(url, function(err, client) {
      assert.equal(null, err);
      console.log("Connected correctly to server");
    
      const db = client.db(dbName);
    
      // Insert a single document
      db.collection(collectionName)
        .find()
        .toArray(function(err, docs){
          assert.equal(null, err);
          callback(err, docs);
        });
    });
  },

  getFailureById: function(id, callback) {
    mongoClient.connect(url, function(err, client) {
      assert.equal(null, err);
      console.log("Connected correctly to server");
    
      const db = client.db(dbName);
      var o_id = new mongo.ObjectID(id);

      // Insert a single document
      db.collection(collectionName)
        .findOne({_id: o_id}, function(err, doc){
          assert.equal(null, err);
          callback(err, doc);
        })
    });
  },

  addFailure: function(data, callback) {
    mongoClient.connect(url, function(err, client) {
      assert.equal(null, err);
      console.log("Connected correctly to server");
    
      const db = client.db(dbName);
    
      // Insert a single document
      db.collection(collectionName).insertOne(data, function(err, r) {
        assert.equal(null, err);
        assert.equal(1, r.insertedCount);
        
        callback(err, data);
      });
    });
  }, 
};