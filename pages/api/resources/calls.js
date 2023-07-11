 
 const candidatesResource= require('./candidates');
module.exports = {  
    transform(call){
      if(call && typeof call === "object"){
        return{           
            'id':call.id,
            
             //'job': jobsResource.transform(call.job_job),
             'candidate': candidatesResource.transform(call.candidate_candidate),
            'phone':call.phone,
            'created': call.created,
            'updated': call.updated,
            'status':call.status,
            'notes':call.notes,
            
        };
      }
      return {};
    },

    transformCollection(calls){
        calls = typeof calls === "object" ? calls : [];
        var data = [];
        for(var i=0; i<calls?.length; i++) { 

            data.push(this.transform(calls[i]));
         }
        return data;
    }
};
