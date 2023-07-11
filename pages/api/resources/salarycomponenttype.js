module.exports = {
  transform(SCT) {
    if (SCT && typeof SCT === "object") {
      return {
        id: SCT.id,
        code: SCT.code,
        name: SCT.name,
      };
    }
    return {};
  },
  transformCollection(SCTS) {
    SCTS = typeof SCTS === "object" ? SCTS : [];
    let data = [];
    for (let i in SCTS) {
      data.push(this.transform(SCTS[i]));
    }
    return data;
  },
};
