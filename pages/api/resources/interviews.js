module.exports = {
    // single transformation
    transform(interview) {
    if (interview && typeof interview === 'object'){
        return {
            'id' : interview.id,
            'job': interview.job,
            'candidate':interview.candidate,
            'level':interview.level,
            'created':interview.created,
            'updated':interview.updaated,
            'scheduled':interview.scheduled,
            'location':interview.location,
            'mapid':interview.mapid,
            'status':interview.status,
            'notes':interview.notes
            };
        }
        return{};
    },
      
    transformCollection(interviews) {
    var data = [];
    for (var i=0; i<interviews?.length; i++){
    data.push(this.transform(interviews[i]));
    }
    return data;
    }
    }
    
    