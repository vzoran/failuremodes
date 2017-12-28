'use strict';
const failureRepository = require('../repository/failures.repository.mongo');
const awstools = require('../common/awsTools');
var FailureModeModel = require('../model/failures.model');

module.exports = {
  getFailures: function (callback) {
    // failureRepository.getAllFailures(callback);
    failureRepository.getAllFailures(function(err, data) {
      var validators = [];
      var fmodeItems = [];

      // Execute all validators
      for(var i = 0; i < data.length; ++i) {
        // create and fill for output validation
        var nextFailureMode = FailureModeModel.create();
        nextFailureMode.update(data[i]);

        fmodeItems.push(nextFailureMode);
        validators.push(nextFailureMode.validate());
      }

      // Return when items are checked
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

        // Validate returned objects
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