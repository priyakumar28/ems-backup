module.exports = {
    // single transformation
    transform(cron) {
        return {    
            'id':cron.id,
            'name':cron.name,
            'class':cron.class,
            'latrun':cron.lastrun,
            'frequency':cron.frequency,
            'time':cron.time,
            'type':cron.type,
            'status':cron.status
          };
    },

    //
    transformCollection(crons) {
        crons = typeof crons === "object" ? crons : [];
        var data = [];
        for (var i = 0; i < crons?.length; i++) {
            data.push(this.transform(crons[i]));
        }
        return data;
    }

};