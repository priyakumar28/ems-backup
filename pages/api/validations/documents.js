const Joi = require('joi');

module.exports = {
  create: {
    body: Joi.object({
      name: Joi.string().required().min(1).max(255).label("name"),

      details: Joi.string().min(1).max(255).label("details"),

      expire_notification: Joi.valid("Yes", "No").label("expire_notification"),

      expire_notification_month: Joi.valid("Yes", "No").label(
        "expire_notification_month"
      ),

      expire_notification_week: Joi.valid("Yes", "No").label(
        "expire_notification_week"
      ),

      expire_notification_day: Joi.valid("Yes", "No").label(
        "expire_notification_day"
      ),

      sign: Joi.valid("Yes", "No").label("sign"),

      sign_label: Joi.string().min(1).max(255).label("sign_label"),

      created: Joi.date().label("created"),

      updated: Joi.date().label("updated"),
     
    }),

    params: Joi.object({}),
    query: Joi.object({}),
  },
  getById: {
    params: Joi.object({}),
    query: Joi.object({
      id: Joi.number().required(),
    }),
  },
  update: {
    body: Joi.object({
      name: Joi.string().min(1).max(255).label("name"),

      details: Joi.string().min(1).max(255).label("details"),

      expire_notification: Joi.valid("Yes", "No").label("expire_notification"),

      expire_notification_month: Joi.valid("Yes", "No").label(
        "expire_notification_month"
      ),

      expire_notification_week: Joi.valid("Yes", "No").label(
        "expire_notification_week"
      ),

      expire_notification_day: Joi.valid("Yes", "No").label(
        "expire_notification_day"
      ),

      sign: Joi.valid("Yes", "No").label("sign"),

      sign_label: Joi.string().min(1).max(255).label("sign_label"),

      created: Joi.date().label("created"),

      updated: Joi.date().label("updated"),
    }),
    params: Joi.object({}),
    query: Joi.object({
      id: Joi.number().required(),
    }),
  },
  delete: {
    params: Joi.object({}),
    query: Joi.object({
      id: Joi.number().required(),
    }),
  },
};