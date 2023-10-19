const { ERROR_CODE } = require('../config/config');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE;
  }
}

module.exports = BadRequestError;
