const cron = require('node-cron');

const { pancardSubmitReminder } = require('./employees');

/*
    * seconds (0 - 59)
    * minutes (0 - 59)
    * hours (0 - 23)
    * day of month (1 - 31)
    * month (1 - 12)
    * day of week (0 - 6) (Sunday=0)
*/

// This schedule will run every first day of week(Monday)
cron.schedule('* * * * *', function() {
    pancardSubmitReminder();
});