'use strict';
/**
 * Business layer of failure mode handling.
 */

const failureRepository = require('../repository/failures.repository.mongo');
const awstools = require('../common/awsTools');
var FailureModeModel = require('../model/failures.model');

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

      // execute all validators
      for(var i = 0; i < data.length; ++i) {
        // create and fill for output validation
        var nextFailureMode = FailureModeModel.create();
        nextFailureMode.update(data[i]);

        // store for further use
        fmodeItems.push(nextFailureMode);
        validators.push(nextFailureMode.validate());
      }

      // return only if all items are valid
      Promise.all(validators).then(function(){
        const failedItems = fmodeItems.filter(fItem => !fItem.isValid);
        if(failedItems.length > 0) {
          callback(awstools.createErrorResponse(500, '', 'Wrong items in database'));
        } else {
          callback(null, data);
        }
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
    var newFailureMode = FailureModeModel.create();
    newFailureMode.update(data);

    // validate and save
    newFailureMode.validate().then(function() {
      if(newFailureMode.isValid) {
        failureRepository.addFailure(newFailureMode.toJSON(), callback);
      } else {
        callback(awstools.createErrorResponse(400, 'Invalid ID', newFailureMode.errors));
      }
    });
  }
};