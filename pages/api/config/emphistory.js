const EmployeeDataHistory = require("../services/employees/employeedatahistory");
export const eh = async (serviceType,loggedinuser,empdhctype,obj1 = null,obj2 = null) => {
  try {
    let estroles,updroles,eid,item_arr = [];
    if (serviceType == "create" ||serviceType == "delete" ||serviceType == "delete_failed") {
      const estart = obj1.data;
      let Field;
      if (typeof estart === "object" && Object.keys(estart).length > 0) {
        for (const item in estart) {
          item_arr.push(item);
        }
        if (!item_arr.includes("employee")) {
          eid = estart.id;
        }
        if (serviceType == "create") {
          Field = "create_operation";
        } else if (serviceType === "delete") {
          Field = "delete_operation";
        } else {
          Field = "delete_failed";
        }
        let e_id = eid
          ? eid
          : estart.employee.dataValues
          ? estart.employee.dataValues.id
          : estart.employee.id;
        let pay = {
          type: empdhctype,
          employee_id: e_id,
          field: Field,
          user_id: loggedinuser.id,
          created: new Date(),
        };
        await EmployeeDataHistory.create(pay);
      }
    } else {
      const estart = obj1.dataValues;
      const eupdate = obj2.dataValues;
      if (serviceType === "update_failed") {
        let pay = {
          type: empdhctype,
          employee_id: estart.employee_employee.dataValues.id,
          field: "failed",
          user_id: loggedinuser.id,
          created: new Date(),
          updated: new Date(),
        };
        await EmployeeDataHistory.create(pay);
      } else {
        for (const item in estart) {
          // console.log("st", item);
          item_arr.push(item);
          if (
            item === "users" &&
            estart[item].dataValues &&
            typeof estart[item].dataValues === "object"
          ) {
            estroles = estart
              ? estart.users?.dataValues?.users_userroles.map(
                  (x) => x.dataValues.name
                )
              : [];
            updroles = eupdate
              ? eupdate.users?.dataValues?.users_userroles.map(
                  (x) => x.dataValues.name
                )
              : [];
          }
        }
        if (
          !item_arr.includes("employee_employee") &&
          !item_arr.includes("coordinator_employee")
        ) {
          eid = estart.id;
        } else if (item_arr.includes("employee_employee")) {
          eid = estart.employee_employee?.dataValues?.id
            ? estart.employee_employee?.dataValues?.id
            : estart.employee_employee.id;
        } else if (item_arr.includes("coordinator_employee")) {
          eid = estart.coordinator_employee.dataValues.id;
        }
        if (typeof estart === "object" && Object.keys(estart).length > 0) {
          let old = {},
            upd = {},
            c = [],
            finame;
          for (const item in estart) {
            if (item === "users") {
              updroles.forEach((element) => {
                if (!estroles.includes(element)) {
                  old["roles"] = estroles;
                  upd["roles"] = updroles;
                  if (!c.includes("roles")) {
                    c.push("roles");
                  }
                }
              });
              estroles.forEach((element) => {
                if (!updroles.includes(element)) {
                  old["roles"] = estroles;
                  upd["roles"] = updroles;
                  if (!c.includes("roles")) {
                    c.push("roles");
                  }
                }
              });
            }
            else if (item === "department" || item === "designation") { 
              if (estart["department"] != eupdate["department"]) {
                old["department"] = estart["department_department"].dataValues;
                upd["department"] = eupdate["department_department"].dataValues;
                old["designation"] = estart["designation_designation"].dataValues;
                upd["designation"] = eupdate["designation_designation"].dataValues;
              }
              else {
                if (estart["designation"] != eupdate["designation"]) {
                  old["designation"] = estart["designation_designation"].dataValues;
                  upd["designation"] = eupdate["designation_designation"].dataValues;
                }
              }
            }
            else {
              if (
                typeof estart[item] != "object" &&
                estart[item] != eupdate[item]
              ) {
                old[item] = estart[item];
                upd[item] = eupdate[item];
                c.push(item);
              }
            }
          }
          if (c.length > 1) {
            finame = "multiple fields";
          } else if (c.length == 1) {
            finame = c[0];
          } else {
            finame = "no change";
          }
          let pay = {
            type: empdhctype,
            employee_id: eid,
            field: finame,
            user_id: loggedinuser.id,
            old_value: old,
            new_value: upd,
            created: new Date(),
            updated: new Date(),
          };
          await EmployeeDataHistory.create(pay);
        }
      }
    }
  } catch (error) {
    return response(500, error.message);
  }
};
const response = (code, message, data = {}) => {
  return { code, message, data };
};
