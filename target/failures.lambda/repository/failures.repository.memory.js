'use strict';
/**
 * This is a stub version of failure modes DB Repository.
 */

var failures = [];

module.exports = {
  /**
   * Returns with all recorded failure modes.
   * 
   * @param callback Function(err, data) will be called after query.
   * 
   * @returns Array of failure mode objects or empty list.
   */
  getAllFailures: function (callback) {
    callback(null, failures);
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
    const result = failures.filter(failure => failure.id == id);
    callback(null, result);
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
    data.id = failures.length + 1;
    failures.push(data);

    callback(null, data);
  }, 
};