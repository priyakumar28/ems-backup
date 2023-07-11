module.exports = {
  transform(LSTB) {
    if (LSTB && typeof LSTB === "object") {
      return {
        id: LSTB.id,
        leave_type: LSTB.leave_type,
        employee: LSTB.employee,
        leave_period: LSTB.leave_period,
        amount: LSTB.amount,
        note: LSTB.note,
        created: LSTB.created,
        updated: LSTB.updated,
      };
    }
    return {};
  },

  transformCollection(LSTBS) {
    LSTBS = typeof LSTBS === "object" ? LSTBS : [];
    let data = [];
    for (let i in LSTBS) {
      data.push(this.transform(LSTBS[i]));
    }
    return data;
  },
};
