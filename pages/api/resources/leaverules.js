module.exports = {
  transform(LR) {
    if (LR && typeof LR === "object") {
      return {
        leave_type: LR.leave_type,
        job_title: LR.job_title,
        employment_status: LR.employment_status,
        employee: LR.employee,
        supervisor_leave_assign: LR.supervisor_leave_assign,
        employee_can_apply: LR.employee.can_apply,
        apply_beyond_current: LR.apply_beyond_current,
        leave_accrue: LR.leave_accrue,
        carried_forward: LR.carried_forward,
        default_per_year: LR.default_per_year,
        carried_forward_percentage: LR.carried_forward_percentage,
        carried_forward_leave_availability:
          LR.carried_forward_leave_availability,
        propotionate_on_joined_date: LR.propotionate_on_joined_date,
        leave_group: LR.leave_group,
        max_carried_forward_amount: LR.max_carried_forward_amount,
      };
    }
    return {};
  },

  transformCollection(LRS) {
    LRS = typeof LRS === "object" ? LRS : [];
    let data = [];

    for (let i in LRS) {
      data.push(this.transform(LRS[i]));
    }
    return data;
  },
};
