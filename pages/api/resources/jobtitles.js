const employeeResource = require('./employees')

module.exports = {
    transform(jobtitle){
      if(jobtitle && typeof jobtitle === "object"){
        return{
          'id': jobtitle.id,
          'employee':employeeResource.transform(jobtitle.employees),
            'code': jobtitle.code,
            'name':jobtitle.name,
            'description': jobtitle.description,
            'specification': jobtitle.specification,
        };
      }
    },

    transformCollection(jobtitles){
        jobtitles = typeof jobtitles === "object" ? jobtitles : [];
        var data = [];
        for(var i=0; i<jobtitles?.length; i++) { 

            data.push(this.transform(jobtitles[i]));
         }
        return data;
    }
};
