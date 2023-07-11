module.exports = {
  // single transformation
  transform(workday) {
    if (workday && typeof workday === "object") {
      return {
        id: workday.id,
        name: workday.name,
        status: workday.status,
        country: workday.country,
      };
    }
    return {};
  },

  //
  transformCollection(workdays) {
    workdays = typeof workdays === "object" ? workdays : [];
    let data = [];
    for (const element of workdays) {
      data.push(this.transform(element));
    }
    return data;
  },
};
