'use strict';

var failures = [];

module.exports = {
  getAllFailures: function (callback) {
    callback(null, failures);
  },

  getFailureById: function(id, callback) {
    const result = failures.filter(failure => failure.id == id);
    callback(null, result);
  },

  addFailure: function(data, callback) {
    data.id = failures.length + 1;
    failures.push(data);

    callback(null, data);
  }, 
};