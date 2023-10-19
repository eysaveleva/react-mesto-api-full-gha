const { NOT_OWNER_CODE } = require('../config/config');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_OWNER_CODE;
  }
}

module.exports = ForbiddenError;
