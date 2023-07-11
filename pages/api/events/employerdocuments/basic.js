const { sendMail } = require("../../services/emailservice");
const { generateMailContent, response } = require("../../helpers");
const EmployerDocumentEventEmitter = require("../index");
/**Sanjeev 200089 : Subscribe for employee_created event @public*/

EmployerDocumentEventEmitter.on("send_employer_document_to_email", async (data) => {
  try {
    
    let employeeObj = {
      email: data.work_email,
      subject: "Document - " + data.document_name,
      mailContent: generateMailContent("send_employer_document.js", {
        username: data.username,
        document_name: data.document_name
      }),
      attachments: data.attachments
    };
  
    await sendMail(employeeObj);

  } catch (err) {
    console.log(err);
    console.log(`Email not sent to ${data.work_email}`);
   }
});

module.exports = EmployerDocumentEventEmitter;
