module.exports = {
  transform(CL) {
    if (CL && typeof CL === "object") {
      return {
        id: CL.id,
        name: CL.name,
        details: CL.details,
      };
    }
    return {};
  },

  transformCollection(CLS) {
    CLS = typeof CLS === "object" ? CLS : [];
    let data = [];

    for (let i in CLS) {
      data.push(this.transform(CLS[i]));
    }
    return data;
  },
};
