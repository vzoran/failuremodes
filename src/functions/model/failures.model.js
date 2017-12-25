'use strict';
var model = require('nodejs-model');

var FailureMode = model('FailureMode')
  .attr('description', {
    validations: {
      presence: true,
      length: {
        minimum: 1,
        maximum: 200
      }
    }
  })
  .attr('name', {
    validations: {
      presence: true,
      length: {
        minimum: 1,
        maximum: 200
      }
    }
  });

  module.exports = FailureMode;