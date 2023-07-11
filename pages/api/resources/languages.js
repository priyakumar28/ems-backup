const employeesResource = require("./employees");
const languagesResource = require("./languages");
module.exports = {
  transform(LANG) {
    if (LANG && typeof LANG === "object") {
      return {
        id: LANG.id,
        name: LANG.name,
        description: LANG.description,
      };
    }
    return {};
  },

  transformCollection(LANGS) {
    LANGS = typeof LANGS === "object" ? LANGS : [];
    let data = [];
    for (let i in LANGS) {
      data.push(this.transform(LANGS[i]));
    }
    return data;
  },
};
