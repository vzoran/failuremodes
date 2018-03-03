'use strict';
/**
 * Business layer of failure mode handling.
 */

const failureRepository = require('../repository/failures.repository.postgres');
const awstools = require('../common/awsTools');
var failureModeModel = require('../model/failures.model');
var validate = require("validate.js");

// configure default behavior of validator
validate.async.options = { format: "flat", cleanAttributes: true };

module.exports = {
   /**
   * Returns with all recorded failure modes.
   *
   * @param callback Function(err, data) will be called after query.
   *
   * @returns Array of validated failure mode objects or empty list.
   */
  getFailures: function (callback) {
    failureRepository.getAllFailures(function(err, data) {
      var validators = [];
      var fmodeItems = [];

      // prepare for async validations
      for(var i = 0; i < data.length; ++i) {
        // create and fill for output validation
        validators.push(validate.async(data[i], failureModeModel));
      }

      // return only if all items are valid
      Promise.all(validators)
      .then(function(items){
        callback(null, items);
      })
      .catch(function(err) {
        callback(awstools.createErrorResponse(500, 'validation error', err));
      });
    });
  },
   /**
   * Returns with a given failure mode by its ID.
   *
   * @param id ID of the selected failure mode
   * @param callback Function(err, data) will be called after query.
   *
   * @returns Array of failure mode or null.
   */
  getFailureById: function (id, callback) {
    failureRepository.getFailureById(id, function(err, data) {
      if(err) {
        callback(awstools.createErrorResponse(500, '', err));
      } else if(data == null || data == undefined) {
        callback(awstools.createErrorResponse(404, '', 'Missing failuremode ID'));
      } else {
        // create and fill for output validation
        var foundFailureMode = FailureModeModel.create();
        foundFailureMode.update(data);

        // validate returned objects
        foundFailureMode.validate().then(function() {
          if(foundFailureMode.isValid) {
            callback(null, data);
          } else {
            callback(awstools.createErrorResponse(500, '', newFailureMode.errors));
          }
        });
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
  addNewFailure: function(data, callback) {
    // create and fill input data
   validate.async(data, failureModeModel)
    .then(function(data) {
      console.debug(JSON.stringify(data));
      failureRepository.addFailure(data, callback);
    })
    .catch(function(err) {
      callback(awstools.createErrorResponse(500, 'validation error', err));
    });
  }
};
