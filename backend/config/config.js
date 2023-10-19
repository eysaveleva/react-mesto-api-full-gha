const { NODE_ENV } = process.env;
const { JWT_SECRET } = process.env;
const RIGHT_CODE = 200;
const CREATED_CODE = 201;
const ERROR_CODE = 400;
const UNAUTHORIZED_CODE = 401;
const NOT_OWNER_CODE = 403;
const NOT_FOUND_CODE = 404;
const CONFLICT_CODE = 409;
const ERROR_DEFAULT_CODE = 500;
const SALT_COUNT = 10;
const KEY = 'some-secret-key';
const REGULAR_URL = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const REGULAR_ID = /^[0-9a-fA-F]{24}$/;

module.exports = {
  RIGHT_CODE,
  CREATED_CODE,
  ERROR_CODE,
  UNAUTHORIZED_CODE,
  NOT_OWNER_CODE,
  NOT_FOUND_CODE,
  CONFLICT_CODE,
  ERROR_DEFAULT_CODE,
  SALT_COUNT,
  KEY,
  REGULAR_URL,
  REGULAR_ID,
  NODE_ENV,
  JWT_SECRET,
};
