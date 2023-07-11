const Joi = require("joi");

module.exports = {
  create: {
    body: Joi.object({
      site_title: Joi.string().min(3).max(100).label("Site title").messages({
        "string.base": `"Site title" shoulde be a string type`,
        "string.min": `"Site title" should contain minimum 3 character`,
        "string.max": `"Site title" should be maximum 100 characters`,
      }),
      about_us: Joi.string().min(50).max(250).label("About us").messages({
        "string.base": `"About us" shoulde be a string type`,
      }),
      favicon: Joi.any().label("Favicon"),
      logo: Joi.any().label("Logo"),
      theme_mode: Joi.string()
        .valid("light", "dark")
        .label("Theme mode")
        .messages({
          "string.base": `"Theme mode" shoulde be a string type`,
        }),
      pancard_upload_max_days: Joi.number()
        .integer()
        .label("Pancard max upload"),
      change: Joi.boolean().label("Email trigger option"),
    }),
  },

  update: {
    body: Joi.object({
      site_title: Joi.string().min(3).max(100).label("Site title").messages({
        "string.base": `"Site title" shoulde be a string type`,
        "string.min": `"Site title" should contain minimum 3 character`,
        "string.max": `"Site title" should be maximum 100 characters`,
      }),
      about_us: Joi.string().min(50).max(250).label("About us").messages({
        "string.base": `"About us" shoulde be a string type`,
      }),
      favicon: Joi.any().label("Favicon"),
      logo: Joi.any().label("Logo"),
      theme_mode: Joi.string()
        .valid("light", "dark")
        .label("Theme mode")
        .messages({
          "string.base": `"Theme mode" shoulde be a string type`,
        }),
      pancard_upload_max_days: Joi.number()
        .integer()
        .label("Pancard max upload"),
      change: Joi.boolean().label("Email trigger option"),
    }),
    query: Joi.object({
      id: Joi.number().required(),
    }),
  },
};
