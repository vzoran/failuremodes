'use strict';
var aws_proxy = require('../common/aws_proxy');
var lambdaLocal = require('lambda-local');
var path = require('path');

/**
 * Operations on /failures
 */
module.exports = {
    /**
     * summary: List registered failure modes
     * description: 
     * parameters: 
     * produces: application/json
     * responses: 200, 400, 500
     */
    get: function getFailures(req, res, next) {
        // Create lambda request
        var event = aws_proxy.createProxyEvent('/failures', req);

        // Pass it to lambda
        lambdaLocal.execute({
            event: event,
            lambdaPath: path.join(__dirname, '../functions/failures.lambda'),
            timeoutMs: 3000,
            callback: function (err, data) {
                if (err) {
                    console.error(err);
                    res.status(500).send("");
                } else {
                    res.status(data.statusCode).send(data.body);
                }
            }
        });
    },
    /**
     * summary: Creates new failure mode
     * description: 
     * parameters: body
     * produces: application/json
     * responses: 200, 400, 500
     */
    post: function postFailureMode(req, res, next) {
        // Create lambda request
        var event = aws_proxy.createProxyEvent('/failures', req);

        // Pass it to lambda
        lambdaLocal.execute({
            event: event,
            lambdaPath: path.join(__dirname, '../functions/failures.lambda'),
            timeoutMs: 3000,
            callback: function (err, data) {
                if (err) {
                    console.error(err);
                    res.status(500).send("");
                } else {
                    res.status(data.statusCode).send(data.body);
                }
            }
        });
    }
};
