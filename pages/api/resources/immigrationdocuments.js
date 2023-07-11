module.exports = {
  transform(ID) {
    if (ID && typeof ID === "object") {
      return {
        id: ID.id,
        name: ID.name,
        details: ID.details,
        required: ID.required,
        alert_on_missing: ID.alert_on_missing,
        alert_before_expiry: ID.alert_before_expiry,
        alert_before_day_number: ID.alert_before_day_number,
        created: ID.created,
        updated: ID.updated,
      };
    }
    return {};
  },
  transformCollection(IDS) {
    IDS = typeof IDS === "object" ? IDS : [];
    let data = [];
    for (let i in IDS) {
      data.push(this.transform(IDS[i]));
    }
    return data;
  },
};
