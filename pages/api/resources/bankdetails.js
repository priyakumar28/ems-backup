const employeeResource = require("./employees");
const { maskCard } = require("maskdata/lib/cardMask/CardMask");
module.exports = {
  // single transformation
  transform(bank) {
    if (bank && typeof bank === "object") {
      return {
        'id': bank.id,
        'account_type': bank.account_type,
        'bank_name': bank.bank_name,
        'branch': bank.branch,
        'account_number': maskCard(bank.account_number),
        'ifsc': bank.ifsc,    
        'status':bank.status,
        'attachment': `Cancelled cheque leaf - ${bank.account_type}.${bank.attachment?.split('.')?.pop()?.toLowerCase()}`,
        'reason_for_rejection': bank.reason_for_rejection,
        'employee': bank.employee_employee ? employeeResource.transform(employee_employee):[]
      };
    }

    return {};
  },

  //
  transformCollection(banks) {
    banks = typeof banks === "object" ? banks : [];
    let data = [];
    for (let i = 0; i < banks?.length; i++) {
      data.push(this.transform(banks[i]));
    }
    return data;
  },
};
