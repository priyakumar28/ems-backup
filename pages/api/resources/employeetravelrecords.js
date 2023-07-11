
module.exports = {
    // single transformation
    transform(employeetravelrecord) {
         if (employeetravelrecord && typeof employeetravelrecord === "object") {
        return {
            'id': employeetravelrecord.id,
          //  'employee':employeerresource.transform(employeetravelrecord.employee_employee),
            'type': employeetravelrecord.type,
            'purpose': employeetravelrecord.purpose,
            'travel_from': employeetravelrecord.travel_from,
            'travel_to': employeetravelrecord.travel_to,
            'travel_date':employeetravelrecord.travel_date,
            'return_date':employeetravelrecord.return_date,
            'details':employeetravelrecord.details,
            'funding':employeetravelrecord.funding,
            'currency':employeetravelrecord.currency,
            'attachment1':employeetravelrecord.attachment1,
            'attachment2':employeetravelrecord.attachment2,
            'attachment3':employeetravelrecord.attachment3,
            'created':employeetravelrecord.created,
            'updated':employeetravelrecord.updated,
            'status':employeetravelrecord.status,


        }
    }
    return{}
    },

    //
    transformCollection(employeetravelrecords) {
        employeetravelrecords = typeof employeetravelrecords === "object" ? employeetravelrecords : [];
        var data = [];
        for (var i = 0; i < employeetravelrecords?.length; i++) {
            data.push(this.transform(employeetravelrecords[i]));
        }
        return data;
    }

};