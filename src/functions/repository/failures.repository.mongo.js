'use strict';
/**
 * This is a mongo version of failure modes DB Repository.
 */

const mongo = require('mongodb');
const mongoClient = mongo.MongoClient;
const awstools = require('../common/awsTools');

// Database Name
const dbName = 'failuremodes';

// Collection name
const collectionName = 'failuremodes';

module.exports = {
  /**
   * Returns with all recorded failure modes.
   *
   * @param callback Function(err, data) will be called after query.
   *
   * @returns Array of failure mode objects or empty list.
   */
  getAllFailures: function (callback) {
    mongoClient.connect(process.env.DB_LOCATION, function (err, client) {
      if (err) {
        callback(awstools.createErrorResponse(500, '', err), null);
      } else {
        console.debug("Connected correctly to server");
        const db = client.db(dbName);

        // Insert a single document
        db.collection(collectionName)
          .find()
          .toArray(function (err, docs) {
            callback(err, docs);
          });
      }
    });
  },
  /**
  * Returns with a given failure mode by its ID.
  *
  * @param id ID of the selected failure mode
  * @param callback Function(err, data) will be called after query.
  *
  * @returns Object of failure mode or null.
  */
  getFailureById: function (id, callback) {
    mongoClient.connect(process.env.DB_LOCATION, function (err, client) {
      if (err) {
        callback(awstools.createErrorResponse(500, '', err), null);
      } else {
        console.debug("Connected correctly to server");

        const db = client.db(dbName);
        var o_id = new mongo.ObjectID(id);

        // Insert a single document
        db.collection(collectionName)
          .findOne({ _id: o_id }, function (err, doc) {
            callback(err, doc);
          })
      }
    });
  },
  /**
   * Adds a new failure mode to repository.
   *
   * @param data Validated failure mode object
   * @param callback Function(err, data) will be called after insertion.
   *
   * @returns Insterted failure mode object.
   */
  addFailure: function (data, callback) {
    mongoClient.connect(process.env.DB_LOCATION, function (err, client) {
      if (err) {
        callback(awstools.createErrorResponse(500, '', err), null);
      } else {
        console.debug("Connected correctly to server");

        const db = client.db(dbName);

        // Insert a single document
        db.collection(collectionName).insertOne(data, function (err, r) {
          console.debug("New failure mode insrted:" + r.insertedCount);
          callback(err, data);
        });
      }
    });
  },
};
