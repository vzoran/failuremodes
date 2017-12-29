'use strict';

/**
 * This is a helper class to stub messages AWS Api Gateway (in proxy mode)
 */
module.exports = {
  /**
   * Creates a event definition as similar as API GW does.
   * 
   * @param resource API Definition
   * @param req NodeJS Express request object
   * 
   * @returns JSON object of event definition
   */
  createProxyEvent: function (resource, req) {
    var proxyEvent = {
      "resource": resource,
      "path": req.url,
      "httpMethod": req.method,
      "headers": req.headers,
      "queryStringParameters": req.query,
      "pathParameters": req.params,
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
};