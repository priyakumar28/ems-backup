module.exports = {
  transform(IS) {
    if (IS && typeof IS === "object") {
      return {
        id: IS.id,
        namme: IS.name,
      };
    }
    return {};
  },
  transformCollection(ISS) {
    ISS = typeof ISS === "object" ? ISS : [];
    let data = [];
    for (let i in ISS) {
      data.push(this.transform(ISS[i]));
    }
    return data;
  },
};
