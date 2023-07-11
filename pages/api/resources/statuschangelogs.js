module.exports = {
  transform(STCL) {
    if (STCL && typeof STCL === "object") {
      return {
        id: STCL.id,
        type: STCL.type,
        element: STCL.element,
        user_id: STCL.user_id,
        data: STCL.data,
        status_form: STCL.status_form,
        status_to: STCL.status_to,
        created: STCL.created,
      };
    }
    return {};
  },
  transformCollection(STCLS) {
    STCLS = typeof STCLS === "object" ? STCLS : [];
    let data = [];
    for (let i in STCLS) {
      data.push(this.transform(STCLS[i]));
    }
    return data;
  },
};
