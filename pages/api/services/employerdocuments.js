const {
  OK,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
  NOT_FOUND,
} = require("../config/status_codes");
const {
  models: { employerdocuments: EmployerDocuments },
} = require("../models");
const employerdocumentsResource = require("../resources/employerdocuments");
const {
  ALLOWED_EMPER_DOC_TYPES,
  ALLOWED_EMPER_DOC_SIZE
} = require("../helpers");
const { upload, download } = require("../services/upload");
const EmployerDocumentEventEmitter = require("../events/employerdocuments/basic");

exports.list = async (whereObj) => {
  try {
    let employerDocs = await EmployerDocuments.findAll({
      where: whereObj,
      order: [["id", "DESC"]],
      include: ["employer_document_employees"]
    });
    return response(
      OK,
      "Employer documents are retrived",
      employerdocumentsResource.transformCollection(employerDocs)
    );
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.getDocumentPassword = async (id, permission, user) => {
  try {
    let document = await EmployerDocuments.findOne({ where: { id: id } });
    if (!document) {
      return response(NOT_FOUND, "Requested document not found");
    }
    if (permission[`View ${document.doc_type}`]) {
      let data = {};
      let attachments = await download(document.attachment);

      data["username"] = user.username;
      data["work_email"] = user.email;
      data["document_name"] = document.name;
      data["attachments"] = [attachments];
      EmployerDocumentEventEmitter.emit("send_employer_document_to_email", data);
      return response(OK, "Document has been sent to your email");
    }
    else {
      return response(UNAUTHORIZED, "You don't have access to do this operation.");
    }
  }
  catch (error) {
    return response(INTERNAL_SERVER_ERROR, "Something went wrong");
  }
}

exports.create = async (payload, files, loggedInUser) => {
  try {
    if (files == null || typeof files != "object" || Object.entries(files).length != 1) {
      return response(
        UNPROCESSABLE_ENTITY,
        "More than one document or no document provided."
      );
    } else {
      let file = files[Object.keys(files)[0]];
      let name = file.originalFilename;
      let path = `employerdocuments/`;
      let { success, ...res } = await upload(
        file,
        path,
        ALLOWED_EMPER_DOC_TYPES,
        ALLOWED_EMPER_DOC_SIZE
      );
      if (success) {
        let document = await EmployerDocuments.create({
          user: loggedInUser.id,
          doc_type: payload.doc_type,
          employee: payload.employee,
          level: payload.level,
          name: name,
          date_added: new Date(),
          valid_until: new Date(),
          attachment: res.url,
          current_password: "-empty-"
        }, {
          include: [ "employer_document_employees" ]
        });
        document = await document.reload();
        document = employerdocumentsResource.transform(document);
        return response(OK, "Document uploaded successfully", document);
      } else {
        return response(UNPROCESSABLE_ENTITY, "Document not uploaded");
      }
    }
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.update = async (payload, id) => {
  try {
    let employeeDocumentsObj = await EmployerDocuments.update(
      { approval_status: payload.doc_status },
      { where: { id } }
    );
    return response(OK, "Document status updated", employeeDocumentsObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

exports.remove = async (id, doc_type) => {
  try {
    let employerDocumentsObj = await EmployerDocuments.destroy({
      where: { id, doc_type },
    });
    return response(OK, "Document deleted", employerDocumentsObj);
  } catch (error) {
    return response(INTERNAL_SERVER_ERROR, error.message);
  }
};

const response = (code, message, data = {}) => {
  return { code, message, data };
};
