import React, { useState, useEffect } from "react";
import { Button, Form, Table, Modal, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import getAbsoluteURL from "../../../utils/getAbsoluteURL";
import axios from "axios";
import DatePicker from "react-datepicker";
import { employeeSkillSchema } from "../../../lib/yupHelpers";
import {
  changeDateFormat,
  isValidDate,
  isValidURL,
  ac,
} from "../../../lib/helpers";
import AddIcon from "../../Icons/AddIcon";
import DeleteAndDiscard from "../../Shared/DeleteAndDiscard";
import SaveIcon from "../../Icons/SaveIcon";
import Span from "../../Shared/Span";
import Box from "../../Shared/Box";
import EditIcon from "../../Icons/EditIcon";
import DeleteIcon from "../../Icons/DeleteIcon";
import CloseIcon from "../../Icons/CloseIcon";

const schema = yup.object().shape(employeeSkillSchema);

function SkillsAndCertification(props) {
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
    getValues,
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const values = watch();

  // Callback version of watch.  It's your responsibility to unsubscribe when done.
  React.useEffect(() => {
    const subscription = watch(() => console.log());
    return () => subscription.unsubscribe();
  }, [watch]);

  const [showEmpSkill, setShowEmpSkill] = useState(false);
  const [empSkills, setempSkills] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [skillId, setskillId] = useState(false);
  const [show, setShow] = useState({});

  const initialFormData = Object.freeze({
    attachment: null,
  });
  const [formData, updateFormData] = React.useState(initialFormData);

  useEffect(() => {
    setempSkills(
      typeof selectedEmployee.skills == "object" ? selectedEmployee.skills : []
    );
  }, [selectedEmployee]);

  useEffect(() => {
    let td = skillId ? empSkills.find((x) => x.id == skillId) : false;
    if (td) {
      for (const property in td) {
        if (schema._nodes.includes(property)) {
          setValue(property, td[property]);
        }
      }
    }
  }, [skillId]);

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

  const onShowEmpSkill = (id = null) => {
    setShowEmpSkill(true);
    updateFormData(initialFormData);
    if (id) {
      setskillId(id);
    } else {
      reset();
    }
  };

  const onCloseEmpSkill = () => {
    setShowEmpSkill(false);
    setskillId(false);
    reset();
    setSubmitting(false);
    updateFormData(initialFormData);
  };

  const Loader = () => {
    return <Box className="loader xs green"></Box>;
  };

  const closeDeleteSkillModal = () => {
    handleClose("delete_emp_skill");
    setskillId(false);
    setSubmitting(false);
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
      let endPoint = getAbsoluteURL("controllers/employeeskills");

      if (skillId) endPoint = `${endPoint}?id=${skillId}`;

      setSubmitting(true);

      axios({
        method: skillId ? "PUT" : "POST",
        url: endPoint,
        data: formDataa,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          console.log("WHERE IS THE PROB", response.data.data);
          notify({
            success: response.data.code === 200,
            message: response.data.message,
          });
          if (response.data.code === 200) {
            if (skillId) {
              let tdIndex = empSkills.findIndex((x) => x.id == skillId);
              empSkills[tdIndex] = response.data.data;
              setempSkills([]);
            } else {
              empSkills.unshift(response.data.data);
            }

            setTimeout(() => {
              setempSkills([...empSkills]);
            }, 100);
            onCloseEmpSkill();
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

  const deleteSkill = async () => {
    let endpoint = getAbsoluteURL(
      `controllers/employeeskills?id=${skillId}&employee=${selectedEmployee.id}`
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
          let ehIndex = empSkills.findIndex((x) => x.id == skillId);
          if (ehIndex > -1) {
            empSkills.splice(ehIndex, 1);
          }
          setempSkills([]);
          selectedEmployee.skills = empSkills;
          employeeUpdated(selectedEmployee);
          setTimeout(() => {
            setempSkills([...empSkills]);
          }, 100);
          closeDeleteSkillModal();
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
      <Table className={`ems-table ${showEmpSkill ? "remove" : ""}`} size="lg">
        {empSkills && empSkills?.length > 0 ? (
          <thead>
            <tr>
              <th>Name</th>
              <th>Is certified</th>
              <th>Attachment</th>
              <th>Valid from</th>
              <th>Valid through</th>
              <th>Details</th>
              <th></th>
            </tr>
          </thead>
        ) : (
          ""
        )}
        <tbody>
          {empSkills && empSkills?.length > 0 ? (
            empSkills.map(
              (
                {
                  id,
                  skill_name,
                  is_certified,
                  attachment,
                  date_start,
                  date_end,
                  details,
                },
                index
              ) => (
                <tr key={index}>
                  <td data-label="Name">{skill_name}</td>
                  <td data-label="Is Certified">{is_certified}</td>
                  <td data-label="Attachment">
                    {is_certified == "Yes" && isValidURL(attachment) ? (
                      <a href={attachment} download={skill_name}>
                        Download file
                      </a>
                    ) : (
                      <>-</>
                    )}
                  </td>
                  <td data-label="Valid from">
                    {changeDateFormat(date_start, "MMM-YYYY")}
                  </td>
                  <td data-label="Valid through">
                    {changeDateFormat(date_end, "MMM-YYYY")}
                  </td>
                  <td data-label="Details">
                    <Span className="elipsis-td" title={details}>
                      {details}
                    </Span>
                  </td>
                  <td>
                    <Span className="d-flex justify-content-end">
                      <Span
                        className="square_wrapper edit"
                        isClick={() => {
                          if (
                            ac(
                              userRoles,
                              "Update skills & certifications",
                              loggeduseremail,
                              admins
                            ) ||
                            user.employee.employee_id ===
                              selectedEmployee.employee_id
                          ) {
                            onShowEmpSkill(id);
                          } else {
                            notify({
                              success: false,
                              message: "You dont't have permission",
                            });
                          }
                        }}
                      >
                        <EditIcon />
                      </Span>
                      <Span
                        isClick={() => {
                          if (
                            ac(
                              userRoles,
                              "Delete skills & certifications",
                              loggeduseremail,
                              admins
                            ) ||
                            user.employee.employee_id ===
                              selectedEmployee.employee_id
                          ) {
                            handleShow("delete_emp_skill");
                            setskillId(id);
                          } else {
                            notify({
                              success: false,
                              message: "You dont't have permission",
                            });
                          }
                        }}
                        className="square_wrapper delete  ms-2"
                      >
                        <DeleteIcon />
                      </Span>
                    </Span>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr className="no-hover">
              <td colSpan={7} style={{ textAlign: "center" }}>
                Click{" "}
                <Span
                  isClick={() => {
                    if (
                      ac(
                        userRoles,
                        "Create skills & certifications",
                        loggeduseremail,
                        admins
                      ) ||
                      user.employee.employee_id === selectedEmployee.employee_id
                    ) {
                      onShowEmpSkill();
                    } else {
                      notify({
                        success: false,
                        message: "You dont't have permission",
                      });
                    }
                  }}
                >
                  <AddIcon />
                </Span>{" "}
                To Add Skills or Certifications
              </td>
            </tr>
          )}
          {empSkills && empSkills?.length > 0 && (
            <tr className="no-hover">
              <td colSpan={7} style={{ textAlign: "center" }}>
                <Button
                  style={{ height: 35, width: 225, background: "white" }}
                  onClick={() => onShowEmpSkill()}
                >
                  <span style={{ color: "black" }}>
                    {" "}
                    Add Skills And Cerifications
                  </span>
                </Button>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <Form
        onSubmit={handleSubmit(onSubmitHandler)}
        className={`edit-form-wrapper ems-form pt-2 ${
          showEmpSkill ? "show" : ""
        }`}
      >
        <Box
          className={`ems-form ${
            getValues("is_certified") == "Yes" ? "form-grid" : "form-grid-2"
          }`}
        >
          <Form.Group>
            <Form.Label>
              Skill/Certification name <Span className="required">*</Span>
            </Form.Label>
            <Form.Control {...register("skill_name")} />
            <Span className="error-msg">{errors.skill_name?.message}</Span>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Is certified <Span className="required">*</Span>
            </Form.Label>
            <Form.Select {...register("is_certified")} className="form-control">
              <option value={"null"}>Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Select>
            <Span className="error-msg">{errors.is_certified?.message}</Span>
          </Form.Group>

          {getValues("is_certified") == "Yes" && (
            <>
              <Form.Group>
                <Form.Label>Certificate attachment(pdf, 2MB)</Form.Label>
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
              <Form.Group
                className="position-relative flex-2"
                style={{ background: "transparent" }}
              >
                <Form.Label>Certified On</Form.Label>
                <DatePicker
                  selected={
                    isValidDate(values.date_start)
                      ? new Date(values.date_start)
                      : ""
                  }
                  className="form-control"
                  onChange={(date) => {
                    setValue("date_start", new Date(date));
                  }}
                  dateFormat="dd-MMM-yyyy"
                />
                <Span className="error-msg">{errors.date_start?.message}</Span>
              </Form.Group>
              <Form.Group
                className="position-relative flex-2"
                style={{ background: "transparent" }}
              >
                <Form.Label>Valid through</Form.Label>
                <DatePicker
                  selected={
                    isValidDate(values.date_end)
                      ? new Date(values.date_end)
                      : ""
                  }
                  className="form-control"
                  onChange={(date) => {
                    setValue("date_end", new Date(date));
                  }}
                  dateFormat="dd-MMM-yyyy"
                />
                <Span className="error-msg">{errors.date_end?.message}</Span>
              </Form.Group>
            </>
          )}
        </Box>
        <Form.Group className="mt-2">
          <Form.Label>Details</Form.Label>
          <Form.Control as="textarea" rows={5} {...register("details")} />
          <Span className="error-msg">{errors.details?.message}</Span>
        </Form.Group>
        <Box className="d-flex justify-content-end mt-4">
          <Button variant="save" type="submit" className="square_wrapper save">
            {submitting ? <Loader /> : <SaveIcon />}
          </Button>
          <Button
            variant="delete"
            className="square_wrapper delete ms-1"
            onClick={onCloseEmpSkill}
          >
            <CloseIcon />
          </Button>
        </Box>
      </Form>

      {/* Skill delete Right Modal */}
      <Modal
        show={show.delete_emp_skill}
        onHide={closeDeleteSkillModal}
        backdrop="static"
        animation={true}
        fullscreen={true}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete skill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            Are you sure want to delete the selected skill record?
            <DeleteAndDiscard
              isSubmitting={submitting}
              onDelete={deleteSkill}
              onClose={closeDeleteSkillModal}
            />
          </Container>
        </Modal.Body>
      </Modal>
      {/* End */}
    </Box>
  );
}

export default SkillsAndCertification;
