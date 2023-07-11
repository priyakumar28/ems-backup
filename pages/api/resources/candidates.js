
const applicationResource = require('./applications');
const interviewsResource = require('./interviews')

module.exports = {
    transform(candidate){
      if(candidate && typeof candidate === "object"){      
        return {
          id: candidate.id,
          applications: applicationResource.transform(candidate.applications),
          interviews: interviewsResource.transform(candidate.interviews),
          first_name: candidate.first_name,
          last_name: candidate.last_name,
          nationality: candidate.nationality,
          birthday: candidate.birthday,
          gender: candidate.gender,
          marital_status: candidate.marital_status,
          address1: candidate.address1,
          address2: candidate.address2,
          city: candidate.city,
          country: candidate.country,
          province: candidate.province,
          postal_code: candidate.postal_code,
          email: candidate.email,
          home_phone: candidate.home_phone,
          mobile_phone: candidate.mobile_phone,
          cv_title: candidate.cv_title,
          cv: candidate.cv,
          cvtext: candidate.cvtext,
          industry: candidate.industry,
          profileimage: candidate.profileimage,
          head_line: candidate.head_line,
          objective: candidate.objective,
          work_history: candidate.work_history,
          education: candidate.education,
          skills: candidate.skills,
          referees: candidate.referees,
          linkedinurl: candidate.linkedinurl,
          linkedindata: candidate.linkedindata,
          totalyearsofexperience: candidate.totalyearsofexperience,
          totalmonthsofexperience: candidate.totalmonthsofexperience,
          htmlcvdata: candidate.htmlcvdata,
          generatedcvfile: candidate.generatedcvfile,
          created: candidate.created,
          updated: candidate.updated,
          expectedsalary: candidate.expectedsalary,
          preferedpositions: candidate.preferedpositions,
          preferedjobtype: candidate.preferedjobtype,
          preferedcountries: candidate.preferedcountries,
          tags: candidate.tags,
          notes: candidate.notes,
          calls: candidate.calls,
          age: candidate.age,
          hash: candidate.hash,
          linkedinprofilelink: candidate.linkedinprofilelink,
          linkedinprofileid: candidate.linkedinprofileid,
          facebookprofilelink: candidate.facebookprofilelink,
          facebookprofileid: candidate.facebookprofileid,
          twitterprofilelink: candidate.twitterprofilelink,
          twitterprofileid: candidate.twitterprofileid,
          googleprofilelink: candidate.googleprofilelink,
          googleprofileid: candidate.googleprofileid,
        };
      }
      return{};
    },

    transformCollection(candidates){
        candidates = typeof candidates === "object" ? candidates : [];
        var data = [];
        for(var i=0; i<candidates?.length; i++) { 

            data.push(this.transform(candidates[i]));
         }
        return data;
    }
};

