var awsTools = require('./common/awsTools');
var failureService = require('./service/failures.service');

exports.handler = (event, context, callback) => {
    // Get environment
    var envName = awsTools.getContextAlias('a', context.invokedFunctionArn, 'LOCAL');
    var funcCode = awsTools.extractFunctionCode(event);
    
    // Define callback
    var callbackFunc = function (err, data) {
        // init reponse data structure
        var response = awsTools.getDefaultResponse();
            
        if(err) {
            if(typeof err === 'string') {
                response.statusCode = 500;
                console.error(err);
            } else {
                response.statusCode = err.httpCode;
                response.body = err.responseMessage;
                console.error(description);
            }
        } else {
            response.statusCode = 200;
            response.body = data;
        }
    
        callback(null, response);
    };

    switch(funcCode) {
        case "GET_FAILURES":
            failureService.getFailures(callbackFunc);
            break;
        case "POST_FAILURES":
            failureService.addNewFailure(event.body, callbackFunc);
            break;
        case "GET_FAILURES_ID":
            failureService.getFailureById(event.pathParameters.failure_id, callbackFunc);
            break;
    }
};