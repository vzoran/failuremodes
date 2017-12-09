exports.handler = (event, context, callback) => {
    // TODO implement
    console.log("event: " + JSON.stringify(event));
    console.log("context: " + JSON.stringify(context));
    
    var response = {
        "isBase64Encoded": false,
        "statusCode": 200,
        "headers": { "content-type": "application/json"},
        "body": "Hello from Lambda"
    };
    
    callback(null, response);
};