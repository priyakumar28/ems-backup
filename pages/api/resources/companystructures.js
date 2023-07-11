module.exports = {
  transform(CS) {
    if (CS && typeof CS === "object") {
      return {
        id: CS.id,
        title: CS.title,
        description: CS.description,
        address: CS.address,
        type: CS.type,
        country: CS.country,
        parent: CS.transformCollection(CS.companystructures),
        timezone: CS.timezone,
        heads: CS.heads,
      };
    }
    return {};
  },

  transformCollection(CSS) {
    CSS = typeof CSS === "object" ? CSS : [];
    let data = [];
    for (let i in CSS) {
      data.push(this.transform(CSS[i]));
    }
    return data;
  },
};
