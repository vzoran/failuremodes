'use strict';

var uuid = require('uuid4');

const connectionString = 'postgresql://fmode_user:fmode01@localhost:5432/postgres';
const { Client } = require('pg');
const client = new Client({
  connectionString: connectionString,
})
client.connect();

/**
 * This is a postgres version of failure modes DB Repository.
 */

module.exports = {
  /**
   * Returns with all recorded failure modes.
   *
   * @param callback Function(err, data) will be called after query.
   *
   * @returns Array of failure mode objects or empty list.
   */
  getAllFailures: function (callback) {
    const selectQuery = {
      text: 'SELECT * FROM fmode.failure_modes ORDER BY lastupdated',
      values: []
    };

    client.query(selectQuery, (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res.rows);
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
  getFailureById: function(id, callback) {
    const selectQuery = {
      text: 'SELECT * FROM fmode.failure_modes WHERE id=$1',
      values: [id]
    };

    client.query(selectQuery, (err, res) => {
      if (err) {
        console.log(err.stack);
        callback(err, null);
      } else {
        console.log(res.rows[0]);
        callback(null, res.rows[0]);
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
  addFailure: function(data, callback) {
    const insertQuery = {
      text: 'INSERT INTO fmode.failure_modes(id, functional_state, service_effect, platform_effect, potential_cause, probability, detect_failures, response_action, mitigation, detectability, safety_concern, creator, version, lastupdated) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *',
      values: [
        uuid(),
        data.functional_state,
        data.service_effect,
        data.platform_effect,
        data.potential_cause,
        data.probability,
        data.detect_failures,
        data.response_action,
        data.mitigation,
        data.detectability,
        data.safety_concern,
        'zoran',
        1,
        0
      ]
    };

    client.query(insertQuery, (err, res) => {
      if (err) {
        console.log(err.stack);
        callback(err, null);
      } else {
        console.log(res.rows[0]);
        callback(null, res.rows[0]);
      }
    });
  },
};
