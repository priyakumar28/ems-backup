import React, { useState, useRef, useEffect } from "react";

import {
  Form,
  Modal,
  Button,
  Container,
  Table,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import getAbsoluteURL from "../../../utils/getAbsoluteURL";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import moment from "moment";
import { changeDateFormat, isValidDate, ac } from "../../../lib/helpers";
import { emergencyContactsSchema } from "../../../lib/yupHelpers";
import SaveIcon from "../../Icons/SaveIcon";
import AddIcon from "../../Icons/AddIcon";
import EditIcon from "../../Icons/EditIcon";
import DeleteIcon from "../../Icons/DeleteIcon";
import CloseIcon from "../../Icons/CloseIcon";
import Box from "../../Shared/Box";
import Span from "../../Shared/Span";
import DeleteAndDiscard from "../../Shared/DeleteAndDiscard";
import ErrorMsg from "../../Shared/ErrorMsg";

const schema = yup.object().shape(emergencyContactsSchema);

function EmergencyContactDetails(props) {
  const {
    selectedEmployee,
    accesstoken,
    employeeUpdated,
    notify,
    userRoles,
    loggeduseremail,
    admins,
    user
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

  const [showEmergencyContact, setShowEmergencyContact] = useState(false);
  const [emergencyContacts, setemergencyContacts] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [emergencyContactId, setemergencyContactId] = useState(false);
  const [toFormat] = useState("DD-MMM-YYYY");
  const [show, setShow] = useState({});

  useEffect(() => {
    setemergencyContacts(
      typeof selectedEmployee.emergency_contacts == "object"
        ? selectedEmployee.emergency_contacts
        : []
    );
  }, [selectedEmployee]);

  useEffect(() => {
    let emergencyContact = emergencyContactId
      ? emergencyContacts.find((x) => x.id == emergencyContactId)
      : false;
    if (emergencyContact) {
      for (const property in emergencyContact) {
        if (schema._nodes.includes(property)) {
          if (["date_start", "date_end"].includes(property)) {
            emergencyContact[property] = isValidDate(emergencyContact[property])
              ? changeDateFormat(emergencyContact[property], toFormat)
              : changeDateFormat(moment(), toFormat);
          }
          setValue(property, emergencyContact[property]);
        }
      }
    }
  }, [emergencyContactId]);

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

  const onshowEmergencyContact = (id = null) => {
    setShowEmergencyContact(true);
    if (id) {
      setemergencyContactId(id);
    } else {
      reset();
    }
  };

  const onCloseEmergencyContact = () => {
    setShowEmergencyContact(false);
    setemergencyContactId(false);
    reset();
    setSubmitting(false);
  };

  const Loader = () => {
    return <Box className="loader xs green"></Box>;
  };

  const onSubmitHandler = (data) => {
    for (const property in data) {
      if (data[property] == "null") data[property] = null;
      if (typeof data[property] == "string" && data[property]?.trim() == "")
        data[property] = null;
    }

      data["employee"] = selectedEmployee.id;

    let endpoint = getAbsoluteURL("controllers/emergencycontacts");

    if (emergencyContactId) endpoint = `${endpoint}?id=${emergencyContactId}`;

    setSubmitting(true);
    axios(
      Object.assign(
        {
          method: emergencyContactId ? "PUT" : "POST",
          url: endpoint,
          data: data,
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
          if (emergencyContactId) {
            let emergencyContactIndex = emergencyContacts.findIndex(
              (x) => x.id == emergencyContactId
            );
            emergencyContacts[emergencyContactIndex] = response.data.data;
            setemergencyContacts([]);
          } else {
            emergencyContacts.unshift(response.data.data);
          }
          setTimeout(() => {
            setemergencyContacts([...emergencyContacts]);
          }, 100);
          onCloseEmergencyContact();
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

  const closeDeleteEhModal = () => {
    handleClose("delete_emp_emergency_contact");
    setemergencyContactId(false);
    setSubmitting(false);
  };

  const deleteEh = async () => {
    let endpoint = getAbsoluteURL(
      `controllers/emergencycontacts?id=${emergencyContactId}&emp=${selectedEmployee.id}`
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
          let emergencyContactIndex = emergencyContacts.findIndex(
            (x) => x.id == emergencyContactId
          );
          if (emergencyContactIndex > -1) {
            emergencyContacts.splice(emergencyContactIndex, 1);
          }
          setemergencyContacts([]);
          selectedEmployee.employment_history = emergencyContacts;
          employeeUpdated(selectedEmployee);
          setTimeout(() => {
            setemergencyContacts([...emergencyContacts]);
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
      <Table
        className={`ems-table ${showEmergencyContact ? "remove" : ""}`}
        size="lg"
      >
        {emergencyContacts && emergencyContacts?.length > 0 ? (
          <thead>
            <tr>
              <th>Name</th>
              <th>Relationship</th>
              <th>HomePhone</th>
              <th>WorkPhone</th>
              <th></th>
            </tr>
          </thead>
        ) : ("")}
        <tbody>
          {emergencyContacts && emergencyContacts?.length > 0 ? (
            emergencyContacts.map(
              ({ id, name, relationship, home_phone, work_phone }, index) => (
                <tr key={index}>
                  <td data-label="Name">{name}</td>
                  <td data-label="Relationship">{relationship}</td>
                  <td data-label="HomePhone">{home_phone}</td>
                  <td data-label="Workphone">{work_phone}</td>
                  <td>
                    <Span className="d-flex justify-content-end">
                      <Span
                        className="square_wrapper edit"
                        isClick={() => {
                          if (
                            ac(userRoles,"Update emergency contacts", loggeduseremail,admins) || (user.employee.employee_id === selectedEmployee.employee_id)
                          ) {
                            onshowEmergencyContact(id);
                          } else {
                            notify({
                              success: false,
                              message: "You don't have permission",
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
                              "Delete emergency contacts",
                              loggeduseremail,
                              admins
                            ) || (user.employee.employee_id === selectedEmployee.employee_id)
                          ) {
                            handleShow("delete_emp_emergency_contact");
                            setemergencyContactId(id);
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
                    </Span>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr className="no-hover">
                <td colSpan={5} style={{ textAlign: "center" }}>
                  Click &nbsp;
              <Span
                isClick={() => {
                  if (ac(userRoles,"Create emergency contacts",loggeduseremail,admins) || (user.employee.employee_id === selectedEmployee.employee_id)) {
                    onshowEmergencyContact();
                  } else {
                    notify({
                      success: false,
                      message: "You don't have permission",
                    });
                  }
                }}
              >
                <AddIcon />
              </Span> To Add Emergency Contacts
              </td>
            </tr>
          )}
          {emergencyContacts && emergencyContacts?.length > 0 && (
            <tr className="no-hover">
              <td colSpan={5} style={{ textAlign: "center" }}>
              <Button style={{height:35, width:210, background:"white"}} onClick={() =>
               onshowEmergencyContact()}>
              <span style={{color:"black"}}> Add Emergency Contacts </span>
                </Button>
              </td>
            </tr>)}
        </tbody>
      </Table>
      <Form
        onSubmit={handleSubmit(onSubmitHandler)}
        className={`edit-form-wrapper  ${showEmergencyContact ? "show" : ""}`}
      >
        <Box className="form-grid ems-form">
          <Form.Group>
            <Form.Label>
              Name <Span className="required">*</Span>
            </Form.Label>
            <Form.Control {...register("name")} placeholder="" />
            <ErrorMsg errorMessage={errors.name?.message} />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Relationship <Span className="required">*</Span>
            </Form.Label>
            <Form.Select {...register("relationship")} className="form-control">
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Spouse">Spouse</option>
              <option value="Daughter">Daughter</option>
              <option value="Son">Son</option>
              <option value="Guardian">Guardian</option>
            </Form.Select>
            <ErrorMsg errorMessage={errors.relationship?.message} />
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ zIndex: "9999" }}>
              Home Phone <Span className="required">*</Span>
            </Form.Label>
            <PhoneInput
              country={"in"}
              value={values.home_phone}
              onChange={(phone) => {
                setValue("home_phone", phone);
              }}
            />
            <ErrorMsg errorMessage={errors.home_phone?.message} />
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ zIndex: "9999" }}>Work Phone</Form.Label>
            <PhoneInput
              country={"in"}
              value={values.work_phone}
              onChange={(phone) => {
                setValue("work_phone", phone);
              }}
            />
            <ErrorMsg errorMessage={errors.work_phone?.message} />
          </Form.Group>
        </Box>
        <Box className="d-flex justify-content-end mt-4">
          <Button
            variant="save"
            disabled={submitting}
            type="submit"
            className="square_wrapper save"
          >
            {submitting ? <Loader /> : <SaveIcon />}
          </Button>
          <Button
            variant="delete"
            className="square_wrapper delete ms-1"
            onClick={() => setShowEmergencyContact(false)}
          >
            <CloseIcon />
          </Button>
        </Box>
      </Form>
      {/* Employment history delete Right Modal */}
      <Modal
        show={show.delete_emp_emergency_contact}
        onHide={closeDeleteEhModal}
        backdrop="static"
        animation={true}
        fullscreen={true}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete emergency contacts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            Are you sure want to delete the selected emergency contact record?
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

export default EmergencyContactDetails;
