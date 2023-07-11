const jobResource = require('./job');
module.exports = {
    transform(application) {
      if (application && typeof application === "object") {
        return {
  
            'id': application.id,
            'job': jobResource.transform(application.job_job),
            //'candidate': candidateResource.transform(application.candidate_candidate),
            'created': application.created,
            'referredbyemail': application.referredbyemail,
            'notes': application.notes,
        };
      }
      return {};
    },
    transformCollection(applications) {
      applications = typeof applications === "object" ? applications : [];
      var data = [];
      for (var i = 0; i < applications?.length; i++) {
        data.push(this.transform(applications[i]));
      }
      return data;
    }
}

