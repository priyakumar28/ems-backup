module.exports = {
  transform(leavetype) {
    if (leavetype && typeof leavetype === "object") {
      return {
        id: leavetype.id,
        name: leavetype.name,
        supervisor_leave_assign: leavetype.supervisor_leave_assign,
        employee_can_apply: leavetype.employee_can_apply,
        apply_beyond_current: leavetype.apply_beyond_current,
        leave_assign: leavetype.leave_accure,
        carried_forward: leavetype.carried_forward,
        default_per_year: leavetype.default_per_year,
        carried_forward_percentage: leavetype.carried_forward_percentage,
        carried_forward_leave_availability:
          leavetype.carried_forward_leave_availability,
        propotionate_on_joined_date: leavetype.propotionate_on_joined_date,
        send_notification_emails: leavetype.send_notification_emails,
        leave_group: leavetype.leave_group,
        max_carried_forward_amount: leavetype.max_carried_forward_amount,
      };
    }
    return {};
  },

  transformCollection(leavetypes) {
    leavetypes = typeof leavetypes === "object" ? leavetypes : [];
    let data = [];

    for (let i in leavetypes) {
      data.push(this.transform(leavetypes[i]));
    }
    return data;
  },
};
