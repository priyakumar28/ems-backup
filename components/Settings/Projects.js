import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import getAbsoluteURL from "../../utils/getAbsoluteURL";
import axios from "axios";
import { projectSchema } from "../../lib/yupHelpers";
import {
  getUniqueListBy,
  isValidDate,
  projectsStatusColors,
  changeDateFormat,
  PROJECT_STATUS,
  ac
} from "../../lib/helpers";
import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Stack,
  Table,
} from "react-bootstrap";
import ReactDataTable from "../Shared/ReactDataTable";
import AddIcon from "../Icons/AddIcon";
import UpArrow from "../Icons/UpArrow";
import DeleteIcon from "../Icons/DeleteIcon";
import GridViewIcon from "../Icons/GridViewIcon";
import ListViewIcon from "../Icons/ListViewIcon";
import SearchIcon from "../Icons/SearchIcon";
import SliderIcon from "../Icons/SliderIcon";
import Meta from "../Meta";
import Box from "../Shared/Box";
import Span from "../Shared/Span";
import SubTitle from "../Shared/SubTitle";
import NoResultsWrapper from "../Shared/NoResultsWrapper";
import EmsModal from "../Shared/EmsModal";
import EmsModalHeader from "../Shared/EmsModalHeader";
import EmsModalClose from "../Shared/EmsModalClose";
import EmsModalBody from "../Shared/EmsModalBody";
import EditIcon from "../Icons/EditIcon";
import UserIcon from "../Icons/UserIcon";
import Divider from "../Shared/Divider";
import DatePicker from "react-datepicker";
import DeleteAndDiscard from "../Shared/DeleteAndDiscard";
import FetchingWrapper from "../Shared/FetchingWrapper";
import DataSetContainer from "../Shared/DataSetContainer";
import ErrorMsg from "../Shared/ErrorMsg";
import EmployeeProject from "./EmployeeProjects";
const schema = yup.object().shape(projectSchema);
function Projects(props) {
  const { accesstoken, addprojects, notify, userRoles, loggeduseremail, admins } =
    props;
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
  React.useEffect(() => {
    const subscription = watch();
    return () => subscription.unsubscribe();
  }, [watch]);
  const [showSaveprojects, setShowSaveprojects] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fetchingprojects, setfetchingprojects] = useState([]);
  const [allprojects, setallprojects] = useState([]);
  const [foundprojects, setfoundprojects] = useState([]);
  const [clients, setclients] = useState([]);
  const [show, setShow] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [projectsId, setProjectsId] = useState(false);
  const [selectedProject, setSelectedProject] = useState(false);
  const [pshow, setPshow] = useState(false);
  const handlePclose = () => setPshow(false);
  const handlePshow = () => setPshow(true);
  const [exportEP, setexportEP] = useState(false);
  useEffect(() => {
    try {
      let endpoint = getAbsoluteURL("controllers/employees");
      axios.get(endpoint, config).then((response) => {
        setEmployees(response.data.data);
      });
    } catch (err) { }
  }, []);
  useEffect(() => {
    try {
      let endpoint = getAbsoluteURL("controllers/clients");
      axios
        .get(endpoint, config)
        .then((response) => {
          setclients(response.data.data);
        })
        .catch((err) => {
          setclients([]);
        });
    } catch (err) {
      setclients([]);
    }
  }, []);
  useEffect(() => {
    try {
      let endpoint = getAbsoluteURL("controllers/projects");
      setfetchingprojects(true);
      axios
        .get(endpoint, config)
        .then((response) => {
          setallprojects(response.data.data);
          setfoundprojects(response.data.data);
          setfetchingprojects(false);
        })
        .catch((err) => {
          setfetchingprojects(false);
        });
    } catch (err) {
      setfetchingprojects(false);
    }
  }, []);
  const filter = (e) => {
    const keyword = e.target.value;
    if (keyword !== "") {
      const results = allprojects.filter((project) => {
        return (
          project.name?.toLowerCase().includes(keyword.toLowerCase()) ||
          project.id?.toLowerCase().includes(keyword.toLowerCase()) ||
          project.client?.name?.toLowerCase().includes(keyword.toLowerCase()) ||
          project.details?.toLowerCase().includes(keyword.toLowerCase()) ||
          changeDateFormat(project.created)
            .toLowerCase()
            .includes(keyword.toLowerCase()) ||
          changeDateFormat(project.start_date)
            .toLowerCase()
            .includes(keyword.toLowerCase()) ||
          changeDateFormat(project.end_date)
            .toLowerCase()
            .includes(keyword.toLowerCase()) ||
          project.status?.toLowerCase().includes(keyword.toLowerCase())
        );
      });
      setfoundprojects([...results]);
    } else {
      setfoundprojects([...allprojects]);
    }
  };
  useEffect(() => {
    let project = projectsId
      ? allprojects.find((x) => x.id == projectsId)
      : false;
    setSelectedProject(project);
    if (project) {
      let assocs = ["clients"];
      for (const property in project) {
        if (schema._nodes.includes(property) && assocs.includes(property)) {
          setValue(property, project[property]?.id);
        } else if (schema._nodes.includes(property)) {
          setValue(property, project[property]);
        }
      }
    }
  }, [projectsId]);
  const onOpenprojectsForm = (id = null) => {
    setShowSaveprojects(true);
    if (id) {
      setProjectsId(id);
    } else {
      reset();
    }
  };
  const onCloseprojectsForm = () => {
    setShowSaveprojects(false);
    setProjectsId(false);
    reset();
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
  const closeDeleteprojectsModal = () => {
    handleClose("delete_projects");
    setSelectedProject(false);
    setProjectsId(false);
  };
  const deleteprojects = async () => {
    let endpoint = getAbsoluteURL(`controllers/projects?id=${projectsId}`);
    setSubmitting(true);
    axios(
      Object.assign(
        {
          method: "PUT",
          url: endpoint,
          data: { status: "Dropped" },
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
          setShowSaveprojects(false);
          if (projectsId) {
            let aprojectsIndex = allprojects.findIndex(
              (x) => x.id == projectsId
            );
            allprojects[aprojectsIndex] = response.data.data;
            let fprojectsIndex = foundprojects.findIndex(
              (x) => x.id == projectsId
            );
            foundprojects[fprojectsIndex] = response.data.data;
          }
          setTimeout(() => {
            setallprojects([...getUniqueListBy(allprojects, "id")]);
            setfoundprojects([...getUniqueListBy(foundprojects, "id")]);
          }, 100);
          setProjectsId(false);
          setShow(false);
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
  }, [addprojects]);
  const onSubmitHandler = async (dataa) => {
    for (const property in dataa) {
      if (dataa[property] == "null") dataa[property] = null;
      if (typeof dataa[property] == "string" && dataa[property]?.trim() == "")
        dataa[property] = null;
    }
    let endpoint = getAbsoluteURL("controllers/projects");
    if (projectsId) {
      endpoint = `${endpoint}?id=${projectsId}`;
    }
    // post data in axios
    setSubmitting(true);
    axios(
      Object.assign(
        {
          method: projectsId ? "PUT" : "POST",
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
          setShowSaveprojects(false);
          if (projectsId) {
            let aprojectsIndex = allprojects.findIndex(
              (x) => x.id == projectsId
            );
            allprojects[aprojectsIndex] = response.data.data;
            let fprojectsIndex = foundprojects.findIndex(
              (x) => x.id == projectsId
            );
            foundprojects[fprojectsIndex] = response.data.data;
          } else {
            allprojects.unshift(response.data.data);
            foundprojects.unshift(response.data.data);
          }
          setTimeout(() => {
            setallprojects([...getUniqueListBy(allprojects, "id")]);
            setfoundprojects([...getUniqueListBy(foundprojects, "id")]);
          }, 100);
          setProjectsId(false);
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
  const [showGrid, setShowGrid] = useState(false);
  function togglebtn() {
    setShowGrid(!showGrid);
  }
  //export projects
  const [Eshow, setEshow] = useState({});
  const [selectedprojclnt, setSelectedprojclnt] = useState(false);
  const handleEshow = (type) => {
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
  const [selectedExpProStatus, setselectedExpProStatus] = useState({
    column: "",
    value: "all",
  });
  const [columns] = useState([
    { data: "id", title: "Project ID" },
    { data: "name", title: "Project Name" },
    { data: "details", title: "Details", visible: false },
    { data: "client.name", title: "Client" },
    { data: "created", title: "Created", visible: false },
    { data: "start_date", title: "Start_date" },
    { data: "end_date", title: "End_date" },
    { data: "status", title: "Status" },
  ]);
  const [data, setData] = useState([]);
  const exportProjects = async () => {
    try {
      const { column, value } = selectedExpProStatus;
      let endpoint = getAbsoluteURL(
        `controllers/projects/exportProjects?column=${column}&value=${value}`
      );
      setSubmitting(true); //set state
      axios({
        url: endpoint,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      })
        .then((response) => {
          notify({ success: response.data.code === 200, message: response.data.message });
          if (response.data.code === 200 && response?.data?.data?.length > 0) {
            setData([...response.data.data]);
          } else {
            setData([]);
            notify({ success: false, message: "Project list is empty" });
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
      notify({ success: false, message: "Error in fetching projects list" });
    }
  };
  const [openExportEmp, setOpenExportEmp] = useState(false);
  return (
    <Box className="p-">
      <Meta title="TSMS - Projects" />
      <Container fluid className="px-3">
        <Row>
          <Col>
            <Box className="d-flex justify-content-between align-items-center">
              <Form size="large" className="search-form-wrapper">
                <Form.Group
                  className="mb-0 position-relative search-form"
                  controlId="formBasicEmail"
                >
                  <Form.Control
                    placeholder="Search"
                    type="search"
                    className="input"
                    onChange={filter}
                  />
                  <SearchIcon className="search-icon" />
                </Form.Group>
              </Form>
              <Span>
                <SubTitle title="Projects" />
              </Span>
              <Span className="d-flex Zy49_xyt">
                <Button
                  variant="white"
                  className="px-2 svg d-r-none"
                  style={{ lineHeight: "1" }}
                  onClick={togglebtn}
                >
                  <Span className={` ${!showGrid ? "" : " d-none"}`}>
                    <GridViewIcon />
                  </Span>
                  <Span className={` list-view ${!showGrid ? "" : " d-block"}`}>
                    <ListViewIcon />
                  </Span>
                </Button>
                <Button
                  variant="white"
                  onClick={() => handleEshow("export_projects")}
                  className=" px-1"
                  title="Export projects"
                  style={{ lineHeight: "1" }}
                >
                  <UpArrow className="lg" />
                </Button>
                {ac(userRoles, "Create projects", loggeduseremail, admins) && (
                  <Button
                    variant="white"
                    onClick={() => {
                      onOpenprojectsForm();
                      setSelectedprojclnt(false);
                    }}
                    className="ms-0 border-0"
                  >
                    <AddIcon />
                  </Button>
                )}{" "}
              </Span>
            </Box>
          </Col>
        </Row>
        <Row>
          <Col>
            <Box
              className={`table-wrapper xs-none shadow-wrapper settings ${!showGrid ? "" : " d-none"
                }`}
            >
              <Divider className="mb-0" />
              {ac(userRoles, "View projects", loggeduseremail, admins) ? (
                <Table>
                  <thead
                    className={` ${foundprojects?.length > 0 ? "" : "d-none"} 
                ${fetchingprojects ? "d-none" : ""}`}
                  >
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Client</th>
                      <th>Created</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th style={{ textAlign: "right" }}>Status</th>
                      <th>
                        <SliderIcon />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fetchingprojects ? (
                      <FetchingWrapper
                        title="Fetching Projects..."
                        className="mh-60"
                      />
                    ) : foundprojects && foundprojects.length > 0 ? (
                      foundprojects.map(
                        (
                          {
                            id,
                            name,
                            client,
                            created,
                            start_date,
                            end_date,
                            status,
                          },
                          index
                        ) => (
                          <tr key={index} id={`emp_${id}`}>
                            <td>
                              <Badge bg="light" text="dark" className="f-12">
                                {index + 1}
                              </Badge>
                            </td>
                            <td>{name}</td>
                            <td>{client.name}</td>
                            <td>{changeDateFormat(created, "DD-MM-YYYY")}</td>
                            <td>
                              {changeDateFormat(start_date, "DD-MM-YYYY")}
                            </td>
                            <td>{changeDateFormat(end_date, "DD-MM-YYYY")}</td>
                            <td style={{ textAlign: "right" }}>
                              <Badge
                                bg={projectsStatusColors[status]}
                                className="f-12 badge-width"
                              >
                                {status}
                              </Badge>
                            </td>
                            <td>
                              <Box className="d-flex align-items-center justify-content-end">
                                {ac(
                                  userRoles,
                                  "Update projects",
                                  loggeduseremail, admins
                                ) &&
                                  status != "Dropped" && (
                                    <Span
                                      isClick={() => {
                                        onOpenprojectsForm(id);
                                        setTimeout(() => {
                                          setSelectedprojclnt(client);
                                          setValue("client", client.id);
                                        }, 10);
                                      }}
                                      className="square_wrapper edit mx-1"
                                    >
                                      <EditIcon />
                                    </Span>
                                  )}
                                <span
                                  className="square_wrapper edit ms-1"
                                  onClick={() => {
                                    handlePshow();
                                    setSelectedProject(foundprojects[index]);
                                  }}
                                >
                                  <UserIcon />
                                </span>
                                {ac(
                                  userRoles,
                                  "Delete projects",
                                  loggeduseremail, admins
                                ) &&
                                  status != "Dropped" && (
                                    <Span
                                      isClick={() => {
                                        setProjectsId(id);
                                        handleShow("delete_projects");
                                      }}
                                      className="square_wrapper delete ms-1"
                                    >
                                      <DeleteIcon />
                                    </Span>
                                  )}
                              </Box>
                            </td>
                          </tr>
                        )
                      )
                    ) : (
                      <NoResultsWrapper
                        title="Sorry coundn't find what you're looking for!"
                        subtitle="Click the + button to add projects"
                      />
                    )}
                  </tbody>
                </Table>
              ) : (
                <Row className="justify-content-center">
                  {" "}
                  You don't have access to view projects
                </Row>
              )}
            </Box>
            <Box
              style={{ display: "none" }}
              className={`mt-3 responsive-view ${!showGrid ? "" : " d-block"}`}
            >
              {ac(userRoles, "View projects", loggeduseremail, admins) ? (
                <Box
                  className={`employee_Card_Container row-gap-15 mt-0  position-relative ${foundprojects?.length > 0 ? "" : "grid-remover-class"
                    }
                ${fetchingprojects ? "grid-remover-class" : ""} 
                `}
                >
                  {fetchingprojects ? (
                    <FetchingWrapper
                      title="Fetching Projects..."
                      className="mh-60"
                    />
                  ) : foundprojects && foundprojects.length > 0 ? (
                    foundprojects.map(
                      (
                        { id, name, details, start_date, end_date, status },
                        index
                      ) => (
                        <Box key={index} className="employee_Card">
                          <Box>
                            <Box className="d-flex align-items-start justify-content-between project_Card_Header">
                              <Box className="mb-3">
                                <SubTitle title={name} />
                              </Box>
                              <Box
                                className="id-id_And_Status_Container"
                                style={{ top: "15px" }}
                              >
                                <Badge
                                  bg="light"
                                  text="dark"
                                  className="f-12 mx-1"
                                >
                                  {foundprojects.length - index}
                                </Badge>
                                <Badge
                                  bg={projectsStatusColors[status]}
                                  className="f-12"
                                >
                                  {status}
                                </Badge>
                              </Box>
                            </Box>
                            <Box className="description-area mt-2">
                              <p className="secondary-text-label">Details : </p>
                              <p className="secondary-text-label dark-text detail-scroll">
                                {details}
                              </p>
                            </Box>
                            <Box className="mt-3 d-flex grid-c-gap align-items-center">
                              <Span>
                                <p className="secondary-text-label">
                                  Start Date :
                                </p>
                                <p className="secondary-text-label dark-text">
                                  {changeDateFormat(start_date, "DD-MMM-YYYY")}
                                </p>
                              </Span>
                            </Box>
                            <Box className="mt-3 d-flex grid-c-gap align-items-center">
                              <Span>
                                <p className="secondary-text-label">
                                  End Date :
                                </p>
                                <p className="secondary-text-label dark-text">
                                  {changeDateFormat(end_date, "DD-MMM-YYYY")}
                                </p>
                              </Span>
                            </Box>
                          </Box>
                          <Box>
                            <Divider className="mb-2 mt-3" />
                            <Box className="d-flex justify-content-end pt-2 align-items-center">
                              {ac(
                                userRoles,
                                "Update projects",
                                loggeduseremail, admins
                              ) && (
                                  <Span
                                    isClick={() => onOpenprojectsForm(id)}
                                    className="square_wrapper edit br-50"
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
                                      className="feather feather-edit-3"
                                    >
                                      <path d="M12 20h9" />
                                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                                    </svg>
                                  </Span>
                                )}
                              {ac(
                                userRoles,
                                "Delete projects",
                                loggeduseremail, admins
                              ) && (
                                  <Span
                                    isClick={() => {
                                      setProjectsId(id);
                                      handleShow("delete_projects");
                                    }}
                                    className="square_wrapper delete  ms-1 br-50"
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
                                      className="feather feather-trash"
                                    >
                                      <polyline points="3 6 5 6 21 6" />
                                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                    </svg>
                                  </Span>
                                )}
                            </Box>
                          </Box>
                        </Box>
                      )
                    )
                  ) : (
                    <NoResultsWrapper
                      title="No projects found!"
                      subtitle="Click new button to add a project"
                    />
                  )}
                </Box>
              ) : (
                <Row className="justify-content-center">
                  {" "}
                  You don't have access to view project
                </Row>
              )}
            </Box>
          </Col>
        </Row>
      </Container>
      <Modal
        show={pshow}
        onHide={handlePclose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Employees list</Modal.Title>
        </Modal.Header>
        <EmployeeProject
          employees={employees}
          selectedProject={selectedProject}
          userRoles={userRoles}
          accesstoken={accesstoken}
          notify={notify}
          exportEP={exportEP}
          openExportEmp={openExportEmp}
          loggeduseremail={loggeduseremail}
          admins={admins}
          setOpenExportEmp={setOpenExportEmp}
          
        />
      </Modal>
      {/* add project Detail */}
      <EmsModal className={`${showSaveprojects ? "show fade" : ""}`}>
        <EmsModalHeader>
          <Stack direction="horizontal" className="align-items-center">
            <SubTitle title="Project" />
          </Stack>
          <EmsModalClose isClose={onCloseprojectsForm} />
        </EmsModalHeader>
        <EmsModalBody className="p-sm-3 py-3">
          <DataSetContainer className="lg">
            <Container>
              <Form
                onSubmit={handleSubmit(onSubmitHandler)}
                className="ems-form"
              >
                <Row>
                  <Col xs={12} className="form-grid-2 ems-form">
                    <Form.Group>
                      <Form.Label>
                        Name<Span className="required">*</Span>
                      </Form.Label>
                      <Form.Control {...register("name")} />
                      <ErrorMsg errorMessage={errors.name?.message} />
                    </Form.Group>
                    <Form.Group className="position-relative">
                      <Form.Label>Client</Form.Label>
                      {selectedprojclnt?.id ? (
                        <Form.Control
                          // readOnly
                          value={selectedprojclnt.name}
                        />
                      ) : (
                        <Form.Select
                          {...register("client")}
                          className="form-control-select"
                        >
                          <option value={"null"}>Select Client</option>
                          {clients &&
                            clients.map(({ id, name }, index) => (
                              <option key={index} value={id}>
                                {name}
                              </option>
                            ))}
                        </Form.Select>
                      )}
                      <ErrorMsg errorMessage={errors.client?.message} />
                    </Form.Group>
                  </Col>
                  <Col xs={12} className="mt-2">
                    <Form.Group>
                      <Form.Label>Details</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        {...register("details")}
                      />
                      <ErrorMsg errorMessage={errors.details?.message} />
                    </Form.Group>
                  </Col>
                  <Col xs={12} className="form-grid-2 ems-form mt-2">
                    <Form.Group>
                      <Form.Label>Start Date</Form.Label>
                      <DatePicker
                        selected={
                          isValidDate(values.start_date)
                            ? new Date(values.start_date)
                            : ""
                        }
                        className="form-control"
                        onChange={(date) => {
                          setValue("start_date", new Date(date));
                        }}
                        dateFormat="dd-MM-yyyy"
                      />
                      <ErrorMsg errorMessage={errors.start_date?.message} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>End Date</Form.Label>
                      <DatePicker
                        selected={
                          isValidDate(values.end_date)
                            ? new Date(values.end_date)
                            : ""
                        }
                        className="form-control"
                        onChange={(date) => {
                          setValue("end_date", new Date(date));
                        }}
                        dateFormat="dd-MM-yyyy"
                      />
                      <ErrorMsg errorMessage={errors.end_date?.message} />
                    </Form.Group>
                  </Col>
                  <Col xs={12} className="form-grid-2 ems-form mt-2">
                    <Form.Group className="position-relative">
                      <Form.Label>Status</Form.Label>
                      <Form.Select
                        {...register("status")}
                        className="form-control select"
                      >
                        <option value={"Active"}>{"Active"}</option>
                        <option value={"On Hold"}>{"On Hold"}</option>
                        <option value={"Completed"}>{"Completed"}</option>
                        <option value={"Dropped"}>{"Dropped"}</option>
                      </Form.Select>
                      <ErrorMsg errorMessage={errors.status?.message} />
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-save me-2"
                    >
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                      <polyline points="17 21 17 13 7 13 7 21" />
                      <polyline points="7 3 7 8 15 8" />
                    </svg>
                    {submitting ? "Saving..." : "Save"}
                  </Button>{" "}
                  <Button variant="outlineDark" onClick={onCloseprojectsForm}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-x me-2"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    Discard
                  </Button>
                </Stack>
              </Form>
              {/* Export projects */}
              <Modal
                show={Eshow.export_projects}
                onHide={() => handleEClose("export_projects")}
                backdrop="static"
                animation={true}
                fullscreen={true}
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Export projects</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Container>
                    <Form.Group>
                      <Form.Label>Select staus</Form.Label>
                      <Form.Select
                        onChange={(e) => {
                          let index = e.target.selectedIndex;
                          let value = e.target.options[index].value;
                          let datatype =
                            e.target.options[index].getAttribute("datatype");
                          setselectedExpProStatus({
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
                          {PROJECT_STATUS.map(({ status }, index) => (
                            <option
                              datatype="status"
                              value={status}
                              key={index}
                            >
                              {status}
                            </option>
                          ))}
                        </optgroup>
                      </Form.Select>
                      <Span className="error-msg">
                        {errors.export_projects?.message}
                      </Span>
                    </Form.Group>
                    <Stack
                      direction="horizontal"
                      className="pt-3 justify-content-end"
                    >
                      <Button
                        variant="save"
                        disabled={submitting}
                        onClick={exportProjects}
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
                      emptyTableMessage={"No matched projects found"}
                    />
                  </Container>
                </Modal.Body>
              </Modal>
            </Container>
          </DataSetContainer>
        </EmsModalBody>
      </EmsModal>
      {/* Delete projects */}
      <Modal
        show={show.delete_projects}
        onHide={closeDeleteprojectsModal}
        backdrop="static"
        animation={true}
        fullscreen={true}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            Are you sure you want to delete the project? Associated employees
            would be Inactive
            <DeleteAndDiscard
              isSubmitting={submitting}
              onDelete={deleteprojects}
              onClose={closeDeleteprojectsModal}
            />
          </Container>
        </Modal.Body>
      </Modal>
      {/* End */}
    </Box>
  );
}
export default Projects;