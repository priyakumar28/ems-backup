import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import getAbsoluteURL from "../../utils/getAbsoluteURL";
import axios from "axios";
import { employeeprojectSchema } from "../../lib/yupHelpers";
import UpArrow from "../Icons/UpArrow";
import {
  isValidDate,
  employeeprojectstatus,
  changeDateFormat,
  EMPLOYEE_PROJECT_STATUS,
  ac
} from "../../lib/helpers";
import {
  Badge,
  Button,
  Container,
  Form,
  Modal,
  Row,
  Stack,
  Table,
} from "react-bootstrap";
import ReactDataTable from "../Shared/ReactDataTable";
import SaveIcon from "../Icons/SaveIcon";
import AddIcon from "../Icons/AddIcon";
import DeleteIcon from "../Icons/DeleteIcon";
import Box from "../Shared/Box";
import Span from "../Shared/Span";
import EditIcon from "../Icons/EditIcon";
import CloseIcon from "../Icons/CloseIcon";
import DatePicker from "react-datepicker";
import DeleteAndDiscard from "../Shared/DeleteAndDiscard";
import ErrorMsg from "../Shared/ErrorMsg";
import Select from "react-select";

const schema = yup.object().shape(employeeprojectSchema);

function EmployeeProjects(props) {
  const {
    selectedProject,
    accesstoken,
    notify,
    userRoles,
    loggeduseremail,
    employees,
    admins
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

  // in this component whereve wants to close setOpenExportEmp(false)

  const values = watch();
  // Callback version of watch.  It's your responsibility to unsubscribe when done.
  React.useEffect(() => {
    const subscription = watch();
    return () => subscription.unsubscribe();
  }, [watch]);
  const dpRef = useRef();
  const [showEmployeeprojects, setShowEmployeeprojects] = useState(false);
  const [employeeprojects, setemployeeprojects] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [employeeprojectsId, setemployeeprojectsId] = useState(false);
  const [show, setShow] = useState({});
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setselectedRoles] = useState([]);
  const [bill, setBill] = useState("");
  const [emparr, setEmparr] = useState(employees);
  const [selectedprojemp, setSelectedProjEmp] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedemp, setselectedemp] = useState("");
  const [bull, setBull] = useState("");
  const viewRoles = (roless) => {
    if (typeof roless == "object" && roless?.length > 0) {
      return roless.map((x) => x.name).join(", ");
    } else {
      return "No roles assigned yet";
    }
  };
  useEffect(() => {
    if (selectedProject?.id) {
      try {
        let endpoint = getAbsoluteURL(
          `controllers/employeeprojects?projectId=${selectedProject.id}`
        );
        axios.get(endpoint, config).then((response) => {
          setemployeeprojects(response.data.data);
          setBull(response.data.data.bill_percent);
          let a = response.data.data.map((x) => x.employee.work_email);
          let employees1 = employees.filter((x) => !a.includes(x.work_email));
          setEmparr(employees1);
        });
      } catch (err) { }
      try {
        let endpoint = getAbsoluteURL(`controllers/users/userroles`);
        axios
          .get(endpoint, config)
          .then((response) => {
            const transformed = response.data.data.map(({ id, name }) => ({
              value: id,
              label: name,
            }));
            setRoles(transformed);
          })
          .catch((error) => {
          });
      } catch (err) {
      }
    }
  }, [selectedProject]);

  useEffect(() => {
    let employeeproject = employeeprojectsId
      ? employeeprojects.find((x) => x.id == employeeprojectsId)
      : false;
    if (employeeproject) {
      let assocs = ["employees"];
      for (const property in employeeproject) {
        if (schema._nodes.includes(property) && assocs.includes(property)) {
          setValue(property, employeeproject[property]?.id);
        } else if (schema._nodes.includes(property)) {
          setValue(property, employeeproject[property]);
        }
        else {
          setValue(property, employeeproject[property]);
        }
      }
    }
  }, [employeeprojectsId]);
  useEffect(() => {
    if (selectedemp && typeof selectedemp === "object") {
      let empRoles = selectedemp?.roles;
      setselectedRoles([]);
      if (typeof empRoles === "object" && empRoles.length > 0) {
        setselectedRoles(
          empRoles.map((x) => {
            return { label: x.name, value: x.id };
          })
        );
      }
    }
  }, [selectedemp]);

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

  const onshowEmployeeprojects = (id = null) => {
    setShowEmployeeprojects(true);
    if (id) {
      setemployeeprojectsId(id);
    } else {
      reset();
    }
  };

  const onCloseEmployeeprojects = () => {
    setShowEmployeeprojects(false);
    setemployeeprojectsId(false);
    reset();
    setSubmitting(false);
  };
  const Loader = () => {
    return <Box className="loader xs green"></Box>;
  };
  const onSubmitHandler = (dataa) => {
    for (const property in dataa) {
      if (dataa[property] == "null") dataa[property] = null;
      if (typeof dataa[property] == "string" && dataa[property]?.trim() == "")
        dataa[property] = null;
    }
    dataa["project"] = selectedProject.id;
    dataa["roles"] = selectedRoles;
    dataa["status"] = "Current";
    let endpoint = getAbsoluteURL("controllers/employeeprojects");
    if (employeeprojectsId) endpoint = `${endpoint}?id=${employeeprojectsId}`;
    setSubmitting(true);
    axios(
      Object.assign(
        {
          method: employeeprojectsId ? "PUT" : "POST",
          url: endpoint,
          data: dataa,
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
          if (response.data.message === "New Employee Project Created") {
            let z = response.data.data.data.employee.work_email;
            let a = emparr.filter((item) => item.work_email != z);
            setEmparr(a);
          }
          if (employeeprojectsId) {
            let employeeprojectsIndex = employeeprojects.findIndex(
              (x) => x.id == employeeprojectsId
            );
            employeeprojects[employeeprojectsIndex] = response.data.data.data;
            setemployeeprojects([]);
          } else {
            employeeprojects.unshift(response.data.data.data);
          }

          setTimeout(() => {
            setemployeeprojects([...employeeprojects]);
          }, 500);
          onCloseEmployeeprojects();
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
  const closeDeleteEmployeeprojectsModal = () => {
    handleClose("delete_employee_projects");
    setemployeeprojectsId(false);
    setSubmitting(false);
  };

  const deleteEmployeeprojectsModal = async () => {
    let endpoint = getAbsoluteURL(
      `controllers/employeeprojects?id=${employeeprojectsId}`
    );
    setSubmitting(true);
    axios(
      Object.assign(
        {
          method: "PUT",
          url: endpoint,
          data: { status: "Inactive" },
        },
        config
      )
    )
      .then((response) => {
        notify({
          success: response.data.code === 200,
          message: "Employee status changed to Inactive",
        });
        if (response.data.code === 200) {
          if (employeeprojectsId) {
            let employeeprojectsIndex = employeeprojects.findIndex(
              (x) => x.id == employeeprojectsId
            );
            employeeprojects[employeeprojectsIndex] = response.data.data.data;
            setemployeeprojects([]);
            emparr.push(response.data.data.data.employee);
          } else {
            employeeprojects.unshift(response.data.data.data);
          }

          setTimeout(() => {
            setemployeeprojects([...employeeprojects]);
          }, 500);
          closeDeleteEmployeeprojectsModal();
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
  const [Eshow, setEshow] = useState({});

  const handleEPshow = (type) => {
    let showw = Eshow;
    setEshow(false);
    setTimeout(() => {
      setEshow(Object.assign(showw, { [type]: true }));
    }, 100);
  };

  const handleEClose = (type) => {
    let showw = Eshow;
    setEshow(false);
    setTimeout(() => {
      setEshow(Object.assign(showw, { [type]: false }));
    }, 100);
  };
  const [selectedExpEmpProStatus, setselectedExpEmpProStatus] = useState({
    column: "",
    value: "all",
  });
  const [columns] = useState([
    { data: "id", title: "Employee ID" },
    {
      data: {
        first_name: "employee.first_name",
        last_name: "employee.last_name",
      },
      mRender: function (e_data) {
        return e_data.employee.first_name + " " + e_data.employee.last_name;
      },
      title: "Employee name",
    },
    { data: "details", title: "Details", visible: false },
    { data: "bill_type", title: "Bill Type" },
    { data: "bill_percent", title: "Bill Percent" },
    { data: "date_start", title: "Start_date" },
    { data: "date_end", title: "End_date" },
    { data: "status", title: "Status" },
    { data: "comments", title: "Comments", visible: false },
    {
      data: "roles",
      mRender: function (r_data) {
        let rolesC = " ";
        for (const element of r_data) {
          rolesC = rolesC + element.name + " ";
        }
        return rolesC;
      },
      title: "Roles",
    },
  ]);
  const [data, setData] = useState([]);

  const exportEmployeeProjects = async () => {
    try {
      const { column, value } = selectedExpEmpProStatus;
      let project_id = selectedProject.id;

      let endpoint = getAbsoluteURL(
        `controllers/employeeprojects/exportEmployeeProjects?column=${column}&value=${value}&projectId=${project_id}`
      );

      setSubmitting(true); //set state
      axios({
        url: endpoint,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
        data: {
          projectId: project_id,
        },
      })
        .then((response) => {
          notify({ success: response.data.code === 200, message: response.data.message });
          if (response.data.code === 200 && response?.data?.data?.length > 0) {
            setData([...response.data.data]);
          } else {
            setData([]);
            notify({ success: false, message: "Employees list is empty" });
          }
          setSubmitting(false);
        })
        .catch((error) => {
          let error_msg = "Something went wrong";
          if (error.response) {
            if (error.response.data) {
              error_msg = error.response.data.message;
            }
          }
          notify({ success: false, message: error_msg });
          setSubmitting(false);
        });
    } catch (e) {
      setSubmitting(false);
      notify({ success: false, message: "Error in fetching Employees list" });
    }
  };

  return (
    <Container fluid>
      {ac(userRoles, "View employee project", loggeduseremail, admins) ?
        <>
          <Stack className='gap-4 justify-content-end mt-3' direction='horizontal' >
            <Span variant="white" isClick={() => handleEPshow("export_employeeprojects")} className="d-flex pointer" style={{ lineHeight: "1" }}><UpArrow className="lg" /> Export employeeprojects</Span>
            {ac(userRoles, "Assign employees to project", loggeduseremail, admins) &&
              <Span
                isClick={() => {
                  onshowEmployeeprojects();
                  setSelectedProjEmp(false);
                  setselectedRoles([]);
                  setBill("Billable");
                }}
                className="d-flex pointer"
              >
                <AddIcon /> Assign Employess
              </Span>
            }
          </Stack>
          <Table
            className={`ems-table mt-3 ${showEmployeeprojects ? "remove" : ""}`}
            size="lg"
          >
            <thead>
              <tr>
                <th>Employee</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Details</th>
                <th>Bill Type</th>
                <th>Bill Percent</th>
                <th>Comments</th>
                <th>Roles</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {employeeprojects && employeeprojects?.length > 0 ? (
                employeeprojects.map(
                  (
                    {
                      id,
                      employee,
                      date_start,
                      date_end,
                      status,
                      details,
                      bill_type,
                      bill_percent,
                      comments,
                      roles,
                    },
                    index
                  ) => (
                    <tr key={index}>
                      <td>{employee.work_email}</td>
                      <td>{changeDateFormat(date_start, "DD-MM-YYYY")}</td>
                      <td>{changeDateFormat(date_end, "DD-MM-YYYY")}</td>
                      <td>
                        <Span className="elipsis-td" title={details}>
                          {details}
                        </Span>
                      </td>
                      <td>{bill_type}</td>
                      <td>{bill_percent}</td>
                      <td>
                        <Span className="elipsis-td" title={comments}>
                          {comments}
                        </Span>
                      </td>
                      <td>{viewRoles(roles)}</td>
                      <td style={{ textAlign: "middle" }}>
                        <Badge
                          bg={employeeprojectstatus[status]}
                          className="f-12 badge-width"
                        >
                          {status}
                        </Badge>
                      </td>
                      <td>
                        {status === "Current" && (
                          <Span className="d-flex justify-content-end">
                            {ac(userRoles, "Update employee project", loggeduseremail, admins) &&
                              <Span
                                className="square_wrapper edit"
                                isClick={() => {
                                  onshowEmployeeprojects(id);
                                  setselectedemp(employeeprojects[index]);
                                  setselectedRoles(selectedemp.roles);
                                  setEdit(true);
                                  setTimeout(() => {
                                    setSelectedProjEmp(employee);
                                    setValue("employee", employee.id);
                                  }, 10);
                                  setBull("");
                                  setBill(bill_type);
                                }}
                              >
                                <EditIcon />
                              </Span>
                            }
                            {ac(userRoles, "Remove employees from project", loggeduseremail, admins) &&
                              <Span
                                isClick={() => {
                                  handleShow("delete_employee_projects");
                                  setemployeeprojectsId(id);
                                  setTimeout(() => {
                                    setSelectedProjEmp(employee);
                                    setValue("employee", employee.id);
                                  }, 10);
                                  reset();
                                }}
                                className="square_wrapper delete  ms-2"
                              >
                                <DeleteIcon />
                              </Span>
                            }
                          </Span>
                        )}
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr className="no-hover">
                  <td colSpan={7} style={{ textAlign: "center" }}>
                    {" "}
                    No Employee were assigned
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </>
        : <Row className='justify-content-center'> You don't have access to view employees in projects</Row>
      }
      <Modal
        show={showEmployeeprojects}
        onHide={() => {
          setShowEmployeeprojects(false);
          setEdit(false);
        }}
        backdrop="static"
        animation={true}
        fullscreen={true}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Assign employees</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form
              onSubmit={handleSubmit(onSubmitHandler)}
              className={`edit-form-wrapper show`}
            >
              <Box className="form-grid ems-form">
                <Form.Group className="position-relative">
                  <Form.Label>Employee</Form.Label>
                  {selectedprojemp?.id ? (
                    <Form.Control readOnly value={selectedprojemp.work_email} />
                  ) : (
                    <Form.Select
                      {...register("employee")}
                      className="form-control-select"
                      onChange={(e) => {
                        setValue("employee", e.target.value);
                      }}
                    >
                      <option value={"null"}>Select Employee</option>
                      {emparr &&
                        emparr.map(({ id, work_email }, index) => (
                          <option key={index} value={id}>
                            {work_email}
                          </option>
                        ))}
                    </Form.Select>
                  )}
                  <ErrorMsg errorMessage={errors.employee?.message} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Start Date</Form.Label>
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
                    dateFormat="dd-MM-yyyy"
                  />
                  <ErrorMsg errorMessage={errors.date_start?.message} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>End Date</Form.Label>
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
                    dateFormat="dd-MM-yyyy"
                  />
                  <ErrorMsg errorMessage={errors.date_end?.message} />
                </Form.Group>
              </Box>
              <Box className="ems-form mt-2">
                <Form.Group>
                  <Form.Label>Details</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    {...register("details")}
                  />
                  <ErrorMsg errorMessage={errors.details?.message} />
                </Form.Group>
              </Box>
              <Box className="form-grid-2 ems-form mt-2">
                <Form.Group className="position-relative">
                  <Form.Label>Bill Type</Form.Label>
                  <Form.Select
                    {...register("bill_type")}
                    className="form-control select"
                    onChange={(e) => {
                      if (edit) {
                        if (e.target.value == "Non Billable") {
                          setBill(e.target.value);
                          setBull(getValues("bill_percent"));
                          setValue("bill_percent", 0.0);
                        } else if (e.target.value == "Billable") {
                          setBill(e.target.value);
                          setValue("bill_percent", bull);
                        }
                      }
                      setBill(e.target.value);
                      if (e.target.value == "Non Billable") {
                        setValue("bill_percent", 0.0);
                      }
                    }}
                  >
                    <option value={"Billable"}>{"Billable"}</option>
                    <option value={"Non Billable"}>{"Non Billable"}</option>
                  </Form.Select>
                  <ErrorMsg errorMessage={errors.bill_type?.message} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Bill Percent <Span className="required">*</Span>
                  </Form.Label>
                  <Form.Control
                    {...register("bill_percent")}
                    disabled={bill === "Non Billable" ? true : false}
                    placeholder="00.00"
                  />
                  <ErrorMsg errorMessage={errors.bill_percent?.message} />
                </Form.Group>
              </Box>
              <Box className="ems-form mt-2">
                <Form.Group>
                  <Form.Label>Comments</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    {...register("comments")}
                  />
                  <ErrorMsg errorMessage={errors.comments?.message} />
                </Form.Group>
              </Box>
              <Box className="form-grid-2 ems-form mt-2">
                <Form.Group>
                  <Form.Label>Roles</Form.Label>
                  <Select
                    closeMenuOnSelect={false}
                    isMulti
                    value={selectedRoles}
                    onChange={setselectedRoles}
                    options={roles}
                    noOptionsMessage={() => "No roles found!"}
                  />
                </Form.Group>
              </Box>
              <Box className="d-flex justify-content-end mt-4">
                <Button
                  variant="save"
                  disabled={submitting}
                  type="submit"
                  className=" save"
                >
                  {submitting ? <Loader /> :
                    <><SaveIcon />&nbsp;Submit</>
                  }
                </Button>
                <Button
                  variant="delete"
                  className="delete ms-1"
                  onClick={() => {
                    setShowEmployeeprojects(false);
                    setEdit(false);
                  }}
                >
                  <><CloseIcon />&nbsp;Discard</>
                </Button>
              </Box>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
      {/* Export employees in project */}
      <Modal
        show={Eshow.export_employeeprojects}
        onHide={() => handleEClose("export_employeeprojects")}
        backdrop="static"
        animation={true}
        fullscreen={true}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Export Employeeprojects</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form.Group>
              <Form.Label>Select status</Form.Label>
              <Form.Select
                onChange={(e) => {
                  let index = e.target.selectedIndex;
                  let value = e.target.options[index].value;
                  let datatype =
                    e.target.options[index].getAttribute("datatype");
                  setselectedExpEmpProStatus({
                    ...{ column: datatype, value },
                  });
                }}
                className="form-control"
              >
                <option value={"all"}>All</option>
                <optgroup
                  label="Status"
                  style={{ fontSize: "15px", fontWeight: "500" }}
                >
                  {EMPLOYEE_PROJECT_STATUS.map(({ status }, index) => (
                    <option datatype="status" value={status} key={index}>
                      {status}
                    </option>
                  ))}
                </optgroup>
              </Form.Select>
              <Span className="error-msg">
                {errors.export_employeeprojects?.message}
              </Span>
            </Form.Group>
            <Stack direction="horizontal" className="pt-3 justify-content-end">
              <Button
                variant="save"
                disabled={submitting}
                onClick={exportEmployeeProjects}
                className="save "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-check me-2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>{" "}
                {submitting ? "Previewing..." : "Preview"}
              </Button>
            </Stack>
            <ReactDataTable
              columns={columns}
              data={data}
              isExportTrue={true}
              isPagingTrue={true}
              isSearching={true}
              emptyTableMessage={"No matched employees found"}
            />
          </Container>
        </Modal.Body>
      </Modal>
      {/* Employee Detail delete Right Modal */}
      <Modal
        show={show.delete_employee_projects}
        onHide={closeDeleteEmployeeprojectsModal}
        backdrop="static"
        animation={true}
        fullscreen={true}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove an Employee From Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            Are you sure want to remove {selectedprojemp.work_email} from this
            project?
            <DeleteAndDiscard
              isSubmitting={submitting}
              onDelete={deleteEmployeeprojectsModal}
              onClose={closeDeleteEmployeeprojectsModal}
            />
          </Container>
        </Modal.Body>
      </Modal>
      {/* <Modal
        show={delete_employee_projects}
        onHide={deleteEmployeeprojectsModal}
        backdrop="static"
        animation={true}
        fullscreen={true}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Employee projects detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            Are you sure want to delete the selected employee_Project details?
            <DeleteAndDiscard
              isSubmitting={submitting}
              onDelete={delete_employee_projects}
              onClose={closeDeleteEmployeeprojectsModal}
            />
          </Container>
        </Modal.Body>
      </Modal> */}
    </Container>
  );
}
export default EmployeeProjects;

