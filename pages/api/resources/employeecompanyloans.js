const companyloansResource= require('./companyloans');
const employeesResource= require('./employees');
module.exports = {
    transform(employeecompanyloan){
      if(employeecompanyloan && typeof employeecompanyloan === "object"){
        return{
            'id':employeecompanyloan.id,
             'employee': employeesResource.transform(employeecompanyloan.employee_employee),
             'loan': companyloansResource.transform(employeecompanyloan.loan_companyloan),
            
            'start_date':employeecompanyloan.start_date,
            'last_installment_date':employeecompanyloan.last_installment_date,
            'period_months':employeecompanyloan.period_months,
            'currency':employeecompanyloan.currency,
            'amount':employeecompanyloan.amount,
            'monthly_installment':employeecompanyloan.monthly_installment,
            'status':employeecompanyloan.status,
            'details': employeecompanyloan.details,
        
            
        };
      }
      return {};
    },

    transformCollection(employeecompanyloans){
        employeecompanyloans = typeof employeecompanyloans === "object" ? employeecompanyloans : [];
        var data = [];
        for(var i=0; i<employeecompanyloans?.length; i++) { 

            data.push(this.transform(employeecompanyloans[i]));
         }
        return data;
    }
};
