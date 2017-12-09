module.exports = {
  createProxyEvent: function (resource, req) {
    var proxyEvent = {
      "resource": resource,
      "path": req.url,
      "httpMethod": req.method,
      "headers": null,
      "queryStringParameters": {
        "param1": "test"
      },
      "pathParameters": null,
      "stageVariables": null,
      "requestContext": {
        "path": req.url,
        "accountId": "247152150683",
        "resourceId": "552hva",
        "stage": "test-invoke-stage",
        "requestId": "test-invoke-request",
        "identity": {
          "cognitoIdentityPoolId": null,
          "accountId": "247152150683",
          "cognitoIdentityId": null,
          "caller": "247152150683",
          "apiKey": "test-invoke-api-key",
          "sourceIp": "test-invoke-source-ip",
          "accessKey": "ASIAIV4DVUSWVQCFTZJA",
          "cognitoAuthenticationType": null,
          "cognitoAuthenticationProvider": null,
          "userArn": "arn:aws:iam::247152150683:root",
          "userAgent": "Apache-HttpClient/4.5.x (Java/1.8.0_144)",
          "user": "247152150683"
        },
        "resourcePath": req.url,
        "httpMethod": req.method,
        "apiId": "j0xiyitdfa"
      },
      "body": req.body,
      "isBase64Encoded": false
    };

    return proxyEvent;
  },

  createProxyContext: function (functionName, labelName) {
    var proxyContext = {
      "callbackWaitsForEmptyEventLoop": true,
      "logGroupName": "/aws/lambda/" + functionName,
      "logStreamName": "2017/11/29/[$LATEST]62915c2533c14036adf71dedc661fd0f",
      "functionName": functionName,
      "memoryLimitInMB": "128",
      "functionVersion": "$LATEST",
      "invokeid": "802780f6-d503-11e7-9c9a-3fed14a4d263",
      "awsRequestId": "802780f6-d503-11e7-9c9a-3fed14a4d263",
      "invokedFunctionArn": "arn:aws:lambda:eu-central-1:247152150683:function:" + functionName + (labelName != null ? ":" + labelName : "")
    };
  }
};