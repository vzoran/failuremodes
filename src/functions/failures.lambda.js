'use strict';

var awsTools = require('./common/awsTools');
var failureService = require('./service/failures.service');

exports.handler = (event, context, callback) => {
  // Get environment
  var envName = awsTools.getContextAlias(context.invokedFunctionArn, 'DEFAULT');
  awsTools.initEnvironment(envName);

  var funcCode = awsTools.extractFunctionCode(event);

  // Define callback
  var callbackFunc = function (err, data) {
    callback(null, awsTools.createResponse(err, data));
  };

  switch (funcCode) {
    case "GET_FAILURES":
      failureService.getFailures(callbackFunc);
      break;
    case "POST_FAILURES":
      failureService.addNewFailure(event.body, callbackFunc);
      break;
    case "GET_FAILURES_ID":
      failureService.getFailureById(event.pathParameters.failure_id, callbackFunc);
      break;
    default:
      console.error('Invalid function code:', funcCode);
      callbackFunc('Invalid function code', null);
      break;
  }
};
