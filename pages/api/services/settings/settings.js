const { OK, INTERNAL_SERVER_ERROR } = require("../../config/status_codes");
const {
  ALLOWED_FAVICON_TYPES,
  ALLOWED_FAVICON_SIZE,
  ALLOWED_LOGO_TYPES,
  ALLOWED_LOGO_SIZE,
} = require("../../helpers");
const {
  models: { settings: Settings },
} = require("../../models");

const setting = require("../../resources/settings");
const { upload } = require("../upload");
const { SettingsEventEmitter } = require("../../events/settings/basic");

const props = {
  favicon: {
    size: ALLOWED_FAVICON_SIZE,
    types: ALLOWED_FAVICON_TYPES,
  },
  logo: {
    size: ALLOWED_LOGO_SIZE,
    types: ALLOWED_LOGO_TYPES,
  },
};

exports.update = async (payload, emails) => {
  try {
    let { fields, files } = payload;
    let settingsArr = [];
    for (const property in fields) {
     
      if (
        (property == "logo" && typeof files.logo === "object") ||
        (property == "favicon" && typeof files.favicon === "object")
      ) {
        let file = payload.files[property];
        let path = `sitesettings/${property}`;
        let { success, ...res } = await upload(
          file,
          path,
          props[property]["types"],
          props[property]["size"],
          false
        );
        if (success) {
          fields[property] = res.url;
        }
      }
      let settingsObj = await Settings.findOne({ where: { name: property } });
      // console.log(property, settingsObj);
      if (settingsObj === null) {
        settingsObj = await Settings.create({
          name: property,
          value: fields[property],
        });
      } else {
        settingsObj.value = fields[property];
        await settingsObj.save();
      }

      settingsArr.push(settingsObj);

      if (emails && emails.length > 0) {
        emails.map((x) => {
          if ("pancard_upload_max_days" in payload.fields) {
            SettingsEventEmitter.emit("configuration updated", x);
          } else {
            SettingsEventEmitter.emit("site_settings updated", x);
          }
        });
      }
    }
    return response(OK, " Settings successfully updated", settingsArr);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.list = async () => {
  try {
    let settingsObj = await Settings.findAll({
      order: [["id", "DESC"]],
    });
    return response(OK, "Settings list is here ", settingsObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

const response = (code, message, data = {}) => {
  return { code, message, data };
};
