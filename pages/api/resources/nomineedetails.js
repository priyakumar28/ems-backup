module.exports = {
  // single transformation
  transform(nomineedetail) {
    if (nomineedetail && typeof nomineedetail === "object") {
      return {
        id: nomineedetail.id,
        name: nomineedetail.name,
        state: nomineedetail.state,
        district: nomineedetail.district,
        address_pincode: nomineedetail.address_pincode,
        phone: nomineedetail.phone,
        relationship: nomineedetail.relationship,
        employee: nomineedetail.employee_employee
      };
    }
    return {};
  },

  transformCollection(nomineedetails) {
    nomineedetails =
      typeof nomineedetails === "object" ? nomineedetails : [];
    var data = [];
    for (var i = 0; i < nomineedetails?.length; i++) {
      data.push(this.transform(nomineedetails[i]));
    }
    
    return data;
  },
};
