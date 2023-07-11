module.exports = {
  transform(TZ) {
    if (TZ && typeof TZ === "object") {
      return {
        id: TZ.id,
        name: TZ.name,
        details: TZ.details,
      };
    }
    return {};
  },
  transformCollection(TZS) {
    TZS = typeof TZS === "object" ? TZS : [];
    let data = [];
    for (let i in TZS) {
      data.push(this.transform(TZS[i]));
    }
    return data;
  },
};
