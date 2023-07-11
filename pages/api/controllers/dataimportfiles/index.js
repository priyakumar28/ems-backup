const {
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
  UNAUTHORIZED,
} = require("../../config/status_codes");
const dataimportfiles = require("../../services/employees/dataimportfiles");
const requireAuth = require("../../middlewares/_requireAuth");
const {
  getById: getDataimportfilesSchema,
  create: createDataimportfilesSchema,
  update: updateDataimportfilesSchema,
  remove: deleteDataimportfilesSchema,
} = require("../../validations/dataimportfiles");
const { response } = require("../../helpers");

export default requireAuth(async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  let result = response(UNAUTHORIZED, "Unauthorized to access this service");
  switch (method) {
    case "GET":
      if (id) {
        result = await getById(req.query.id);
      } else {
        result = await list();
      }
      break;
    case "POST":
      result = await create(req.body);
      break;
    case "PUT":
      result = await update(req.body, req.query.id);
      break;
    case "DELETE":
      result = await remove(req.query.id);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "PATCH", "POST", "DELETE"]);
      result = response(false, `Method ${method} Not Allowed`);
  }
  return res.json(result);
});

export const getById = async (id) => {
  try {
    // let id = req.query.id;

    const { error } = getDataimportfilesSchema.query.validate({ id });
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await dataimportfiles.getById(id);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

export const remove = async (id) => {
  try {
    //let id = req.query.id;

    const { error } = deleteDataimportfilesSchema.query.validate({ id });
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await dataimportfiles.remove(id);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

export const create = async (payload) => {
  try {
    // let payload = req.body;
    const { error } = createDataimportfilesSchema.body.validate(payload);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await dataimportfiles.create(payload);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

export const update = async (payload, id) => {
  try {
    // let payload = req.body;
    // let id = req.query.id;

    const { error } = updateDataimportfilesSchema.body.validate(payload);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return response(UNPROCESSABLE_ENTITY, message);
    }
    return await dataimportfiles.update(payload, id);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

export const list = async () => {
  try {
    return await dataimportfiles.list();
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};
