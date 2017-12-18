/**
 * This is a tool set related to AWS lanbda implementations
 */
module.exports = {
  /**
   * Extracts the environment label from function ARN
   * @param functionName: name of the lambda function
   * @param invokedFunctionArn: ARN received from AWS
   * @param defaultAlias: default return value in case of any error
   * 
   * @returns extracted label or default value
   */
  getContextAlias: function (functionName, invokedFunctionArn, defaultAlias) {
    // input validation
    if(invokedFunctionArn == undefined) {
      return defaultAlias;
    }
    
    // extract values
    var functionArnParts = invokedFunctionArn.split(":");
    var lastItem = functionArnParts[functionArnParts.length - 1];

    // return with best value
    if (lastItem === functionName) {
      return defaultAlias;
    } else {
      return lastItem;
    }
  },

  getDefaultResponse: function() {
    return {
      "isBase64Encoded": false,
      "statusCode": 404,
      "headers": { "content-type": "application/json"},
      "body": ""
    };
  },

  extractFunctionCode: function(eventDef) {
    var funcCode = eventDef.httpMethod + eventDef.resource.replace(/\//g, '_').replace(/\{.+?\}/g, 'ID');
    return funcCode.toUpperCase();
  }
}