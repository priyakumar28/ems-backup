import React, { useState, useEffect, useCallback } from "react";
import { Modal, Container, Dropdown } from "react-bootstrap";
import { FileIcon, defaultStyles } from "react-file-icon";
import { useDropzone } from "react-dropzone";
import getAbsoluteURL from "../../../utils/getAbsoluteURL";
import {
  capitalizeFirstLetter,
  getUniqueListBy,
  ac,
} from "../../../lib/helpers";
import axios from "axios";
import DropBox from "../../Icons/DropBox";
import DownloadIcon from "../../Icons/DownloadIcon";
import DeleteIcon from "../../Icons/DeleteIcon";
import CloseIcon from "../../Icons/CloseIcon";
import CheckIcon from "../../Icons/CheckIcon";
import WarningIcon from "../../Icons/WarningIcon";
import CircleLoader from "../../Shared/CircleLoader";
import Label from "../../Shared/Label";
import Box from "../../Shared/Box";
import Span from "../../Shared/Span";
import P from "../../Shared/P";
import DeleteAndDiscard from "../../Shared/DeleteAndDiscard";

function Documents(props) {
  const {
    selectedEmployee,
    accesstoken,
    employeeUpdated,
    notify,
    userRoles,
    loggeduseremail,
    admins,
    user,
  } = props;
  const [documents, setDocuments] = useState(selectedEmployee.documents);
  const [documentId, setdocumentId] = useState(false);
  const [selectedDocument, setselectedDocument] = useState(false);
  const [docUploading, setdocUploading] = useState(false);
  const [show, setShow] = useState({});
  const [submitting, setSubmitting] = useState(false);

  let config = {
    headers: {
      Authorization: `Bearer ${accesstoken}`,
    },
  };
  useEffect(() => {
    setDocuments(
      typeof selectedEmployee.documents == "object"
        ? selectedEmployee.documents
        : []
    );
  }, [selectedEmployee]);

  useEffect(() => {
    setselectedDocument(
      documentId ? documents.find((x) => x.id == documentId) : false
    );
  }, [documentId]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      let endPoint = getAbsoluteURL("controllers/employeedocuments");
      let formData = new FormData();

      acceptedFiles.forEach((acceptedFile) => {
        formData.append(acceptedFile.name, acceptedFile);
      });
      formData.append("employee", selectedEmployee.id);

      setdocUploading(true);
      axios({
        method: "POST",
        url: endPoint,
        data: formData,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          notify({
            success: response.data.code == 200,
            message: response.data.message,
          });
          if (response.data.code === 200) {
            let existingDocs = documents;
            let newDocs = response.data.data;
            setDocuments([
              ...getUniqueListBy(existingDocs.concat(newDocs), "id"),
            ]);
          }
          setdocUploading(false);
        })
        .catch((error) => {
          let error_msg = "Something went wrong while uploading";
          if (error.response) {
            if (error.response.data) {
              error_msg = error.response.data.message;
            }
          }
          notify({ success: false, message: error_msg });
          setdocUploading(false);
        });
    },
    [
      selectedEmployee,
      accesstoken,
      employeeUpdated,
      notify,
      setdocUploading,
      getUniqueListBy,
      documents,
    ]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg,image/png,image/jpg,application/pdf",
  });

  const fileExt = (filename) => {
    return filename?.split(".")?.pop()?.toLowerCase();
  };

  const baseName = (str) => {
    if (typeof str !== "string") return;
    let frags = str.trim().split(".");
    return frags
      .splice(0, frags.length - 1)
      .join(".")
      .replace(/[^a-zA-Z0-9]/g, " ")
      .replace(/\s{2,}/g, " ");
  };

  const handleShow = (type) => {
    let showw = show;
    setShow(false);
    setTimeout(() => {
      setShow(Object.assign(showw, { [type]: true }));
    }, 100);
  };

  const handleClose = (type) => {
    let showw = show;
    setShow(false);
    setTimeout(() => {
      setShow(Object.assign(showw, { [type]: false }));
    }, 100);
  };

  const closeDeleteDocumentModal = () => {
    handleClose("delete_document");
    setdocumentId(false);
    setSubmitting(false);
  };

  const closeViewDocumentModal = () => {
    handleClose("view_document");
    setdocumentId(false);
  };

  const deleteDocument = async () => {
    let endpoint = getAbsoluteURL(
      `controllers/employeedocuments?id=${documentId}&emp=${selectedEmployee.id}`
    );
    setSubmitting(true);
    axios(
      Object.assign(
        {
          method: "DELETE",
          url: endpoint,
        },
        config
      )
    )
      .then((response) => {
        notify({
          success: response.data.code === 200,
          message: response.data.message,
        });
        if (response.data.code === 200) {
          let ehIndex = documents.findIndex((x) => x.id == documentId);
          if (ehIndex > -1) {
            documents.splice(ehIndex, 1);
          }
          setDocuments([]);
          selectedEmployee.documents = documents;
          employeeUpdated(selectedEmployee);
          setTimeout(() => {
            setDocuments([...documents]);
          }, 100);
          closeDeleteDocumentModal();
        }
        setSubmitting(false);
      })
      .catch((error) => {
        let error_msg = "Something went wrong";
        if (error.response) {
          error_msg = error.response.data.message;
        }
        setSubmitting(false);
        notify({ success: false, message: error_msg });
      });
  };

  const onChangeStatus = (doc_id, status) => {
    let endPoint = getAbsoluteURL(`controllers/employeedocuments?id=${doc_id}`);
    let formData = new FormData();
    formData.append("status", status);
    formData.append("employee", selectedEmployee.id);
    setdocUploading(true);
    axios({
      method: "PUT",
      url: endPoint,
      data: formData,
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    })
      .then((response) => {
        if (response.data.code === 200) {
          let existingDocs = documents;
          let selectedDocIndex = existingDocs.findIndex((x) => x.id == doc_id);
          existingDocs[selectedDocIndex]["approvalstatus"] = status;
          selectedEmployee.documents = existingDocs;
          employeeUpdated(selectedEmployee);
        }
        notify({
          success: response.data.code === 200,
          message: response.data.message,
        });
        setdocUploading(false);
      })
      .catch((error) => {
        let error_msg = "Something went wrong";
        if (error.response) {
          if (error.response.data) {
            error_msg = error.response.data.message;
          }
        }
        notify({ success: false, message: error_msg });
        setdocUploading(false);
      });
  };

  return (
    <Box>
      <Box>
        {docUploading && (
          <CircleLoader className="loading-overlay z-index-1" loader="loader" />
        )}
        <P className="mb-0">Upload documents with respective names.</P>
        <Label>Accepted formats: jpg, png, pdf</Label>
        <Box
          className={`mt-3 employee_Data_Record_Container documents`}
          style={{ marginBottom: "5px" }}
        >
          {documents &&
            documents.map(
              (
                { id, name, _date_added, approvalstatus, attachment },
                index
              ) => (
                <Box key={index} className="position-relative">
                  <Box
                    title={capitalizeFirstLetter(baseName(name))}
                    className="doc-upload"
                  >
                    <label className="d-block">
                      {capitalizeFirstLetter(baseName(name))}
                    </label>
                    <FileIcon
                      extension={fileExt(name)}
                      {...defaultStyles[fileExt(name)]}
                      style={{ width: "150px" }}
                    />
                    <Box className="document-action-wrapper">
                      <a href={attachment} download={name}>
                        <Span className="action-wrapper">
                          <DownloadIcon />
                        </Span>
                      </a>
                      <Span
                        className="action-wrapper"
                        isClick={() => {
                          handleShow("delete_document");
                          setdocumentId(id);
                        }}
                      >
                        <DeleteIcon />
                      </Span>
                    </Box>
                  </Box>
                  <Dropdown className="doc-status-dropdown">
                    <Dropdown.Toggle
                      variant="white"
                      id="dropdown-basic"
                      className="doc-sts-btn"
                    >
                      <Span className="approved">
                        {approvalstatus == "Approved" ? <CheckIcon /> : ""}
                      </Span>
                      <Span className="rejected">
                        {approvalstatus == "Rejected" ? <CloseIcon /> : ""}
                      </Span>
                      <Span className="pending">
                        {approvalstatus == "Pending" ? <WarningIcon /> : ""}
                      </Span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        disabled={approvalstatus == "Approved"}
                        href="javascript:void(0);"
                        onClick={() => onChangeStatus(id, "Approved")}
                      >
                        Approved
                      </Dropdown.Item>
                      <Dropdown.Item
                        disabled={approvalstatus == "Rejected"}
                        href="javascript:void(0);"
                        onClick={() => onChangeStatus(id, "Rejected")}
                      >
                        Rejected
                      </Dropdown.Item>
                      <Dropdown.Item
                        disabled={approvalstatus == "Pending"}
                        href="javascript:void(0);"
                        onClick={() => onChangeStatus(id, "Pending")}
                      >
                        Pending
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Box>
              )
            )}
          {ac(userRoles, "Create documents", loggeduseremail, admins) ||
          user.employee.employee_id === selectedEmployee.employee_id ? (
            <Box {...getRootProps()} className="drop-border doc-upload">
              <input {...getInputProps()} />

              {isDragActive ? (
                <P>Drop the files here ...</P>
              ) : (
                <Span>
                  <DropBox />
                  <P className="mt-2 secondary-text-label ">
                    Click or drag and drop to upload{" "}
                  </P>
                </Span>
              )}
            </Box>
          ) : (
            "You don't have permission"
          )}
        </Box>
      </Box>

      {/* Document delete Right Modal */}
      <Modal
        show={show.delete_document}
        onHide={closeDeleteDocumentModal}
        backdrop="static"
        animation={true}
        fullscreen={true}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            Are you sure want to delete {baseName(selectedDocument.name)}?
            <DeleteAndDiscard
              isSubmitting={submitting}
              onDelete={deleteDocument}
              onClose={closeDeleteDocumentModal}
            />
          </Container>
        </Modal.Body>
      </Modal>
      {/* End */}

      {/* Document view Right Modal */}
      <Modal
        show={show.view_document}
        onHide={closeViewDocumentModal}
        backdrop="static"
        animation={true}
        fullscreen={true}
        keyboard={false}
      >
        <Modal.Body>
          <img src={selectedDocument.attachment} />
        </Modal.Body>
      </Modal>
      {/* End */}
    </Box>
  );
}

export default Documents;
