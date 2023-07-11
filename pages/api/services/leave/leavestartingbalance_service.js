const {
  OK,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} = require("../../config/status_codes");
const {
  models: { leavestartingbalance: LeaveStartingBalance },
} = require("../../models");

const leavestartingbalance_resource = require("../../resources/leavestartingbalance");

exports.getById = async (id) => {
  try {
    let leavestartingbalanceObj = await LeaveStartingBalance.findOne({
      where: { id: id },
    });
    //Finds the specific leave type with the id and returns response
    return response(
      OK,
      "Leave type you're looking for is found",
      leavestartingbalance_resource.transform(leavestartingbalanceObj)
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
    // Return exception
  }
};

exports.create = async (payload) => {
  try {
    let leavestartingbalanceObj = await LeaveStartingBalance.create(payload);
    //Creates a new leave type by calling the leavetypes services and returns response
    return response(OK, "New Leave Type created", leavestartingbalanceObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.update = async (id, payload) => {
  try {
    let leavestartingbalanceObj = await LeaveStartingBalance.update(payload, {
      where: { id: id },
    });
    if (!leavestartingbalanceObj) {
      return response(
        NOT_FOUND,
        `The leave starting balance of id ${id} was not found`
      );
    }
    //Updates the existing leave type by calling the leave types services and returns response
    return response(OK, "Existing Leave type updated", leavestartingbalanceObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
    // Return exception
  }
};

exports.list = async () => {
  try {
    let leavestartingbalanceObj = await LeaveStartingBalance.findAll({
      order: [["id", "DESC"]],
    });
    // Lists all the existing leave types and returns a response
    return response(
      OK,
      "Here's a list of all the existing leave types",
      leavestartingbalance_resource.transformCollection(leavestartingbalanceObj)
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
    // Return exception
  }
};

exports.remove = async (id) => {
  try {
    let leavestartingbalanceObj = await LeaveStartingBalance.destroy({
      where: { id: id },
    });
    if (!leavestartingbalanceObj) {
      return response(
        NOT_FOUND,
        `The leave starting balance of id ${id} was not found`
      );
    }
    // Deletes the specific leave type with given  and returns a response
    return response(
      OK,
      "The specific leave type was deleted successfully",
      leavestartingbalanceObj
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
    // Return exception
  }
};

const response = (code, message, data = {}) => {
  return { code, message, data };
};
