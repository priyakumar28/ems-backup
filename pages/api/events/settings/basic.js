const { sendBulkMail} = require("../../services/emailservice");


const { generateMailContent, response } = require("../../helpers");
const SettingsEventEmitter = require("../index");

 /** @public */

SettingsEventEmitter.on("site_settings updated", async (data) => {
    try {
     //   console.log("ddd",data);
        let sitesettingsObj = {
            email: data.email,
            subject: "Site Settings has been updated",
            mailContent: generateMailContent("settingsupdate.js", {
                user_name: data.username,
            }),
        };
        await sendBulkMail(sitesettingsObj);
    } catch (err) {
    }
});


/** @public*/
SettingsEventEmitter.on("configuration updated", async (data) => {
    try {
        let configurationsettingsObj = {
            email: data.email,
            subject: "Configuration settings has been updated",
            mailContent: generateMailContent("configurationupdate.js", {
                user_name: data.username,
            }),
        };
       
        await sendBulkMail(configurationsettingsObj);
    } catch (err) {
    }
});


SettingsEventEmitter.on("employer documents password", async (data) => {
    try {
        let employerdocpasswordObj = {
            email: data.loggedinemail,
            subject: "employer documents password has been updated",
            mailContent: generateMailContent("employerdocpassword.js", {
                user_name: data.loggedinuser,
            }),
        };
       
        await sendBulkMail(employerdocpasswordObj);
    } catch (err) {
    }
});

module.exports = {SettingsEventEmitter};
