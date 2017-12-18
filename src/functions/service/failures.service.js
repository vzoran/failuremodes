'use strict';

var failureRepository = require('../repository/failures.repository');

module.exports = {
  getFailures: function (callback) {
    failureRepository.getAllFailures(callback);
  },
  getFailureById: function (id, callback) {
    failureRepository.getFailureById(id, callback);
  },
  addNewFailure: function(data, callback) {
    failureRepository.addFailure(data, callback);
  }
};