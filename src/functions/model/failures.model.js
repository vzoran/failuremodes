'use strict';

/**
 * This is a model definition of a failure mode.
 */
var failureModeConstraint = {
  id: {
    presence: false
  },
  functional_state: {
    presence: true,
    inclusion: ['startup', 'running', 'finish']
  },
  service_effect:{
    presence: true,
    length: {
      minimum: 0,
      maximum: 1000
    }
  },
  platform_effect: {
    presence: true,
    length: {
      minimum: 0,
      maximum: 1000
    }
  },
  potential_cause: {
    presence: true,
    length: {
      minimum: 0,
      maximum: 1000
    }
  },
  probability: {
    presence: true,
    inclusion: [1, 2, 3, 4, 5]
  },
  detect_failures: {
    presence: true,
    length: {
      minimum: 0,
      maximum: 1000
    }
  },
  response_action: {
    presence: true,
    length: {
      minimum: 0,
      maximum: 1000
    }
  },
  mitigation: {
    presence: true,
    length: {
      minimum: 0,
      maximum: 1000
    }
  },
  detectability: {
    presence: true,
    inclusion: [1, 2, 3, 4, 5]
  },
  safety_concern: {
    presence: true,
    inclusion: ['true', 'false']
  },
  creator: {
    presence: true,
    length: {
      minimum: 0,
      maximum: 1000
    }
  },
  version: {
    numericality: {
      strict: true,
      onlyInteger: true
    }
  },
  lastupdated: {
    numericality: {
      strict: true,
      onlyInteger: true
    }
  }
}

module.exports = failureModeConstraint;
