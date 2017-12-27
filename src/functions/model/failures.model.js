'use strict';
var model = require('nodejs-model');

var FailureMode = model('FailureMode')
  .attr('_id', {
    presence: false
  })
  .attr('functional_state', {
    validations: {
      format: {
        with: /^(startup|running|finish)$/i
      }
    }
  })
  .attr('service_effect', {
    length: {
      minimum: 0,
      maximum: 1000
    },
    tags: ['dao', 'dto']
  })
  .attr('platform_effect', {
    length: {
      minimum: 0,
      maximum: 1000
    }
  })
  .attr('potential_cause', {
    length: {
      minimum: 0,
      maximum: 1000
    }
  })
  .attr('probability', {
    presence: true,
    format: {
      with: /^(1|2|3|4|5)$/i
    }
  })
  .attr('detect_failures', {
    length: {
      minimum: 0,
      maximum: 1000
    }
  })
  .attr('response_action', {
    length: {
      minimum: 0,
      maximum: 1000
    }
  })
  .attr('mitigation', {
    length: {
      minimum: 0,
      maximum: 1000
    }
  })
  .attr('detectability', {
    presence: true,
    format: {
      with: /^(1|2|3|4|5)$/i
    }
  })
  .attr('safety_concern', {
    presence: true,
    format: {
      with: /^(true|false)$/i
    }
  })
  .attr('creator', {
    presence: true,
    length: {
      minimum: 1,
      maximum: 1000
    }
  })
  .attr('version', {
    length: {
      minimum: 1,
      maximum: 16
    },
    format: {
      with: /^\d*$/
    },
  })
  .attr('lastupdated', {
    length: {
      minimum: 1,
      maximum: 16
    },
    format: {
      with: /^\d*$/
    },
  });

  module.exports = FailureMode;