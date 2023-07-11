module.exports = {
    //single transformation
    transform(holiday) {
        if (holiday && typeof holiday === "object") {
            return {
                'id': holiday.id,
                'name': holiday.name,
                'dateh': holiday.dateh,
                'status': holiday.status,
                'country': holiday.country
            };
        }
        return {};
    },
    //
    transformCollection(holidays) {
        holidays = typeof holidays === "object" ? holidays : [];
        var data = [];
        for (var i = 0; i < holidays.length; i++) {
            data.push(this.transform(holidays[i]));
        }
        return data;
    }
};