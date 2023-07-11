import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Form,
  Table,
  Badge,
  Stack,
  Modal,
} from "react-bootstrap";
import Select from "react-select";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import getAbsoluteURL from "../../utils/getAbsoluteURL";
import axios from "axios";
import { useForm } from "react-hook-form";
import { departmentSchema } from "../../lib/yupHelpers";
import { getUniqueListBy, ac } from "../../lib/helpers";
import ListViewIcon from "../Icons/ListViewIcon";
import GridViewIcon from "../Icons/GridViewIcon";
import SliderIcon from "../Icons/SliderIcon";
import Meta from "../Meta";
import SearchIcon from "../Icons/SearchIcon";
import NoResultsWrapper from "../Shared/NoResultsWrapper";
import FetchingWrapper from "../Shared/FetchingWrapper";
import EmsModal from "../Shared/EmsModal";
import EmsModalHeader from "../Shared/EmsModalHeader";
import EmsModalClose from "../Shared/EmsModalClose";
import EmsModalBody from "../Shared/EmsModalBody";
import Span from "../Shared/Span";
import SubTitle from "../Shared/SubTitle";
import Box from "../Shared/Box";
import ErrorMsg from "../Shared/ErrorMsg";
import AddIcon from "../Icons/AddIcon";
import EditIcon from "../Icons/EditIcon";
import DeleteIcon from "../Icons/DeleteIcon";
import SaveIcon from "../Icons/SaveIcon";
import CloseIcon from "../Icons/CloseIcon";
import DeleteAndDiscard from "../Shared/DeleteAndDiscard";
import UserIcon from "../Icons/UserIcon";

const schema = yup.object().shape(departmentSchema);

function Departments(props) {
  const {
    accesstoken,
    adddepartment,
    notify,
    userRoles,
    loggeduseremail,
    admins,
  } = props;
  let config = {
    headers: {
      Authorization: `Bearer ${accesstoken}`,
    },
  };
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  //     {
  //     resolver: yupResolver(schema)
  // }
  const [showSaveDepartment, setShowSaveDepartment] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [allDepartments, setallDepartments] = useState([]);
  const [foundDepartments, setfoundDepartments] = useState([]);
  const [fetchingDepartments, setfetchingDepartments] = useState(false);
  const [departmentId, setdepartmentId] = useState(false);
  const [show, setShow] = useState({});
  const [partialdelete, setPartialdelete] = useState(false);
  const [dep, setDep] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [dupemployees, setDupemployees] = useState([]);
  const [selectedrms, setSelectedrms] = useState([]);
  const [designationId, setdesignationId] = useState(false);
  const [rmfetch, setRmfetch] = useState(false);
  // const [rmanager, setRmanager] = useState(false);
  const [assignedrms, setAssignedrms] = useState([]);
  const [selecteddep, setSelecteddep] = useState(false);
  const [saved, setSaved] = useState(true);

  useEffect(() => {
    try {
      let endpoint = getAbsoluteURL("controllers/department");
      setfetchingDepartments(true);
      axios
        .get(endpoint, config)
        .then((response) => {
          setallDepartments(response.data.data);
          setfoundDepartments(response.data.data);
          setfetchingDepartments(false);
        })
        .catch((_error) => {
          setfetchingDepartments(false);
        });
    } catch (err) {
      setfetchingDepartments(false);
    }
  }, []);

  useEffect(() => {
    console.log("sssss", dep);
    if (dep) {
      try {
        let endpoint = getAbsoluteURL(
          `controllers/employees?departmentId=${dep}&status=${"Active"}&is_reporting_manager=${true}`
        );
        axios
          .get(endpoint, config)
          .then((response) => {
            console.log(
              "in department component",
              endpoint,
              response,
              response.data.data,
              { assignedrms }
            );
            let arr = assignedrms.map((x) => x.work_email);
            let a = response.data.data.filter((x) => {
              return !arr.includes(x.work_email);
            });
            const transformed = a.map(({ id, work_email }) => ({
              value: id,
              label: work_email,
            }));

            setEmployees(transformed);
            setDupemployees(transformed);
          })
          .catch((_error) => {});
      } catch (err) {}
    }
  }, [dep]);

  useEffect(() => {
    let department = departmentId
      ? allDepartments.find((x) => x.id == departmentId)
      : false;

    if (department) {
      for (const property in department) {
        if (property === "status") {
          setValue(property, department[property]);
        }
        if (schema._nodes.includes(property)) {
          setValue(property, department[property]);
        }
      }
    }
  }, [departmentId]);

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = allDepartments.filter((department) => {
        return (
          department.id?.toLowerCase().includes(keyword.toLowerCase()) ||
          department.name?.toLowerCase().includes(keyword.toLowerCase()) ||
          department.code?.toLowerCase().includes(keyword.toLowerCase()) ||
          department.description?.toLowerCase().includes(keyword.toLowerCase())
        );
      });
      setfoundDepartments([...results]);
    } else {
      setfoundDepartments([...allDepartments]);
    }
  };

  const onOpenDepartmentForm = (id = null) => {
    setShowSaveDepartment(true);
    if (id) {
      setdepartmentId(id);
    } else {
      reset();
      setdepartmentId(false);
    }
  };

  const onCloseDepartmentForm = () => {
    setShowSaveDepartment(false);
    setdepartmentId(false);
    reset();
  };

  const handleShow = (type) => {
    if (type == "add_reporting_manager") {
      setRmfetch(true);
    }
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

  const closeDeleteDepartmentModal = () => {
    handleClose("delete_department");
    setdepartmentId(false);
    setPartialdelete(false);
  };
  const closeAddReportingManagerModal = () => {
    handleClose("add_reporting_manager");
    setDep(false);
    setEmployees([]);
    setRmfetch(false);
    setSelecteddep(false);
    // setSelectedrms([]);
  };

  const deleteDepartment = async () => {
    let endpoint = getAbsoluteURL(`controllers/department?id=${departmentId}`);
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
          let acIndex = allDepartments.findIndex((x) => x.id == departmentId);
          let fcIndex = foundDepartments.findIndex((x) => x.id == departmentId);

          if (acIndex > -1) allDepartments.splice(acIndex, 1);
          if (fcIndex > -1) foundDepartments.splice(fcIndex, 1);

          setTimeout(() => {
            setallDepartments([...getUniqueListBy(allDepartments, "id")]);
            setfoundDepartments([...getUniqueListBy(foundDepartments, "id")]);
          }, 100);

          closeDeleteDepartmentModal();
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

  useEffect(() => {
    reset();
    setSubmitting(false);
  }, [adddepartment]);
  const handleReportingManager = async (rmid) => {
    let data = {};
    data["removeManager"] = rmid;
    // console.log("in remove RM", data, departmentId);
    let endpoint = getAbsoluteURL(`controllers/department?id=${departmentId}`);
    axios(
      Object.assign(
        {
          method: "PUT",
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
          if (departmentId) {
            setSelecteddep(response.data.data);
            let adepartmentIndex = allDepartments.findIndex(
              (x) => x.id == departmentId
            );
            allDepartments[adepartmentIndex] = response.data.data;

            let fdepartmentIndex = foundDepartments.findIndex(
              (x) => x.id == departmentId
            );
            foundDepartments[fdepartmentIndex] = response.data.data;
          } else {
            allDepartments.unshift(response.data.data);
            foundDepartments.unshift(response.data.data);
          }
          // setDep(false);
          setTimeout(() => {
            setallDepartments([...getUniqueListBy(allDepartments, "id")]);
            setfoundDepartments([...getUniqueListBy(foundDepartments, "id")]);
            let a = dupemployees.find((x) => x.value == rmid);
            let employeess = employees;
            employeess.push(a);
            setEmployees([...employeess]);
            // setDep(departmentId);
          }, 100);
          // setDep(true);
          // closeAddReportingManagerModal();
        }
      })
      .catch((error) => {
        console.log(error);
        let error_msg = "Something went wrong";
        if (error.response) {
          error_msg = error.response.data.message;
        }
        setSubmitting(false);
        notify({ success: false, message: error_msg });
      });
  };

  const onSubmitHandler = async (data) => {
    try {
      if (rmfetch) {
        for (const property in data) {
          delete data[property];
        }
        if (Object.keys(selectedrms).length == 2) {
          data["rManagers"] = selectedrms;
          setSaved(true);
        }
      } else {
        if (partialdelete) {
          data["status"] = "In Active";
        } else {
          for (const property in data) {
            if (data[property] == "null") data[property] = null;
            if (
              typeof data[property] == "string" &&
              data[property]?.trim() == ""
            )
              data[property] = null;
          }
        }
      }
      let endpoint = getAbsoluteURL("controllers/department");

      if (departmentId) {
        endpoint = `${endpoint}?id=${departmentId}`;
      }
      setSubmitting(true);
      axios(
        Object.assign(
          {
            method: departmentId ? "PUT" : "POST",
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
            if (departmentId) {
              let adepartmentIndex = allDepartments.findIndex(
                (x) => x.id == departmentId
              );
              allDepartments[adepartmentIndex] = response.data.data;

              let fdepartmentIndex = foundDepartments.findIndex(
                (x) => x.id == departmentId
              );
              foundDepartments[fdepartmentIndex] = response.data.data;
            } else {
              allDepartments.unshift(response.data.data);
              foundDepartments.unshift(response.data.data);
            }
            setTimeout(() => {
              setallDepartments([...getUniqueListBy(allDepartments, "id")]);
              setfoundDepartments([...getUniqueListBy(foundDepartments, "id")]);
              setSelectedrms({ ...{} });
            }, 100);

            if (rmfetch) {
              setSelecteddep(response.data.data);
              let a = [];
              a.push(selectedrms.label);
              setTimeout(() => {
                setEmployees(employees.filter((x) => !a.includes(x.label)));
              }, 100);

              setSelectedrms(false);
            } else {
              onCloseDepartmentForm();
              closeDeleteDepartmentModal();
            }
            // setRmfetch(false);
            if (!selecteddep) {
              closeAddReportingManagerModal();
            }
            // onCloseDepartmentForm();
            // closeDeleteDepartmentModal();
          }
          setSubmitting(false);
        })
        .catch((error) => {
          console.log(error);
          let error_msg = "Something went wrong";
          if (error.response) {
            error_msg = error.response.data.message;
          }
          setSubmitting(false);
          notify({ success: false, message: error_msg });
        });
    } catch (err) {}
  };

  const [showGrid, setShowGrid] = useState(false);

  function togglebtn() {
    setShowGrid(!showGrid);
  }

  return (
    <Box>
      <Meta title="EMS - Departments" />
      <Container fluid className="px-0">
        <Row>
          <Col>
            <Box
              className={`table-wrapper xs-none shadow-wrapper settings ${
                !showGrid ? "" : " d-none"
              }`}
            >
              <hr className="mb-0" />
              {ac(userRoles, "View departments", loggeduseremail, admins) ? (
                <Table>
                  <thead
                    className={` ${
                      foundDepartments?.length > 0 ? "" : "d-none"
                    } ${fetchingDepartments ? "d-none" : ""}`}
                  >
                    <tr>
                      <th>#</th>
                      <th>Code</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>
                        <SliderIcon />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {foundDepartments.map((department, index) => (
                      <tr key={index} id={`emp_${department.id}`}>
                        <td>
                          <Badge bg="light" text="dark" className="f-12">
                            {index + 1}
                          </Badge>
                        </td>
                        <td>{department.code ? department.code : "-"}</td>
                        <td>{department.name ? department.name : "-"}</td>
                        <td>
                          <Span
                            className="elipsis-td"
                            title={
                              department.description
                                ? department.description
                                : "-"
                            }
                          >
                            {department.description
                              ? department.description
                              : "-"}
                          </Span>
                        </td>
                        <td style={{ textAlign: "centre" }}>
                          {department.status ? (
                            <Badge
                              bg={
                                department.status == "Active"
                                  ? "success"
                                  : "warning"
                              }
                              className="f-12"
                            >
                              {department.status}
                            </Badge>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td>
                          <Span className="d-flex justify-content-end">
                            {ac(
                              userRoles,
                              "Update departments",
                              loggeduseremail,
                              admins
                            ) && (
                              <Span
                                isClick={() =>
                                  onOpenDepartmentForm(department.id)
                                }
                                className="square_wrapper edit"
                              >
                                <EditIcon />
                              </Span>
                            )}
                            {ac(
                              userRoles,
                              "Delete departments",
                              loggeduseremail,
                              admins
                            ) && (
                              <Span
                                isClick={() => {
                                  setPartialdelete(true);
                                  setdepartmentId(department.id);
                                  handleShow("delete_department");
                                }}
                                className="square_wrapper delete  ms-1"
                              >
                                <DeleteIcon />
                              </Span>
                            )}
                            {ac(
                              userRoles,
                              "Update departments",
                              loggeduseremail,
                              admins
                            ) && (
                              <Span
                                isClick={() => {
                                  handleShow("add_reporting_manager");
                                  setdepartmentId(department.id);
                                  setDep(department.id);
                                  setSelecteddep(department);
                                  setAssignedrms(department?.Rmanager);
                                }}
                                className="square_wrapper add  ms-1"
                              >
                                <UserIcon />
                              </Span>
                            )}
                          </Span>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={8} style={{ textAlign: "center" }}>
                        <Button variant="white" className="save i" onClick={() => onOpenDepartmentForm()}>
                          <AddIcon /> New department{" "}
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              ) : (
                <Row className="justify-content-center">
                  {" "}
                  You don't have access to view departments
                </Row>
              )}
            </Box>
            <Box
              className={`mt-3 responsive-view ${
                !showGrid ? "d-none" : " d-block"
              }`}
            >
              {ac(userRoles, "View departments", loggeduseremail, admins) ? (
                <Box
                  className={`employee_Card_Container row-gap-15 mt-0  position-relative ${
                    foundDepartments?.length > 0 ? "" : "grid-remover-class"
                  } ${fetchingDepartments ? "grid-remover-class" : ""}`}
                >
                  {fetchingDepartments ? (
                    <FetchingWrapper
                      title="Fetching departments..."
                      className="mh-60"
                    />
                  ) : foundDepartments && foundDepartments.length > 0 ? (
                    foundDepartments.map((department, index) => (
                      <Box key={index} className="employee_Card">
                        <Box>
                          <Box className="d-flex align-items-start justify-content-between employee_Card_Header">
                            <Box className="mb-3">
                              <SubTitle
                                title={department.name ? department.name : "-"}
                              />
                            </Box>
                            <Box
                              className="id_And_Status_Container"
                              style={{ top: "15px" }}
                            >
                              <Badge bg="light" text="dark" className="f-12">
                                {foundDepartments.length - index}
                              </Badge>
                              <Badge bg="secondary" className=" f-12">
                                {department.code ? department.code : "-"}
                              </Badge>
                            </Box>
                          </Box>
                          <Box className="description-area mt-2">
                            <p className="secondary-text-label">
                              Description :{" "}
                            </p>
                            <p
                              className="secondary-text-label dark-text desc-scroll"
                              title={department.description}
                            >
                              {department.description
                                ? department.description
                                : "-"}
                            </p>
                          </Box>
                          {department.status ? (
                            <Badge
                              bg={
                                department.status == "Active"
                                  ? "success"
                                  : "warning"
                              }
                              className="f-12"
                            >
                              {department.status}
                            </Badge>
                          ) : (
                            "-"
                          )}
                        </Box>
                        <Box>
                          <hr className="mb-2 mt-3" />
                          <Box className="d-flex justify-content-end pt-2 align-items-center">
                            {ac(
                              userRoles,
                              "Update departments",
                              loggeduseremail,
                              admins
                            ) && (
                              <Span
                                isClick={() =>
                                  onOpenDepartmentForm(department.id)
                                }
                                className="square_wrapper edit br-50"
                              >
                                <EditIcon />
                              </Span>
                            )}
                            {ac(
                              userRoles,
                              "Delete departments",
                              loggeduseremail,
                              admins
                            ) && (
                              <Span
                                isClick={() => {
                                  setPartialdelete(true);
                                  setdepartmentId(department.id);
                                  handleShow("delete_department");
                                }}
                                className="square_wrapper delete  ms-1 br-50"
                              >
                                <DeleteIcon />
                              </Span>
                            )}
                            {ac(
                              userRoles,
                              "Update departments",
                              loggeduseremail,
                              admins
                            ) && (
                              <Span
                                isClick={() => {
                                  handleShow("add_reporting_manager");
                                  setdepartmentId(department.id);
                                  setDep(department.id);
                                  setSelecteddep(department);
                                  setAssignedrms(department?.Rmanager);
                                }}
                                className="square_wrapper add  ms-1"
                              >
                                <UserIcon />
                              </Span>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <NoResultsWrapper
                      title="No Departments found!"
                      subtitle="Click  new  button to add certifications"
                    />
                  )}
                </Box>
              ) : (
                <Row className="justify-content-center">
                  {" "}
                  You don't have access to view departments
                </Row>
              )}
            </Box>
          </Col>
        </Row>
      </Container>

      {/* Add Department */}
      <EmsModal className={`${showSaveDepartment ? "show fade" : ""}`}>
        <EmsModalHeader>
          <Stack direction="horizontal" className="align-items-center">
            <SubTitle title="Departments" />
          </Stack>
          <EmsModalClose isClose={onCloseDepartmentForm} />
        </EmsModalHeader>
        <EmsModalBody className="p-sm-3 py-3">
          <Container>
            <Form onSubmit={handleSubmit(onSubmitHandler)} className="ems-form">
              <Row>
                <Col md={12} className="form-grid mt-2">
                  <Form.Group>
                    <Form.Label>
                      Department code <Span className="required">*</Span>
                    </Form.Label>
                    <Form.Control
                      placeholder=""
                      {...register("code")}
                      onChange={(e) => {
                        setValue("code", e.target.value?.toUpperCase());
                      }}
                    />
                    <ErrorMsg errorMessage={errors.code?.message} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      Department name <Span className="required">*</Span>
                    </Form.Label>
                    <Form.Control placeholder="" {...register("name")} />
                    <ErrorMsg errorMessage={errors.name?.message} />
                  </Form.Group>
                  {/* <Form.Group className="position-relative">
                                        <Form.Label>Status</Form.Label>
                                        <Form.Select
                                            {...register("status")}
                                            onChange={(e) => {
                                                setValue("status", e.target.value)
                                            }}
                                            className="form-control select"
                                        >
                                            <option value="Active">Active</option>
                                            <option value="In Active">Inactive</option>
                                        </Form.Select>
                                        <ErrorMsg errorMessage={errors.status?.message} />
                                    </Form.Group> */}
                </Col>
                <Col md={12} className="mt-2">
                  <Form.Group>
                    <Form.Label>Description </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      {...register("description")}
                      placeholder=""
                    />
                    <ErrorMsg errorMessage={errors.description?.message} />
                  </Form.Group>
                </Col>
              </Row>
              <Stack
                direction="horizontal"
                className="pt-3 justify-content-end"
              >
                <Button
                  variant="save"
                  type="submit"
                  disabled={submitting}
                  className="save"
                >
                  <SaveIcon className="me-2" />{" "}
                  {submitting ? "Saving..." : "Save"}
                </Button>{" "}
                <Button variant="outlineDark" onClick={onCloseDepartmentForm}>
                  <CloseIcon className="me-2" /> Discard
                </Button>{" "}
              </Stack>
            </Form>
          </Container>
        </EmsModalBody>
      </EmsModal>
      {/* End */}

      {/* Delete departments */}
      <Modal
        show={show.delete_department}
        onHide={closeDeleteDepartmentModal}
        backdrop="static"
        animation={true}
        fullscreen={true}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Inactive Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <b>
              Are you sure want to make the selected department Inactive?
              <br />
              note : associated designations will change to inactive.
            </b>
            {/* <DeleteAndDiscard
                            isSubmitting={submitting}
                            //onDelete={deleteDepartment}
                            onDelete={handleSubmit(onSubmitHandler)}
                            onClose={closeDeleteDepartmentModal}
                        /> */}
            <Stack direction="horizontal" className="pt-3 justify-content-end">
              <Button
                variant="save"
                onClick={handleSubmit(onSubmitHandler)}
                className="save"
              >
                {submitting ? "Inactivating..." : "Inactive"}
              </Button>{" "}
              <Button
                variant="outlineDark"
                onClick={closeDeleteDepartmentModal}
              >
                <CloseIcon className="me-2" /> Discard
              </Button>{" "}
            </Stack>
          </Container>
        </Modal.Body>
      </Modal>
      {/* End */}

      {/* Add Reporting Manager */}
      <Modal
        show={show.add_reporting_manager}
        onHide={closeAddReportingManagerModal}
        backdrop="static"
        animation={true}
        fullscreen={true}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reporting Managers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={handleSubmit(onSubmitHandler)} className="ems-form">
              <Row>
                <Col md={12} className="form-grid mt-2">
                  <Form.Group className="position-relative">
                    <Form.Label>Select Reporting Managers</Form.Label>
                    <Select
                      // menuPlacement="auto"
                      closeMenuOnSelect={true}
                      // isMulti
                      value={selectedrms}
                      onChange={(selectedOption) => {
                        setSelectedrms(selectedOption);
                        setSaved(false);
                      }}
                      options={employees}
                      noOptionsMessage={() =>
                        "No Employees found for this department!"
                      }
                    />
                    {/* )} */}
                  </Form.Group>
                </Col>
              </Row>
              <Stack
                direction="horizontal"
                className="pt-3 justify-content-end"
              >
                <Button
                  variant="save"
                  type="submit"
                  disabled={submitting || saved}
                  className="save"
                >
                  <SaveIcon className="me-2" />{" "}
                  {submitting ? "Saving..." : "Save"}
                </Button>{" "}
                <Button
                  variant="outlineDark"
                  onClick={closeAddReportingManagerModal}
                >
                  <CloseIcon className="me-2" /> Discard
                </Button>{" "}
              </Stack>
            </Form>
          </Container>
          {/* <Container> */}
          <Box
            className={`table-wrapper xs-none shadow-wrapper settings ${
              !showGrid ? "" : " d-none"
            }`}
          >
            {selecteddep?.Rmanager?.length > 0 ? (
              <Table>
                <thead
                  className={` ${
                    foundDepartments?.length > 0 ? "" : "d-none"
                  } ${fetchingDepartments ? "d-none" : ""}`}
                >
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>
                      <SliderIcon />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {foundDepartments && foundDepartments.length > 0 ? (
                    foundDepartments.map(
                      (department, index) =>
                        department.id == dep &&
                        department.Rmanager?.map((rm, index) => (
                          <tr key={index} id={`rm_${rm.id}`}>
                            <td>{rm.employee_id}</td>
                            <td>{rm.first_name ? rm.first_name : "-"}</td>
                            <td>{rm.work_email ? rm.work_email : "-"}</td>

                            <td>
                              <Span>
                                {ac(
                                  userRoles,
                                  "Delete departments",
                                  loggeduseremail,
                                  admins
                                ) && (
                                  <Button
                                    variant="delete"
                                    onClick={(e) => {
                                      handleReportingManager(rm.id);
                                    }}
                                    className="delete"
                                  >
                                    Remove
                                  </Button>
                                )}
                              </Span>
                            </td>
                          </tr>
                        ))
                    )
                  ) : (
                    <NoResultsWrapper
                      title="No reporting managers found!"
                      subtitle="Click  new  button to add certifications"
                    />
                  )}
                </tbody>
              </Table>
            ) : (
              <NoResultsWrapper
                title="No reporting managers found!"
                subtitle="Add reporting managers "
              />
            )}
          </Box>
          {/* </Container> */}
        </Modal.Body>
      </Modal>
      {/* End */}
    </Box>
  );
  //   return (
  //     <Box className="p-3">
  //       <Meta title="EMS - Departments" />
  //       <Container fluid className="px-0">
  //         <Row>
  //           <Col>
  //             <Box className="d-flex justify-content-between align-items-center">
  //               <Form size="large" className="search-form-wrapper">
  //                 <Form.Group
  //                   className="mb-0 position-relative search-form"
  //                   controlId="formBasicEmail"
  //                 >
  //                   <Form.Control
  //                     placeholder="Search"
  //                     type="search"
  //                     className="input"
  //                     onChange={filter}
  //                   />
  //                   <SearchIcon className="search-icon" />
  //                 </Form.Group>
  //               </Form>
  //               <Span>
  //                 <SubTitle title="Departments" />
  //               </Span>
  //               <Span className="d-flex Zy49_xyt">
  //                 <Button
  //                   variant="white"
  //                   className="px-2 svg d-r-none"
  //                   style={{ lineHeight: "1" }}
  //                   onClick={togglebtn}
  //                 >
  //                   <Span className={` ${!showGrid ? "" : " d-none"}`}>
  //                     <GridViewIcon />
  //                   </Span>
  //                   <Span className={` list-view ${!showGrid ? "" : " d-block"}`}>
  //                     <ListViewIcon />
  //                   </Span>
  //                 </Button>
  //                 {ac(
  //                   userRoles,
  //                   "Create departments",
  //                   loggeduseremail,
  //                   admins
  //                 ) && (
  //                   <Button
  //                     variant="white"
  //                     onClick={() => onOpenDepartmentForm()}
  //                     className="ms-0 border-0"
  //                   >
  //                     <AddIcon />
  //                   </Button>
  //                 )}
  //               </Span>
  //             </Box>
  //           </Col>
  //         </Row>
  //         <Row>
  //           <Col>
  //             <Box
  //               className={`table-wrapper xs-none shadow-wrapper settings ${
  //                 !showGrid ? "" : " d-none"
  //               }`}
  //             >
  //               <hr className="mb-0" />
  //               {ac(userRoles, "View departments", loggeduseremail, admins) ? (
  //                 <Table>
  //                   <thead
  //                     className={` ${
  //                       foundDepartments?.length > 0 ? "" : "d-none"
  //                     } ${fetchingDepartments ? "d-none" : ""}`}
  //                   >
  //                     <tr>
  //                       <th>#</th>
  //                       <th>Code</th>
  //                       <th>Name</th>
  //                       <th>Description</th>
  //                       <th>Status</th>
  //                       <th>
  //                         <SliderIcon />
  //                       </th>
  //                     </tr>
  //                   </thead>
  //                   <tbody>
  //                     {fetchingDepartments ? (
  //                       <FetchingWrapper
  //                         title="Fetching departments..."
  //                         className="mh-60"
  //                       />
  //                     ) : foundDepartments && foundDepartments.length > 0 ? (
  //                       foundDepartments.map((department, index) => (
  //                         <tr key={index} id={`emp_${department.id}`}>
  //                           <td>
  //                             <Badge bg="light" text="dark" className="f-12">
  //                               {index + 1}
  //                             </Badge>
  //                           </td>
  //                           <td>{department.code ? department.code : "-"}</td>
  //                           <td>{department.name ? department.name : "-"}</td>
  //                           <td>
  //                             <Span
  //                               className="elipsis-td"
  //                               title={
  //                                 department.description
  //                                   ? department.description
  //                                   : "-"
  //                               }
  //                             >
  //                               {department.description
  //                                 ? department.description
  //                                 : "-"}
  //                             </Span>
  //                           </td>
  //                           <td style={{ textAlign: "centre" }}>
  //                             {department.status ? (
  //                               <Badge
  //                                 bg={
  //                                   department.status == "Active"
  //                                     ? "success"
  //                                     : "warning"
  //                                 }
  //                                 className="f-12"
  //                               >
  //                                 {department.status}
  //                               </Badge>
  //                             ) : (
  //                               "-"
  //                             )}
  //                           </td>
  //                           <td>
  //                             <Span className="d-flex justify-content-end">
  //                               {ac(
  //                                 userRoles,
  //                                 "Update departments",
  //                                 loggeduseremail,
  //                                 admins
  //                               ) && (
  //                                 <Span
  //                                   isClick={() =>
  //                                     onOpenDepartmentForm(department.id)
  //                                   }
  //                                   className="square_wrapper edit"
  //                                 >
  //                                   <EditIcon />
  //                                 </Span>
  //                               )}
  //                               {ac(
  //                                 userRoles,
  //                                 "Delete departments",
  //                                 loggeduseremail,
  //                                 admins
  //                               ) && (
  //                                 <Span
  //                                   isClick={() => {
  //                                     setPartialdelete(true);
  //                                     setdepartmentId(department.id);
  //                                     handleShow("delete_department");
  //                                   }}
  //                                   className="square_wrapper delete  ms-1"
  //                                 >
  //                                   <DeleteIcon />
  //                                 </Span>
  //                               )}
  //                               {ac(
  //                                 userRoles,
  //                                 "Update departments",
  //                                 loggeduseremail,
  //                                 admins
  //                               ) && (
  //                                 <Span
  //                                   isClick={() => {
  //                                     handleShow("add_reporting_manager");
  //                                     setdepartmentId(department.id);
  //                                     setDep(department.id);
  //                                     setAssignedrms(department?.Rmanager);
  //                                   }}
  //                                   className="square_wrapper add  ms-1"
  //                                 >
  //                                   <UserIcon />
  //                                 </Span>
  //                               )}
  //                             </Span>
  //                           </td>
  //                         </tr>
  //                       ))
  //                     ) : (
  //                       <NoResultsWrapper
  //                         title="No Departments found!"
  //                         subtitle="Click  new  button to add departments"
  //                       />
  //                     )}
  //                   </tbody>
  //                 </Table>
  //               ) : (
  //                 <Row className="justify-content-center">
  //                   {" "}
  //                   You don't have access to view departments
  //                 </Row>
  //               )}
  //             </Box>
  //             <Box
  //               className={`mt-3 responsive-view ${
  //                 !showGrid ? "d-none" : " d-block"
  //               }`}
  //             >
  //               {ac(userRoles, "View departments", loggeduseremail, admins) ? (
  //                 <Box
  //                   className={`employee_Card_Container row-gap-15 mt-0  position-relative ${
  //                     foundDepartments?.length > 0 ? "" : "grid-remover-class"
  //                   } ${fetchingDepartments ? "grid-remover-class" : ""}`}
  //                 >
  //                   {fetchingDepartments ? (
  //                     <FetchingWrapper
  //                       title="Fetching departments..."
  //                       className="mh-60"
  //                     />
  //                   ) : foundDepartments && foundDepartments.length > 0 ? (
  //                     foundDepartments.map((department, index) => (
  //                       <Box key={index} className="employee_Card">
  //                         <Box>
  //                           <Box className="d-flex align-items-start justify-content-between employee_Card_Header">
  //                             <Box className="mb-3">
  //                               <SubTitle
  //                                 title={department.name ? department.name : "-"}
  //                               />
  //                             </Box>
  //                             <Box
  //                               className="id_And_Status_Container"
  //                               style={{ top: "15px" }}
  //                             >
  //                               <Badge bg="light" text="dark" className="f-12">
  //                                 {foundDepartments.length - index}
  //                               </Badge>
  //                               <Badge bg="secondary" className=" f-12">
  //                                 {department.code ? department.code : "-"}
  //                               </Badge>
  //                             </Box>
  //                           </Box>
  //                           <Box className="description-area mt-2">
  //                             <p className="secondary-text-label">
  //                               Description :{" "}
  //                             </p>
  //                             <p
  //                               className="secondary-text-label dark-text desc-scroll"
  //                               title={department.description}
  //                             >
  //                               {department.description
  //                                 ? department.description
  //                                 : "-"}
  //                             </p>
  //                           </Box>
  //                           {department.status ? (
  //                             <Badge
  //                               bg={
  //                                 department.status == "Active"
  //                                   ? "success"
  //                                   : "warning"
  //                               }
  //                               className="f-12"
  //                             >
  //                               {department.status}
  //                             </Badge>
  //                           ) : (
  //                             "-"
  //                           )}
  //                         </Box>
  //                         <Box>
  //                           <hr className="mb-2 mt-3" />
  //                           <Box className="d-flex justify-content-end pt-2 align-items-center">
  //                             {ac(
  //                               userRoles,
  //                               "Update departments",
  //                               loggeduseremail,
  //                               admins
  //                             ) && (
  //                               <Span
  //                                 isClick={() =>
  //                                   onOpenDepartmentForm(department.id)
  //                                 }
  //                                 className="square_wrapper edit br-50"
  //                               >
  //                                 <EditIcon />
  //                               </Span>
  //                             )}
  //                             {ac(
  //                               userRoles,
  //                               "Delete departments",
  //                               loggeduseremail,
  //                               admins
  //                             ) && (
  //                               <Span
  //                                 isClick={() => {
  //                                   setPartialdelete(true);
  //                                   setdepartmentId(department.id);
  //                                   handleShow("delete_department");
  //                                 }}
  //                                 className="square_wrapper delete  ms-1 br-50"
  //                               >
  //                                 <DeleteIcon />
  //                               </Span>
  //                             )}
  //                             {ac(
  //                               userRoles,
  //                               "Update departments",
  //                               loggeduseremail,
  //                               admins
  //                             ) && (
  //                               <Span
  //                                 isClick={() => {
  //                                   handleShow("add_reporting_manager");
  //                                   setdepartmentId(department.id);
  //                                   setDep(department.id);
  //                                   setAssignedrms(department?.Rmanager);
  //                                 }}
  //                                 className="square_wrapper add  ms-1"
  //                               >
  //                                 <UserIcon />
  //                               </Span>
  //                             )}
  //                           </Box>
  //                         </Box>
  //                       </Box>
  //                     ))
  //                   ) : (
  //                     <NoResultsWrapper
  //                       title="No Departments found!"
  //                       subtitle="Click  new  button to add certifications"
  //                     />
  //                   )}
  //                 </Box>
  //               ) : (
  //                 <Row className="justify-content-center">
  //                   {" "}
  //                   You don't have access to view departments
  //                 </Row>
  //               )}
  //             </Box>
  //           </Col>
  //         </Row>
  //       </Container>

  //       {/* Add Department */}
  //       <EmsModal className={`${showSaveDepartment ? "show fade" : ""}`}>
  //         <EmsModalHeader>
  //           <Stack direction="horizontal" className="align-items-center">
  //             <SubTitle title="Departments" />
  //           </Stack>
  //           <EmsModalClose isClose={onCloseDepartmentForm} />
  //         </EmsModalHeader>
  //         <EmsModalBody className="p-sm-3 py-3">
  //           <Container>
  //             <Form onSubmit={handleSubmit(onSubmitHandler)} className="ems-form">
  //               <Row>
  //                 <Col md={12} className="form-grid mt-2">
  //                   <Form.Group>
  //                     <Form.Label>
  //                       Code <Span className="required">*</Span>
  //                     </Form.Label>
  //                     <Form.Control
  //                       placeholder=""
  //                       {...register("code")}
  //                       onChange={(e) => {
  //                         setValue("code", e.target.value?.toUpperCase());
  //                       }}
  //                     />
  //                     <ErrorMsg errorMessage={errors.code?.message} />
  //                   </Form.Group>
  //                   <Form.Group>
  //                     <Form.Label>
  //                       Name <Span className="required">*</Span>
  //                     </Form.Label>
  //                     <Form.Control placeholder="" {...register("name")} />
  //                     <ErrorMsg errorMessage={errors.name?.message} />
  //                   </Form.Group>
  //                   {/* <Form.Group className="position-relative">
  //                                         <Form.Label>Status</Form.Label>
  //                                         <Form.Select
  //                                             {...register("status")}
  //                                             onChange={(e) => {
  //                                                 setValue("status", e.target.value)
  //                                             }}
  //                                             className="form-control select"
  //                                         >
  //                                             <option value="Active">Active</option>
  //                                             <option value="In Active">Inactive</option>
  //                                         </Form.Select>
  //                                         <ErrorMsg errorMessage={errors.status?.message} />
  //                                     </Form.Group> */}
  //                 </Col>
  //                 <Col md={12} className="mt-2">
  //                   <Form.Group>
  //                     <Form.Label>Description </Form.Label>
  //                     <Form.Control
  //                       as="textarea"
  //                       rows={5}
  //                       {...register("description")}
  //                       placeholder=""
  //                     />
  //                     <ErrorMsg errorMessage={errors.description?.message} />
  //                   </Form.Group>
  //                 </Col>
  //               </Row>
  //               <Stack
  //                 direction="horizontal"
  //                 className="pt-3 justify-content-end"
  //               >
  //                 <Button
  //                   variant="save"
  //                   type="submit"
  //                   disabled={submitting}
  //                   className="save"
  //                 >
  //                   <SaveIcon className="me-2" />{" "}
  //                   {submitting ? "Saving..." : "Save"}
  //                 </Button>{" "}
  //                 <Button variant="outlineDark" onClick={onCloseDepartmentForm}>
  //                   <CloseIcon className="me-2" /> Discard
  //                 </Button>{" "}
  //               </Stack>
  //             </Form>
  //           </Container>
  //         </EmsModalBody>
  //       </EmsModal>
  //       {/* End */}

  //       {/* Delete departments */}
  //       <Modal
  //         show={show.delete_department}
  //         onHide={closeDeleteDepartmentModal}
  //         backdrop="static"
  //         animation={true}
  //         fullscreen={true}
  //         keyboard={false}
  //       >
  //         <Modal.Header closeButton>
  //           <Modal.Title>Inactive Department</Modal.Title>
  //         </Modal.Header>
  //         <Modal.Body>
  //           <Container>
  //             <b>
  //               Are you sure want to make the selected department Inactive?
  //               <br />
  //               note : associated designations will change to inactive.
  //             </b>
  //             {/* <DeleteAndDiscard
  //                             isSubmitting={submitting}
  //                             //onDelete={deleteDepartment}
  //                             onDelete={handleSubmit(onSubmitHandler)}
  //                             onClose={closeDeleteDepartmentModal}
  //                         /> */}
  //             <Stack direction="horizontal" className="pt-3 justify-content-end">
  //               <Button
  //                 variant="save"
  //                 onClick={handleSubmit(onSubmitHandler)}
  //                 className="save"
  //               >
  //                 {submitting ? "Inactivating..." : "Inactive"}
  //               </Button>{" "}
  //               <Button
  //                 variant="outlineDark"
  //                 onClick={closeDeleteDepartmentModal}
  //               >
  //                 <CloseIcon className="me-2" /> Discard
  //               </Button>{" "}
  //             </Stack>
  //           </Container>
  //         </Modal.Body>
  //       </Modal>
  //       {/* End */}

  //       {/* Add Reporting Manager */}
  //       <Modal
  //         show={show.add_reporting_manager}
  //         onHide={closeAddReportingManagerModal}
  //         backdrop="static"
  //         animation={true}
  //         fullscreen={true}
  //         keyboard={false}
  //       >
  //         <Modal.Header closeButton>
  //           <Modal.Title>Reporting Managers</Modal.Title>
  //         </Modal.Header>
  //         <Modal.Body>
  //           <Container>
  //             <Form onSubmit={handleSubmit(onSubmitHandler)} className="ems-form">
  //               <Row>
  //                 <Col md={12} className="form-grid mt-2">
  //                   <Form.Group className="position-relative">
  //                     <Form.Label>Select Reporting Managers</Form.Label>
  //                     <Select
  //                       menuPlacement="auto"
  //                       closeMenuOnSelect={true}
  //                       // isMulti
  //                       // value={selectedrms}
  //                       onChange={setSelectedrms}
  //                       options={employees}
  //                       noOptionsMessage={() =>
  //                         "No Employees found for this department!"
  //                       }
  //                     />
  //                     {/* )} */}
  //                   </Form.Group>
  //                 </Col>
  //               </Row>
  //               <Stack
  //                 direction="horizontal"
  //                 className="pt-3 justify-content-end"
  //               >
  //                 <Button
  //                   variant="save"
  //                   type="submit"
  //                   disabled={submitting}
  //                   className="save"
  //                 >
  //                   <SaveIcon className="me-2" />{" "}
  //                   {submitting ? "Saving..." : "Save"}
  //                 </Button>{" "}
  //                 <Button
  //                   variant="outlineDark"
  //                   onClick={closeAddReportingManagerModal}
  //                 >
  //                   <CloseIcon className="me-2" /> Discard
  //                 </Button>{" "}
  //               </Stack>
  //             </Form>
  //           </Container>
  //           {/* <Container> */}
  //           <Box
  //             className={`table-wrapper xs-none shadow-wrapper settings ${
  //               !showGrid ? "" : " d-none"
  //             }`}
  //           >
  //             <Table>
  //               <thead
  //                 className={` ${foundDepartments?.length > 0 ? "" : "d-none"} ${
  //                   fetchingDepartments ? "d-none" : ""
  //                 }`}
  //               >
  //                 <tr>
  //                   <th>Id</th>
  //                   <th>Name</th>
  //                   <th>Email</th>
  //                   <th>
  //                     <SliderIcon />
  //                   </th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 {foundDepartments && foundDepartments.length > 0 ? (
  //                   foundDepartments.map(
  //                     (department, index) =>
  //                       department.id == dep &&
  //                       department.Rmanager?.map((rm, index) => (
  //                         <tr key={index} id={`rm_${rm.id}`}>
  //                           <td>{rm.employee_id}</td>
  //                           <td>{rm.first_name ? rm.first_name : "-"}</td>
  //                           <td>{rm.work_email ? rm.work_email : "-"}</td>

  //                           <td>
  //                             <Span>
  //                               {ac(
  //                                 userRoles,
  //                                 "Delete departments",
  //                                 loggeduseremail,
  //                                 admins
  //                               ) && (
  //                                 <Button
  //                                   variant="delete"
  //                                   onClick={(e) => {
  //                                     handleReportingManager(rm.id);
  //                                   }}
  //                                   className="delete"
  //                                 >
  //                                   Remove
  //                                 </Button>
  //                               )}
  //                             </Span>
  //                           </td>
  //                         </tr>
  //                       ))
  //                   )
  //                 ) : (
  //                   <NoResultsWrapper
  //                     title="No reprting managers found!"
  //                     subtitle="Click  new  button to add certifications"
  //                   />
  //                 )}
  //               </tbody>
  //             </Table>
  //           </Box>
  //           {/* </Container> */}
  //         </Modal.Body>
  //       </Modal>
  //       {/* End */}
  //     </Box>
  //   );
}

export default Departments;
