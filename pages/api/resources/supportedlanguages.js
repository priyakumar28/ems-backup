module.exports = {
  transform(SUPLANG) {
    if (SUPLANG && typeof SUPLANG === "object") {
      return {
        id: SUPLANG.id,
        name: SUPLANG.name,
        description: SUPLANG.description,
      };
    }
    return {};
  },

  transformCollection(SUPLANGS) {
    SUPLANGS = typeof SUPLANGS === "object" ? SUPLANGS : [];
    let data = [];
    for (let i in SUPLANGS) {
      data.push(this.transform(SUPLANGS[i]));
    }
    return data;
  },
};
