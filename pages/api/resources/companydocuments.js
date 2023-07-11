module.exports = {
  transform(CD) {
    if (CD && typeof CD === "object") {
      return {
        id: CD.id,
        name: CD.name,
        details: CD.details,
        valid_until: CD.valid_until,
        status: CD.status,
        notify_employees: CD.notify_employees,
        attatchement: CD.attatchement,
        share_departments: CD.share_departments,
        share_userlevel: CD.share_userlevel,
      };
    }
    return {};
  },

  transformCollection(CDS) {
    CDS = typeof CDS === "object" ? CDS : [];
    let data = [];

    for (let i in CDS) {
      data.push(this.transform(CDS[i]));
    }
    return data;
  },
};
