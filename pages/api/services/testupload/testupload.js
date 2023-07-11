const {
  OK,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
} = require("../../config/status_codes");
const path = require("path");

exports.list = async () => {
  try {
    return response(OK, path.resolve(__dirname, "../temp"));
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
const response = (code, message, data = {}) => {
  return { code, message, data };
};
