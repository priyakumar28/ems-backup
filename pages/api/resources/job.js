module.exports = {
    transform(job) {
        if(job && typeof job === "object"){
        return {
            'id': job.id,
            'title': job.title,
            'shortdescription': job.description, 
            'description': job.description,
            'requirements': job.requirements,
            'benifits': job.benifits,
            'country': job.country,
            'company': job.company,
            'department': job.department,
            'code': job.code,
            'employementtype': job.employementtype,
            'industry': job.industry,
            'experiencelevel': job.experiencelevel,
            'jobfunction': job.jobfunction,
            'educationlevel': job.educationlevel,
            'currency': job.currency,
            'showsalary':job.showsalary,
            'salarymin': job.salarymin,
            'salarymax': job.salarymax,
            'keywords': job.keywords,
            'status': job.status,
            'closingdate': job.closingdate,
            'attachment': job.attachment,
            'display': job.display,
            'postedby': job.postedby,
        };
    }
    return{};
    },
    transformCollection(jobs) {
        jobs = typeof jobs === "object" ? jobs : [];
        var data = [];
        for (var i = 0; i < jobs?.length; i++) {
            data.push(this.transform(jobs[i]));
        }
        return data;
    }

};