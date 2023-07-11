//const logger = require("logger");

/************************************************************* SMTP PROVIDER START ********************************************************/

const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  pool: true,
  maxConnections: 1,
  maxMessages: 5,
});

/************************************************************* SMTP PROVIDER END ********************************************************/

/************************************************************* AMAZON SES START *********************************************************/

const AWS = require("aws-sdk");

const SES_CONFIG = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
};

const AWS_SES = new AWS.SES(SES_CONFIG);

/************************************************************* AMAZON SES END *********************************************************/

/************************************************************* API URL START *********************************************************/

const axios = require("axios").default;

/************************************************************* API URL END *********************************************************/
async function sendBulkMail(data) {
  try {
    let mailSent = { success: false };
    if (process.env.EMS_MAIL_SEND_THROUGH === "API_URL") {
      mailSent = await sendThroughApiUrl(data);
    } else if (process.env.EMS_MAIL_SEND_THROUGH === "SMTP") {
      mailSent = await sendThroughSMTP(data, "bulk_email");
    } else if (process.env.EMS_MAIL_SEND_THROUGH === "AMAZON_SES") {
      mailSent = await sendThroughSES(data);
    }
    return mailSent;
  } catch (error) {
    
  }
}

// data => email, subject, mailContentData, templatePath
async function sendMail(data) {
  try {
    let mailSent = { success: false };
    if (process.env.EMS_MAIL_SEND_THROUGH === "API_URL") {
      mailSent = await sendThroughApiUrl(data);
    } else if (process.env.EMS_MAIL_SEND_THROUGH === "SMTP") {
      mailSent = await sendThroughSMTP(data);
    } else if (process.env.EMS_MAIL_SEND_THROUGH === "AMAZON_SES") {
      mailSent = await sendThroughSES(data);
    }
    return mailSent;
  } catch (error) {
    console.log("////",error)
  }

  // return {
  //   success: false,
  // };
}

function sendThroughApiUrl({ email, subject, mailContent, attachments }) {
  return new Promise(function (resolve, reject) {
    let data = {
      to: [email],
      from: process.env.EMS_MAIL_SENDER,
      sender: process.env.EMS_MAIL_SENDER,
      subject: subject,
      html_body: mailContent,
    };
    if (attachments) {
      data["attachments"] = attachments;
    }
    axios({
      
      method: "POST",
      url: process.env.MAIL_SEND_API_URL,
      headers: {
        "X-Server-API-Key": process.env.MAIL_SEND_X_SERVER_API_KEY,
      },
      data: data,
      
    })
      
      .then(function (response) {
        resolve({ success: response.data.status === "success" });
      })
      .catch(function (error) {
        console.log(error);
        reject({ success: false });
      });
  });
}

function sendThroughSMTP(data, sendAs = "bulk_mail") {
  return new Promise(function (resolve, reject) {
    let messages = [];
    for (const element of data) {
      messages.push({
        from: process.env.EMS_MAIL_SENDER,
        to: element["email"],
        subject: element["subject"],
        html: element["mailContent"],
      });
    }

    while (transporter.isIdle() && messages.length) {
      transporter.sendMail(messages.shift(), (err, info) => {
        console.log();
      });
    }
  });
}

function sendThroughSES({ email, subject, mailContent }) {
  return new Promise(function (resolve, reject) {
    let params = {
      Source: process.env.EMS_MAIL_SENDER,
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: mailContent,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: subject,
        },
      },
    };
    AWS_SES.sendEmail(params)
      .then((response) => {
        resolve({ success: true });
      })
      .catch((error) => {
        reject({ success: false });
      });
  });
}

module.exports = {
  sendMail,
  sendBulkMail,
};
