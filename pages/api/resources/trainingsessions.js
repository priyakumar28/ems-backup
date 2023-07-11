
module.exports = {
    // single transformation
    transform(trainingsession) {
        if (trainingsession && typeof trainingsession === "object") {
            trainingsession = trainingsession.dataValues;
            return {
                'id': trainingsession.id,
                'name': trainingsession.name,
                'course': {
                    'id': trainingsession.course_course?.id,
                    'code': trainingsession.course_course?.code,
                    'name': trainingsession.course_course?.name
                },
                'description': trainingsession.description,
                'scheduled': trainingsession.scheduled,
                'duedate': trainingsession.duedate,
                'deliverymethod': trainingsession.deliverymethod,
                'deliverylocation': trainingsession.deliverylocation,
                'status': trainingsession.status
            };
        }
        return {};
    },

    //
    transformCollection(trainingsessions) {
        trainingsessions = typeof trainingsessions === "object" ? trainingsessions : [];
        var data = [];
        for (var i = 0; i < trainingsessions?.length; i++) {
            data.push(this.transform(trainingsessions[i]));
        }
        return data;
    }

};