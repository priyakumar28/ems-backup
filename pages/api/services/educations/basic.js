const { OK, INTERNAL_SERVER_ERROR } = require("../../config/status_codes");
const {
  models: { educations: Educations },
} = require("../../models");

//resoreseeducation file imported
const educationsResource = require("../../resources/educations");

exports.getById = async (id) => {
  try {
    // await Employees.findById(id)
    let educationsGetByIdObj = await Educations.findOne({ where: { id: id } });
    // Return educations by his/her id by calling the educations services
    return response(
      OK,
      "Education retrieved",
      educationsResource.transform(educationsGetByIdObj)
    );
  } catch (error) {
    // Return exception
  }
};

exports.create = async (payload) => {
  try {
    let educationsObj = await Educations.create(payload);
    // Create new education by calling the education services and return response
    return response(OK, "New education created", educationsObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.update = async (payload, id) => {
  try {
    // Employees.update
    let educationsUpdateObj = await Educations.update(payload, {
      where: { id: id },
      returning: true,
    });
    educationsUpdateObj = (await this.getById(id)).data;
    // Update an educations by calling the educations services and return response
    return response(OK, "Education updated", educationsUpdateObj);
  } catch (error) {
    // Return exception
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.list = async () => {
  try {
    // Educations.list
    let educationsListObj = await Educations.findAll({
      order: [["id", "DESC"]],
    });
    // Return educations list by calling the educations services
    return response(
      OK,
      "Educations retrieved",
      educationsResource.transformCollection(educationsListObj)
    );
  } catch (error) {
    // Return exception
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.remove = async (id) => {
  try {
    // Educations.Destroy (is not exactly delete, like setting deleted flag)
    let educationsRemoveIdObj = await Educations.destroy({ where: { id: id } });
    // Remove the educations by his/her id by calling the educations services
    return response(OK, "Education deleted", educationsRemoveIdObj);
  } catch (error) {
    // Return exception
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

const response = (code, message, data = {}) => {
  return { code, message, data };
};
