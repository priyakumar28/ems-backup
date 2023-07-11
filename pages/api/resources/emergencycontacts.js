
const { maskPhone } = require("../../../node_modules/maskdata");
const MaskData = require("../../../node_modules/maskdata");
module.exports = {
  // single transformation
  transform(emergencycontact) {
    
     
    if (emergencycontact && typeof emergencycontact === "object") {
      //  const maskPhoneOptions = {
      //    maskWith: "*",
      //    unmaskedStartDigits: 5,
      //    unmaskedEndDigits: 1,
      //  };
      //let payload = req.body.get;
      
      //let home_phone = 
     //let maskedPhoneNumber = MaskData.maskPhone(home_phone,maskPhoneOptions);
      return {
        id: emergencycontact.id,
        name: emergencycontact.name,
        relationship: emergencycontact.relationship,
        home_phone: emergencycontact.home_phone,
        work_phone: emergencycontact.work_phone,

        mobile_phone: emergencycontact.mobile_phone,
        employee: emergencycontact.employee_employee,
      };
    }
    return {};
  },

  transformCollection(emergencycontacts) {
    emergencycontacts =
      typeof emergencycontacts === "object" ? emergencycontacts : [];
    var data = [];
    for (var i = 0; i < emergencycontacts?.length; i++) {
      data.push(this.transform(emergencycontacts[i]));
    }
    return data;
  },
};
