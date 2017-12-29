'use strict';

/**
 * This is a tool-set related to AWS lanbda implementations
 */
module.exports = {
  /**
   * Extracts the environment label from function ARN.
   * 
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

  /**
   * Constructs a JSON object containing expected fields by AWS Api Gateway Proxy.
   * 
   * @returns Created repsonse object filled with default values.
   */
  getDefaultResponse: function() {
    return {
      "isBase64Encoded": false,
      "statusCode": 404,
      "headers": { "content-type": "application/json"},
      "body": ""
    };
  },

  /**
   * Constructs a JSON object describing an error.
   * 
   * @param httpReturnCode Numeric value. It will be the HTTP response code.
   * @param returnMessage This string will be sent back to the consumer.
   * @param description This string will be logged to the error console at lambda side.
   * 
   * @returns Created error object filled with values received as arguments.
   */

  createErrorResponse: function(httpReturnCode, returnMessage, description) {
    if(!httpReturnCode) {
      httpReturnCode = 500;
    }

    return {
      "httpCode": httpReturnCode,
      "responseMessage": returnMessage,
      "description": description
    };
  },

  /**
   * Creates a simple function code out of API definition.
   * 
   * @param eventDef Event definition sent by AWS
   * 
   * @returns function definition in string format 
   */
  extractFunctionCode: function(eventDef) {
    var funcCode = eventDef.httpMethod 
      + eventDef.resource
        .replace(/\//g, '_')
        .replace(/\{.+?\}/g, 'ID');
    
        return funcCode.toUpperCase();
  }
}