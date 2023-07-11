const {
    OK,
    INTERNAL_SERVER_ERROR,
    BAD_REQUEST,
  } = require("../../config/status_codes");
  const {
    models: { restaccesstokens: ReatAccessTokens },
  } = require("../../models");
  
  exports.getById = async (id) => {
    try {
      let RATObj = await ReatAccessTokens.findOne({ where: { id: id } });
      if (!RATObj) {
        return response(BAD_REQUEST, "data with given id not found");
      }
      return response(OK, "token with given id:  " + id, RATObj);
    } catch (error) {
      return response(INTERNAL_SERVER_ERROR, error.message);
    }
  };
  
  exports.create = async (payload) => {
    try {
      
      let RATObj = await ReatAccessTokens.create(payload);
      return response(OK, "token created", RATObj);
    } catch (error) {
      return response(INTERNAL_SERVER_ERROR, error.message);
    }
  };
  
  exports.update = async (payload, id) => {
    try {
      let RATObj = await ReatAccessTokens.update(payload, { where: { id: id } });
      return response(OK, "token updated successfully", RATObj);
    } catch (error) {
      return response(INTERNAL_SERVER_ERROR, error.message);
    }
  };
  
  exports.list = async () => {
    try {
      let employeeObj = await ReatAccessTokens.findAll({
        order: [['id', 'DESC']],
      });
      return response(OK, "tokens list", employeeObj);
    } catch (error) {
      return response(INTERNAL_SERVER_ERROR, error.message);
    }
  };
  
  exports.remove = async (id) => {
    try {
      let RATObj = await ReatAccessTokens.destroy({ where: { id: id } });
      return response(OK, "one token deleted", RATObj);
    } catch (error) {
      return response(INTERNAL_SERVER_ERROR, error.message);
    }
  };
  
  const response = (code, message, data = {}) => {
    return { code, message, data };
  };
  