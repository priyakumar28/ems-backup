const { OK, INTERNAL_SERVER_ERROR } = require("../../config/status_codes");
const {
  models: {
    clients: Clients,
    projects: Projects,
    employeeprojects: EmployeeProjects,
  },
} = require("../../models");
const clientsResource = require("../../resources/clients");


exports.getById = async (id) => {
  try {
    // Return Clients by his/her id by calling the Clients services
    let clientObj = await Clients.findOne({ where: { id: id } });
    if (!clientObj) {
      return response(BAD_REQUEST, "No data found for your requested id");
    }
    return response(
      OK,
      "Showing list of details for your request",
      clientsResource.transform(clientObj)
    );
  } catch (error) {
    // Return exception
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.create = async (payload) => {
  try {
    let clientObj = await Clients.create(payload);
    // Create new client by calling the client services and return response
    return response(
      OK,
      "New client has been created",
      clientsResource.transform(clientObj)
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.update = async (payload, id) => {
  try {
    // Update an client by calling the client services and return response

    let clientObj = await Clients.update(payload, {
      where: { id: id },
      returning: true,
    });
    if (!clientObj) {
      return response(BAD_REQUEST, "No data found for your requested id");
    }
    clientObj = (await this.getById(id)).data;
    if (clientObj.status == "Inactive") {
      await Projects.update(
        { status: "Dropped" },
        { where: { client: clientObj.id } }
      );
      let pobj = await Projects.findAll({ where: { client: clientObj.id } });
      let pj = pobj.map((x) => x.id);
      let pstatus = pobj.map((x) => x.status);
      await EmployeeProjects.findAll({ where: { project: pj } });
      if (pstatus.every((val, arr) => val === arr[0])) {
        await EmployeeProjects.update(
          { status: "Inactive" },
          { where: { project: pj } }
        );
      }
    }
    return response(OK, `Client details has been updated`, clientObj);
  } catch (error) {
    // Return exception
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.list = async (whereObj = null) => {
  try {
    let options = {
      order: [["id", "DESC"]],  
    };
    if (whereObj !== "all" && whereObj !== null) {
      options["where"] = whereObj;
    }
    // client.list
    // Return client list by calling the client services
    let clientObj = await Clients.findAll(options);
    clientObj = clientsResource.transformCollection(clientObj);
    return response(OK, "Showing list of details for your request", clientObj);
  } catch (error) {
    // Return exception

    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.remove = async (id) => {
  try {
    // EmployeesDependent.Destroy (is not exactly delete, like setting deleted flag)
    // Remove the employee by his/her id by calling the employee services
    let clientObj = await Clients.destroy({ where: { id: id } });
    return response(OK, `Client of id ${id} is deleted`, clientObj);
  } catch (error) {
    // Return exception
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

const response = (code, message, data = {}) => {
  return { code, message, data };
};
