module.exports = {
  transform(TAG) {
    if (TAG && typeof TAG === "object") {
      return {
        id: TAG.id,
        name: TAG.name,
      };
    }
    return {};
  },
  transformCollection(TAGS) {
    TAGS = typeof TAGS === "object" ? TAGS : [];
    let data = [];
    for (let i in TAGS) {
      data.push(this.transform(TAGS[i]));
    }
    return data;
  },
};
