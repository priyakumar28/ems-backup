const Joi = require("joi");

module.exports = {
  // POST /v1/employees/create
  create: {
    body: Joi.object({
      userid: Joi.number().required(),
      hash: Joi.string().max(32).required(),
      token: Joi.string().max(500).required(),
      created: Joi.date(),
      updated: Joi.date()
    }),

    params: Joi.object({
      //
    }),
    query: Joi.object({
      //
    }),
  },
  update: {
    body: Joi.object({
        userid: Joi.number(),
        hash: Joi.string().max(32).required(),
        token: Joi.string().max(500).required(),
        created: Joi.date(),
        updated: Joi.date()
    }),

    query: Joi.object({
      id: Joi.number().required(),
    }),
  },

  getById: {
    query: Joi.object({
      id: Joi.number().required(),
    }),
  },

  delete: {
    query: Joi.object({
      id: Joi.number().required(),
    }),
  },
};
