import React, { useState, useRef, useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { Form, Modal, Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import getAbsoluteURL from "../../../utils/getAbsoluteURL";
import DateRangePicker from "react-bootstrap-daterangepicker";
import PhoneInput from "react-phone-input-2";
import InputMask from "react-input-mask";
import axios from "axios";
import moment from "moment";
import { changeDateFormat, isValidDate, ac } from "../../../lib/helpers";
import { employmentHistorySchema } from "../../../lib/yupHelpers";
import SaveIcon from "../../Icons/SaveIcon";
import AddIcon from "../../Icons/AddIcon";
import EditIcon from "../../Icons/EditIcon";
import DeleteIcon from "../../Icons/DeleteIcon";
import CloseIcon from "../../Icons/CloseIcon";
import Span from "../../Shared/Span";
import Divider from "../../Shared/Divider";
import SubTitle from "../../Shared/SubTitle";
import P from "../../Shared/P";
import Box from "../../Shared/Box";
import ErrorMsg from "../../Shared/ErrorMsg";
import Label from "../../Shared/Label";
import DeleteAndDiscard from "../../Shared/DeleteAndDiscard";
import FileUpload from "../../Shared/FileUpload";
import { FileIcon, defaultStyles } from "react-file-icon";

const schema = yup.object().shape(employmentHistorySchema);

function EmploymentHistory(props) {
  const {
    selectedEmployee,
    accesstoken,
    employeeUpdated,
    notify,
    loggeduseremail,
    userRoles,
    admins,
    user,
  } = props;

  let config = {
    headers: {
      Authorization: `Bearer ${accesstoken}`,
    },
  };

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const values = watch();

  // Callback version of watch.  It's your responsibility to unsubscribe when done.
  React.useEffect(() => {
    const subscription = watch(() => console.log());
    return () => subscription.unsubscribe();
  }, [watch]);

  const dpRef = useRef();
  

  const [showEmploymentHistory, setShowEmploymentHistory] = useState(false);
  const [employmentHistories, setemploymentHistories] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [ehId, setehId] = useState(false);
  const [toFormat] = useState("DD-MMM-YYYY");
  const [show, setShow] = useState({});

  const initialFormData = Object.freeze({
    attachment: null,
  });
  const [formData, updateFormData] = React.useState(initialFormData);

  useEffect(() => {
    setemploymentHistories(
      typeof selectedEmployee.employment_history == "object"
        ? selectedEmployee.employment_history
        : []
    );
  }, [selectedEmployee]);

  useEffect(() => {
    let eh = ehId ? employmentHistories.find((x) => x.id == ehId) : false;
    if (eh) {
      for (const property in eh) {
        if (schema._nodes.includes(property)) {
          if (["date_start", "date_end"].includes(property)) {
            eh[property] = isValidDate(eh[property])
              ? changeDateFormat(eh[property], toFormat)
              : changeDateFormat(moment(), toFormat);
          }
          setValue(property, eh[property]);
        }
      }
    }
  }, [ehId]);

  useEffect(() => {
    dpRef.current?.setStartDate(values.date_start);
    dpRef.current?.setEndDate(values.date_end);
  }, [values]);

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

  const onShowEmploymentHistory = (id = null) => {
    setShowEmploymentHistory(true);
    updateFormData(initialFormData);
    if (id) {
      setehId(id);
    } else {
      reset();
    }
  };

  const onCloseEmploymentHistory = () => {
    setShowEmploymentHistory(false);
    setehId(false);
    reset();
    setSubmitting(false);
    updateFormData(initialFormData);
  };

  const handleCallback = (start, end) => {
    setValue("date_start", start);
    setValue("date_end", end);
  };

  const Loader = () => {
    return <Box className="loader xs green"></Box>;
  };

  const onDropFiles = (acceptedFiles, name, files) => {
    if (files == null) {
      files = [];
    }
    let type = name?.toLowerCase()?.split(" ").join("_");
    let endPoint = getAbsoluteURL("controllers/employeeemploymenthistory");
    let formData = new FormData();
    acceptedFiles.forEach((acceptedFile) => {
      formData.append(acceptedFile.name, acceptedFile);
    });
    formData.append("doc_type", name);
    document.getElementById(type).style.display = "block";
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
        if (response.data.code === 200) {
          let newDocs = response.data.data;
          let mergedDocs = files.concat(newDocs);
          setEmployeeEmploymentHistoryDocuments([...mergedDocs]);
          setEmployeeEmploymentHistoryAllDocuments([...mergedDocs]);
        }
        notify({
          success: response.data.code == 200,
          message: response.data.message,
        });
        document.getElementById(type).style.display = "none";
      })
      .catch((error) => {
        let error_msg = "Something went wrong";
        if (error.response) {
          if (error.response.data) {
            error_msg = error.response.data.message;
          }
        }
        notify({ success: false, message: error_msg });
        document.getElementById(type).style.display = "none";
      });
  };

  const deleteDocument = async () => {
    let endpoint = getAbsoluteURL(
      `controllers/employeeemploymenthistory?id=${employeeemploymenthistorydocumentId}`
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
          let employerdocumentss = employerdocuments;
          let ehIndex = employerdocumentss.findIndex(
            (x) => x.id == employerdocumentId
          );
          if (ehIndex > -1) {
            employerdocumentss.splice(ehIndex, 1);
          }
          setEmployerDocuments([]);
          setEmployerAllDocuments([]);
          setTimeout(() => {
            setEmployerDocuments([...employerdocumentss]);
          }, 100);
          setTimeout(() => {
            setEmployerAllDocuments([...employerdocumentss]);
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
  const onSubmitHandler = (data) => {
    try {
      const formDataa = new FormData();
      for (const property in data) {
        if (data[property] == "null") data[property] = null;
        if (typeof data[property] == "string" && data[property]?.trim() == "")
          data[property] = null;
        if (data[property]) formDataa.append(property, data[property]);
      }
      if (formData.attachment) {
        formDataa.append("attachment", formData.attachment);
      }
      formDataa.append("employee", selectedEmployee.id);

      data["employee"] = selectedEmployee.id;

      let endpoint = getAbsoluteURL("controllers/employeeemploymenthistory");
      if (ehId) endpoint = `${endpoint}?id=${ehId}`;

      setSubmitting(true);
      axios(
        Object.assign(
          {
            method: ehId ? "PUT" : "POST",
            url: endpoint,
            data: data,
          },
          config
        )
      )
        .then((response) => {
          console.log("FIND THJN", response.data.data);
          notify({
            success: response.data.code === 200,
            message: response.data.message,
          });
          if (response.data.code === 200) {
            if (ehId) {
              let ehIndex = employmentHistories.findIndex((x) => x.id == ehId);
              employmentHistories[ehIndex] = response.data.data;
              setemploymentHistories([]);
            } else {
              employmentHistories.unshift(response.data.data);
            }

            setTimeout(() => {
              setemploymentHistories([...employmentHistories]);
            }, 100);
            onCloseEmploymentHistory();
            updateFormData(initialFormData);
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
    } catch (error) {
      notify({ success: false, message: "Something went wrong" });
    }
    updateFormData({ ...initialFormData });
  };

  const closeDeleteEhModal = () => {
    handleClose("delete_employment_history");
    setehId(false);
    setSubmitting(false);
  };

  const deleteEh = async () => {
    let endpoint = getAbsoluteURL(
      `controllers/employeeemploymenthistory?id=${ehId}&employee=${selectedEmployee.id}`
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
          let ehIndex = employmentHistories.findIndex((x) => x.id == ehId);
          if (ehIndex > -1) {
            employmentHistories.splice(ehIndex, 1);
          }
          setemploymentHistories([]);
          selectedEmployee.employment_history = employmentHistories;
          employeeUpdated(selectedEmployee);
          setTimeout(() => {
            setemploymentHistories([...employmentHistories]);
          }, 100);
          closeDeleteEhModal();
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

  return (
    <Box>
      <Box className="position-relative">
        <Box
          className={`timeline_wrapper ${showEmploymentHistory ? "remove" : ""
            }`}
        >
          <Box className="add-info"></Box>
          {employmentHistories && employmentHistories?.length > 0 ? (
            <VerticalTimeline>
              {employmentHistories &&
                employmentHistories.map((history, index) => (
                  <VerticalTimelineElement
                    key={index}
                    className={`vertical-timeline-element--work ${index == 0 ? "position-relative" : ""
                      }`}
                    date={`${changeDateFormat(
                      history.date_start,
                      "MMM-YYYY"
                    )} - ${changeDateFormat(history.date_end, "MMM-YYYY")}`}
                    iconStyle={{ background: "rgb(80 110 228)", color: "#fff" }}
                  >
                    <Box className="timeline-action">
                      <Span
                        isClick={() => {
                          if (
                            ac(
                              userRoles,
                              "Update employment history",
                              loggeduseremail,
                              admins
                            ) ||
                            user.employee.employee_id ===
                            selectedEmployee.employee_id
                          ) {
                            onShowEmploymentHistory(history.id);
                          } else {
                            notify({
                              success: false,
                              message: "You don't have permission",
                            });
                          }
                        }}
                        className="square_wrapper edit"
                      >
                        <EditIcon />
                      </Span>
                      <Span
                        isClick={() => {
                          if (
                            ac(
                              userRoles,
                              "Delete employment history",
                              loggeduseremail,
                              admins
                            ) ||
                            user.employee.employee_id ===
                            selectedEmployee.employee_id
                          ) {
                            handleShow("delete_employment_history");
                            setehId(history.id);
                          } else {
                            notify({
                              success: false,
                              message: "You don't have permission",
                            });
                          }
                        }}
                        className="square_wrapper delete  ms-2"
                      >
                        <DeleteIcon />
                      </Span>
                    </Box>
                    <SubTitle
                      className="vertical-timeline-element-subtitle mb-0 mt-2"
                      title={history.job_title}
                    />
                    <Label className="mb-3 dark-text">
                      {history.employment_type ? history.employment_type : "-"}{" "}
                      in{" "}
                      <Span className="theme-text">
                        {history.employer_name ? history.employer_name : "-"}
                      </Span>
                    </Label>
                    <Label className="d-flex align-items-center">
                      Payroll Type:
                      <Span className="dark-text ms-1 d-inline">
                        {history.payroll_type ? history.payroll_type : "-"}
                      </Span>
                    </Label>
                    <Label className="d-flex align-items-center">
                      CTC:
                      <Span className="dark-text ms-1 d-inline">
                        {history.payroll_amount ? history.payroll_amount : "-"}
                      </Span>
                    </Label>
                    <Label className="">Reason For Relieving</Label>
                    <P className="dark-text mt-0 ">
                      {history.reason_for_leaving
                        ? history.reason_for_leaving
                        : "-"}{" "}
                    </P>
                    <Label className="d-flex align-items-center">
                      Reference Name:
                      <Span className="dark-text ms-1 d-inline">
                        {history.reference_name ? history.reference_name : "-"}
                      </Span>
                    </Label>
                    <Label className="d-flex align-items-center mb-2">
                      Reference Phone No:
                      <Span className="dark-text ms-1 d-inline">
                        {history.reference_phno ? history.reference_phno : "-"}
                      </Span>
                    </Label>
                  </VerticalTimelineElement>
                ))}
            </VerticalTimeline>
          ) : (
            <Span className="profile-bg">
              <P className="text-center mt-0 border-top border-bottom mb-0 py-1 f-15">
                Click &nbsp;
                <Span
                  isClick={() => {
                    setValue("payroll_amount", "");
                    setValue("date_start", "");
                    setValue("date_end", "");
                    if (
                      ac(
                        userRoles,
                        "Create employment history",
                        loggeduseremail,
                        admins
                      ) ||
                      user.employee.employee_id === selectedEmployee.employee_id
                    ) {
                      onShowEmploymentHistory();
                    } else {
                      notify({
                        warning: false,
                        message: "You don't have permission",
                      });
                    }
                  }}
                >
                  <AddIcon />
                </Span>{" "}
                To Add Employeement History
              </P>
            </Span>
          )}
          {employmentHistories && employmentHistories?.length > 0 && (
            <Button onClick={() => onShowEmploymentHistory()}>
              <span> Add Employment History</span>
            </Button>
          )}
        </Box>

        <Form
          onSubmit={handleSubmit(onSubmitHandler)}
          className={`edit-form-wrapper  ${showEmploymentHistory ? "show" : ""
            }`}
        >
          <Box className="form-grid ems-form">
            <Form.Group>
              <Form.Label>
                Company <Span className="required">*</Span>
              </Form.Label>
              <Form.Control {...register("employer_name")} />
              <ErrorMsg errorMessage={errors.employer_name?.message} />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Employment Period <Span className="required">*</Span>
              </Form.Label>
              <DateRangePicker
                ref={dpRef}
                initialSettings={{
                  showDropdowns: true, locale: { format: toFormat }
                }}
                onCallback={handleCallback}
              >
                <input className="form-control" />
              </DateRangePicker>
              <ErrorMsg
                errorMessage={
                  errors.date_start?.message || errors.date_end?.message
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Job Title</Form.Label>
              <Form.Control {...register("job_title")} />
              <ErrorMsg errorMessage={errors.job_title?.message} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Employment Type</Form.Label>
              <Form.Select
                {...register("employment_type")}
                className="form-control"
              >
                <option>Select</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Seasonal">Seasonal</option>
                <option value="Temporary">Temporary</option>
              </Form.Select>
              <ErrorMsg errorMessage={errors.employment_type?.message} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Payroll Type</Form.Label>
              <Form.Select
                {...register("payroll_type")}
                className="form-control"
              >
                <option>Select</option>
                <option value="Monthly">Monthly</option>
                <option value="Semi-monthly">Semi-monthly</option>
                <option value="Bi-weekly">Bi-weekly</option>
                <option value="Weekly">Weekly</option>
              </Form.Select>
              <ErrorMsg errorMessage={errors.payroll_type?.message} />
            </Form.Group>
            <Form.Group>
              <Form.Label>CTC</Form.Label>

              <InputMask
                {...register("payroll_amount")}
                value={values.payroll_amount}
                className="form-control"
                maskChar={"*"}
                // mask="9999999999"
                onChange={(e) => {
                  let value = e.target.value?.trim()
                    ? e.target.value.trim().replace(/[^\d]/g, "")
                    : "";
                  setValue("payroll_amount", value);
                }}
              />
              <ErrorMsg errorMessage={errors.payroll_amount?.message} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Reference Name</Form.Label>
              <Form.Control {...register("reference_name")} />
              <ErrorMsg errorMessage={errors.reference_name?.message} />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ zIndex: "9999" }}>
                Reference Phone Number
              </Form.Label>
              <PhoneInput
                country={"in"}
                value={values.reference_phno ? values.reference_phno : "91"}
                onChange={(phone) => setValue("reference_phno", phone)}
              />
              <ErrorMsg errorMessage={errors.reference_phno?.message} />
            </Form.Group>

            {/* Box for file upload */}
            <Form.Group>
              <Form.Label>{`Experience letter in .pdf)`}</Form.Label>
              <Form.Control
                {...register("attachment")}
                className="form-control"
                accept="application/pdf"
                multiple={false}
                type="file"
                onChange={(e) => {
                  updateFormData({
                    attachment: e.target.files[0],
                  });
                }}
              />
              <Span className="error-msg">{errors.attachment?.message}</Span>
            </Form.Group>
          </Box>
          {/* <Form.Group>
            <label className="mt-2">{`Work certificates (EPF, EPF, Relieving letter, experience letter in .pdf)`}</label>
            <Box className="employee_Data_Record_Container documents mt-2 mt-lg-0">
              {" "}
              <FileUpload
                name="work certificates"
                files="statevariable"
                onDropFiles="Functiontodropfiles"
              />
            </Box>{" "}
          </Form.Group> */}
          {/* Box for file upload */}
          <Box className="ems-form">
            <Form.Group className="mt-3">
              <Form.Label>Reason For Relieving</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                {...register("reason_for_leaving")}
                style={{ minHeight: "auto" }}
              />
              <ErrorMsg errorMessage={errors.reason_for_leaving?.message} />
            </Form.Group>
          </Box>
          <Divider />
          <Box className="d-flex justify-content-end">
            <Button
              variant="save"
              type="submit"
              className="square_wrapper save"
            >
              {submitting ? <Loader /> : <SaveIcon />}
            </Button>
            <Button
              variant="delete"
              className="square_wrapper delete ms-1"
              onClick={onCloseEmploymentHistory}
            >
              <CloseIcon />
            </Button>
          </Box>
        </Form>
      </Box>

      {/* Employment history delete Right Modal */}
      <Modal
        show={show.delete_employment_history}
        onHide={closeDeleteEhModal}
        backdrop="static"
        animation={true}
        fullscreen={true}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete employment history</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            Are you sure want to delete the selected employment history record?
            <DeleteAndDiscard
              isSubmitting={submitting}
              onDelete={deleteEh}
              onClose={closeDeleteEhModal}
            />
          </Container>
        </Modal.Body>
      </Modal>
      {/* End */}
    </Box>
  );
}

export default EmploymentHistory;
