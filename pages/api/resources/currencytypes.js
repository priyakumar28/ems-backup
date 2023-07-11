const employeesalaryResource = require('./employeesalary');


module.exports = {
    transform(currencytype){
      if(currencytype && typeof currencytype === "object"){
        return{
          'id': currencytype.id,
          'employeesalary': employeesalaryResource.transform(currencytype.employeesalaries),
          
            'code': currencytype.code,
            'name':currencytype.name,
           
        };
      }
      return {};
    },

    transformCollection(currencytypes){
        currencytypes = typeof currencytypes === "object" ? currencytypes : [];
        var data = [];
        for(var i=0; i<currencytypes?.length; i++) { 

            data.push(this.transform(currencytypes[i]));
         }
        return data;
    }
};
