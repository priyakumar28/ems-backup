const salarycomponenttypeResource = require("./salarycomponenttype");

module.exports = {
  transform(SC) {
    if (SC && typeof SC === "object") {
      return {
        id: SC.id,
        name: SC.name,
        componenttype: salarycomponenttypeResource.transformCollection(
          SC.componenttype_salarycomponenttype
        ),
        details: SC.details,
      };
    }
    return {};
  },
  transformCollection(SCS) {
    SCS = typeof SCS === "object" ? SCS : [];
    let data = [];
    for (let i in SCS) {
      data.push(this.transform(SCS[i]));
    }
    return data;
  },
};
