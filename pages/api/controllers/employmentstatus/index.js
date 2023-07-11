const {
  OK,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
} = require("../../config/status_codes");
const employmentstatus = require("../../services/employmentstatus");
const requireAuth = require("../../middlewares/_requireAuth");
const { response } = require("../../helpers");
const {
  getById: getEmploymentstatusSchema,
  create: createEmploymentstatusSchema,
  update: updateEmploymentstatusSchema,
  list: listEmploymentstatusSchema,
  delete: deleteEmploymentstatusSchema,
} = require("../../validations/employmentstatus");

const getById = async (req, res) => {
  try {
    let id = req.query.id;

    const { error } = getEmploymentstatusSchema.query.validate({ id });
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return res.status(UNPROCESSABLE_ENTITY).json({ message });
    }
    let { code, ...employmentstatusObj } = await employmentstatus.getById(
      req.query.id
    );
    return res.status(code).send(employmentstatusObj);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    let payload = req.body;

    const { error } = createEmploymentstatusSchema.body.validate(payload);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return res.status(UNPROCESSABLE_ENTITY).json({ message });
    }

    let { code, ...employmentstatusObj } = await employmentstatus.create(
      payload
    );
    return res.status(code).send(employmentstatusObj);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    let payload = req.body;
    let id = req.query.id;

    const { error } = updateEmploymentstatusSchema.body.validate(payload);
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return res.status(UNPROCESSABLE_ENTITY).json({ message });
    }
    let { code, ...employmentstatusObj } = await employmentstatus.update(
      id,
      payload
    );
    return res.status(code).send(employmentstatusObj);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

const list = async (_req, res) => {
  try {
    let { code, ...employmentstatusObj } = await employmentstatus.list();
    return res.status(code).send(employmentstatusObj);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    let id = req.query.id;

    const { error } = deleteEmploymentstatusSchema.query.validate({ id });
    if (error) {
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/\"/g, ""))
        .join(",");
      return res.status(UNPROCESSABLE_ENTITY).json({ message });
    }
    let { code, ...employmentstatusObj } = await employmentstatus.remove(
      req.query.id
    );
    return res.status(code).send(employmentstatusObj);
  } catch {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};
