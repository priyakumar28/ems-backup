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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import getAbsoluteURL from "../../utils/getAbsoluteURL";
import axios from "axios";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import {
  changeDateFormat,
  getUniqueListBy,
  isValidDate,
  sessionStatusColors,
  ac
} from "../../lib/helpers";
import { trainingSessionSchema } from "../../lib/yupHelpers";
import ListViewIcon from "../Icons/ListViewIcon";
import GridViewIcon from "../Icons/GridViewIcon";
import Meta from "../Meta";
import Box from "../Shared/Box";
import SearchIcon from "../Icons/SearchIcon";
import NoResultsWrapper from "../Shared/NoResultsWrapper";
import FetchingWrapper from "../Shared/FetchingWrapper";
import EmsModal from "../Shared/EmsModal";
import EmsModalHeader from "../Shared/EmsModalHeader";
import EmsModalClose from "../Shared/EmsModalClose";
import EmsModalBody from "../Shared/EmsModalBody";
import Span from "../Shared/Span";
import EditIcon from "../Icons/EditIcon";
import DeleteIcon from "../Icons/DeleteIcon";
import SliderIcon from "../Icons/SliderIcon";
import SubTitle from "../Shared/SubTitle";
import AddIcon from "../Icons/AddIcon";
import Divider from "../Shared/Divider";
import ErrorMsg from "../Shared/ErrorMsg";
import DeleteAndDiscard from "../Shared/DeleteAndDiscard";
const schema = yup.object().shape(trainingSessionSchema);
function TrainingSessions(props) {
  const {
    accesstoken,
    addtrainingsession,
    notify,
    userRoles,
    loggeduseremail,
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
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const values = watch();
  // Callback version of watch.  It's your responsibility to unsubscribe when done.
  const [showSaveTrainingsession, setShowSaveTrainingsession] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [courses, setCourses] = useState([]);
  const [allTrainingsessions, setallTrainingsessions] = useState([]);
  const [foundTrainingsessions, setfoundTrainingsessions] = useState([]);
  const [fetchingTrainingsessions, setfetchingTrainingsessions] =
    useState(false);
  const [trainingsessionId, settrainingsessionId] = useState(false);
  const [selectedTrainingsession, setselectedTrainingsession] = useState(false);
  const [show, setShow] = useState({});

  useEffect(() => {
    try {
      let endpoint = getAbsoluteURL("controllers/courses");
      axios
        .get(endpoint, config)
        .then((response) => {
          setCourses(response.data.data);
        })
        .catch((err) => {
          setCourses([]);
        });
    } catch (err) {
      setCourses([]);
    }
  }, []);
  useEffect(() => {
    try {
      let endpoint = getAbsoluteURL("controllers/trainingsessions");
      setfetchingTrainingsessions(true);
      axios
        .get(endpoint, config)
        .then((response) => {
          setallTrainingsessions(response.data.data);
          setfoundTrainingsessions(response.data.data);
          setfetchingTrainingsessions(false);
        })
        .catch((_err) => {
          setfetchingTrainingsessions(false);
        });
    } catch (err) {
      setfetchingTrainingsessions(false);
    }
  }, []);
  useEffect(() => {
    let trainingsession = trainingsessionId
      ? allTrainingsessions.find((x) => x.id == trainingsessionId)
      : false;
    setselectedTrainingsession(trainingsession);
    if (trainingsession) {
      let assocs = ["course"];
      for (const property in trainingsession) {
        if (schema._nodes.includes(property) && assocs.includes(property)) {
          setValue(property, trainingsession[property]?.id);
        } else if (schema._nodes.includes(property)) {
          setValue(property, trainingsession[property]);
        }
      }
    }
  }, [trainingsessionId]);
  const filter = (e) => {
    const keyword = e.target.value;
    if (keyword !== "") {
      const results = allTrainingsessions.filter((trainingsession) => {
        return (
          trainingsession.name?.toLowerCase().includes(keyword.toLowerCase()) ||
          trainingsession.id?.toLowerCase().includes(keyword.toLowerCase()) ||
          trainingsession.course?.code
            ?.toLowerCase()
            .includes(keyword.toLowerCase()) ||
          trainingsession.course?.name
            ?.toLowerCase()
            .includes(keyword.toLowerCase()) ||
          trainingsession.id?.toLowerCase().includes(keyword.toLowerCase()) ||
          trainingsession.deliverylocation
            ?.toLowerCase()
            .includes(keyword.toLowerCase()) ||
          trainingsession.deliverymethod
            ?.toLowerCase()
            .includes(keyword.toLowerCase()) ||
          trainingsession.status
            ?.toLowerCase()
            .includes(keyword.toLowerCase()) ||
          changeDateFormat(trainingsession.scheduled)
            .toLowerCase()
            .includes(keyword.toLowerCase()) ||
          changeDateFormat(trainingsession.duedate)
            .toLowerCase()
            .includes(keyword.toLowerCase()) ||
          trainingsession.description
            ?.toLowerCase()
            .includes(keyword.toLowerCase())
        );
      });
      setfoundTrainingsessions([...results]);
    } else {
      setfoundTrainingsessions([...allTrainingsessions]);
    }
  };
  const onOpenTrainingsessionForm = (id = null) => {
    setShowSaveTrainingsession(true);
    if (id) {
      settrainingsessionId(id);
    } else {
      reset();
      settrainingsessionId(false);
    }
  };
  const onCloseTrainingsessionForm = () => {
    setShowSaveTrainingsession(false);
    settrainingsessionId(false);
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
  const closeDeleteTrainingsessionModal = () => {
    handleClose("delete_trainingsession");
    settrainingsessionId(false);
  };
  const deleteTrainingsession = async () => {
    let endpoint = getAbsoluteURL(
      `controllers/trainingsessions?id=${trainingsessionId}`
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
          let acIndex = allTrainingsessions.findIndex(
            (x) => x.id == trainingsessionId
          );
          let fcIndex = foundTrainingsessions.findIndex(
            (x) => x.id == trainingsessionId
          );
          if (acIndex > -1) allTrainingsessions.splice(acIndex, 1);
          if (fcIndex > -1) foundTrainingsessions.splice(fcIndex, 1);
          setTimeout(() => {
            setallTrainingsessions([
              ...getUniqueListBy(allTrainingsessions, "id"),
            ]);
            setfoundTrainingsessions([
              ...getUniqueListBy(foundTrainingsessions, "id"),
            ]);
          }, 100);
          closeDeleteTrainingsessionModal();
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
  }, [addtrainingsession]);
  const onSubmitHandler = async (data) => {
    for (const property in data) {
      if (data[property] == "null") data[property] = null;
      if (typeof data[property] == "string" && data[property]?.trim() == "")
        data[property] = null;
    }
    let endpoint = getAbsoluteURL("controllers/trainingsessions");
    if (trainingsessionId) {
      endpoint = `${endpoint}?id=${trainingsessionId}`;
    }
    // post data in axios
    setSubmitting(true);
    axios(
      Object.assign(
        {
          method: trainingsessionId ? "PUT" : "POST",
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
          setShowSaveTrainingsession(false);
          if (trainingsessionId) {
            let atrainingsessionIndex = allTrainingsessions.findIndex(
              (x) => x.id == trainingsessionId
            );
            allTrainingsessions[atrainingsessionIndex] = response.data.data.data;
            let ftrainingsessionIndex = foundTrainingsessions.findIndex(
              (x) => x.id == trainingsessionId
            );
            foundTrainingsessions[ftrainingsessionIndex] = response.data.data.data;
          } else {
            allTrainingsessions.unshift(response.data.data.data);
            foundTrainingsessions.unshift(response.data.data.data);
          }
          setTimeout(() => {
            setallTrainingsessions([
              ...getUniqueListBy(allTrainingsessions, "id"),
            ]);
            setfoundTrainingsessions([
              ...getUniqueListBy(foundTrainingsessions, "id"),
            ]);
          }, 100);
          settrainingsessionId(false);
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
  return (
    <Box className="p-3">
      <Meta title="EMS - Traning" />
      <Container fluid className="px-0">
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
                <SubTitle title="Training Sessions" />
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
                  onClick={() => {
                    if (
                      ac(userRoles, "Create training sessions", loggeduseremail, admins)
                    ) {
                      onOpenTrainingsessionForm();
                    } else {
                      notify({
                        success: false,
                        message: "You don't have permission",
                      });
                    }
                  }}
                  className="ms-0 border-0"
                >
                  <AddIcon />
                </Button>{" "}
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
              {ac(userRoles, "View training sessions", loggeduseremail, admins) ? (
                <Table>
                  <thead
                    className={` ${foundTrainingsessions?.length > 0 ? "" : "d-none"
                      } ${fetchingTrainingsessions ? "d-none" : ""}`}
                  >
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Course</th>
                      <th>Description</th>
                      <th>Scheduled date</th>
                      <th>Due date</th>
                      <th>Session method</th>
                      <th>Session location</th>
                      <th style={{ textAlign: "right" }}>Status</th>
                      <th>
                        <SliderIcon />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fetchingTrainingsessions ? (
                      <FetchingWrapper
                        title="Fetching training sessions..."
                        className="mh-60"
                      />
                    ) : foundTrainingsessions &&
                      foundTrainingsessions.length > 0 ? (
                      foundTrainingsessions.map(
                        (
                          {
                            id,
                            name,
                            course,
                            description,
                            scheduled,
                            duedate,
                            deliverymethod,
                            deliverylocation,
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
                            <td>
                              {course.code} - {course.name}
                            </td>
                            <td>
                              <Span className="elipsis-td" title={description}>
                                {description}
                              </Span>
                            </td>
                            <td>
                              {changeDateFormat(scheduled, "DD-MMM-YYYY")}
                            </td>
                            <td>{changeDateFormat(duedate, "DD-MMM-YYYY")}</td>
                            <td>{deliverymethod}</td>
                            <td>{deliverylocation}</td>
                            <td style={{ textAlign: "right" }}>
                              <Badge
                                bg={sessionStatusColors[status]}
                                className="f-12"
                              >
                                {status}
                              </Badge>
                            </td>
                            <td>
                              <Span className="d-flex nowrap">
                                <Span
                                  isClick={() => {
                                    if (
                                      ac(
                                        userRoles,
                                        "Update training sessions",
                                        loggeduseremail, admins
                                      )
                                    ) {
                                      onOpenTrainingsessionForm(id);
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
                                        "Delete training sessions",
                                        loggeduseremail, admins
                                      )
                                    ) {
                                      settrainingsessionId(id);
                                      handleShow("delete_trainingsession");
                                    } else {
                                      notify({
                                        success: false,
                                        message: "You don't have permission",
                                      });
                                    }
                                  }}
                                  className="square_wrapper delete  ms-1"
                                >
                                  <DeleteIcon />
                                </Span>
                              </Span>
                            </td>
                          </tr>
                        )
                      )
                    ) : (
                      <NoResultsWrapper
                        title="No traning sessions found!"
                        subtitle="Click new button to add trainings"
                      />
                    )}
                  </tbody>
                </Table>
              ) : (
                <Row className="justify-content-center">
                  You don't have permission to view training sessions
                </Row>
              )}
            </Box>
            <Box
              style={{ display: "none" }}
              className={`mt-3 responsive-view ${!showGrid ? "" : " d-block"}`}
            >
              {ac(userRoles, "View training sessions", loggeduseremail, admins) ? (
                <Box
                  className={`employee_Card_Container row-gap-15 mt-0  position-relative ${foundTrainingsessions?.length > 0
                      ? ""
                      : "grid-remover-class"
                    } ${fetchingTrainingsessions ? "grid-remover-class" : ""}`}
                >
                  {fetchingTrainingsessions ? (
                    <FetchingWrapper
                      title="Fetching training sessions..."
                      className="mh-60"
                    />
                  ) : foundTrainingsessions &&
                    foundTrainingsessions.length > 0 ? (
                    foundTrainingsessions.map(
                      (
                        {
                          id,
                          name,
                          description,
                          scheduled,
                          duedate,
                          deliverymethod,
                          deliverylocation,
                          status,
                        },
                        index
                      ) => (
                        <Box key={index} className="employee_Card">
                          <Box>
                            <Box className="d-flex align-items-start justify-content-between employee_Card_Header">
                              <Box className="mb-3">
                                <SubTitle title={name} />
                              </Box>
                              <Box
                                className="id_And_Status_Container"
                                style={{ top: "15px" }}
                              >
                                <Badge bg="light" text="dark" className="f-12">
                                  {foundTrainingsessions.length - index}
                                </Badge>
                                <Badge
                                  bg={sessionStatusColors[status]}
                                  className="f-12"
                                >
                                  {status}
                                </Badge>
                              </Box>
                            </Box>
                            <Box className="description-area mt-2">
                              <p className="secondary-text-label">
                                Description :{" "}
                              </p>
                              <p className="secondary-text-label dark-text desc-scroll">
                                {description}
                              </p>
                            </Box>
                            <Box className="mt-3 d-flex grid-c-gap align-items-center">
                              <Span>
                                <p className="secondary-text-label">
                                  Scheduled date :{" "}
                                </p>
                                <p className="secondary-text-label dark-text">
                                  {changeDateFormat(scheduled, "DD-MMM-YYYY")}
                                </p>
                              </Span>
                              <Span className="secondary-text-label">|</Span>
                              <Span>
                                <p className="secondary-text-label">
                                  Due date :{" "}
                                </p>
                                <p className="secondary-text-label dark-text">
                                  {changeDateFormat(duedate, "DD-MMM-YYYY")}
                                </p>
                              </Span>
                            </Box>
                            <Box className="mt-3 d-flex grid-c-gap align-items-center">
                              <Span>
                                <p className="secondary-text-label">
                                  Session method :{" "}
                                </p>
                                <p className="secondary-text-label dark-text">
                                  {deliverymethod}
                                </p>
                              </Span>
                              <Span className="secondary-text-label">|</Span>
                              <Span>
                                <p className="secondary-text-label">
                                  Session location :{" "}
                                </p>
                                <p className="secondary-text-label dark-text">
                                  {deliverylocation}
                                </p>
                              </Span>
                            </Box>
                          </Box>
                          <Box>
                            <Divider className="mb-2 mt-3" />
                            <Box className="d-flex justify-content-end pt-2 align-items-center">
                              <Span
                                isClick={() => {
                                  if (
                                    ac(
                                      userRoles,
                                      "Update training sessions",
                                      loggeduseremail, admins
                                    )
                                  ) {
                                    onOpenTrainingsessionForm(id);
                                  } else {
                                    notify({
                                      success: false,
                                      message: "You don't have permission",
                                    });
                                  }
                                }}
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
                              <Span
                                isClick={() => {
                                  if (
                                    ac(
                                      userRoles,
                                      "Delete training sessions",
                                      loggeduseremail, admins
                                    )
                                  ) {
                                    settrainingsessionId(id);
                                    handleShow("delete_trainingsession");
                                  } else {
                                    notify({
                                      success: false,
                                      message: "You don't have permission",
                                    });
                                  }
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
                            </Box>
                          </Box>
                        </Box>
                      )
                    )
                  ) : (
                    <NoResultsWrapper
                      title="No traning sessions found!"
                      subtitle="Click new button to add trainings"
                    />
                  )}
                </Box>
              ) : (
                <Row className="justify-content-center">
                  You don't have permission to view training sessions
                </Row>
              )}
            </Box>
          </Col>
        </Row>
      </Container>
      {/* Add Trainingsession */}
      <EmsModal className={`${showSaveTrainingsession ? "show fade" : ""}`}>
        <EmsModalHeader>
          <Stack direction="horizontal" className="align-items-center">
            <SubTitle title="Training Sessions" />
          </Stack>
          <EmsModalClose isClose={onCloseTrainingsessionForm} />
        </EmsModalHeader>
        <EmsModalBody className="p-sm-3 py-3">
          <Container>
            <Form onSubmit={handleSubmit(onSubmitHandler)} className="ems-form">
              <Row>
                <Col xs={12} className="form-grid-2 ems-form">
                  <Form.Group>
                    <Form.Label>Name </Form.Label>
                    <Form.Control {...register("name")} />
                    <ErrorMsg errorMessage={errors.name?.message} />
                  </Form.Group>
                  <Form.Group className="position-relative">
                    <Form.Label>Course</Form.Label>
                    <Form.Select
                      {...register("course")}
                      className="form-control select"
                    >
                      <option value={"null"}>Select course</option>
                      {courses &&
                        courses.map(({ id, code, name }, index) => (
                          <option key={index} value={id}>
                            {code} - {name}
                          </option>
                        ))}
                    </Form.Select>
                    <ErrorMsg errorMessage={errors.course?.message} />
                  </Form.Group>
                </Col>
                <Col xs={12} className="mt-2">
                  <Form.Group>
                    <Form.Label>Description </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      {...register("description")}
                    />
                    <ErrorMsg errorMessage={errors.description?.message} />
                  </Form.Group>
                </Col>
                <Col xs={12} className="form-grid-2 ems-form mt-2">
                  <Form.Group>
                    <Form.Label>Scheduled date</Form.Label>
                    <DatePicker
                      selected={
                        isValidDate(values.scheduled)
                          ? new Date(values.scheduled)
                          : ""
                      }
                      className="form-control"
                      onChange={(date) => {
                        setValue("scheduled", new Date(date));
                      }}
                      dateFormat="dd-MMM-yyyy"
                    />
                    <ErrorMsg errorMessage={errors.scheduled?.message} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Due date</Form.Label>
                    <DatePicker
                      selected={
                        isValidDate(values.duedate)
                          ? new Date(values.duedate)
                          : ""
                      }
                      className="form-control"
                      onChange={(date) => {
                        setValue("duedate", new Date(date));
                      }}
                      dateFormat="dd-MMM-yyyy"
                    />
                    <ErrorMsg errorMessage={errors.duedate?.message} />
                  </Form.Group>
                </Col>
                <Col xs={12} className="form-grid-2 ems-form mt-2">
                  <Form.Group className="position-relative">
                    <Form.Label>Session method</Form.Label>
                    <Form.Select
                      {...register("deliverymethod")}
                      className="form-control select"
                    >
                      <option value={"Classroom"}>{"Classroom"}</option>
                      <option value={"Self Study"}>{"Self Study"}</option>
                      <option value={"Online"}>{"Online"}</option>
                    </Form.Select>
                    <ErrorMsg errorMessage={errors.deliverymethod?.message} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Session location </Form.Label>
                    <Form.Control
                      placeholder=""
                      {...register("deliverylocation")}
                    />
                    <ErrorMsg errorMessage={errors.deliverylocation?.message} />
                  </Form.Group>
                </Col>
                <Col xs={12} className="form-grid-2 ems-form mt-2">
                  <Form.Group className="position-relative">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      {...register("status")}
                      className="form-control select"
                    >
                      <option value={"Pending"}>{"Pending"}</option>
                      <option value={"Approved"}>{"Approved"}</option>
                      <option value={"Completed"}>{"Completed"}</option>
                      <option value={"Cancelled"}>{"Cancelled"}</option>
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
                  </svg>{" "}
                  {submitting ? "Saving..." : "Save"}
                </Button>{" "}
                <Button
                  variant="outlineDark"
                  onClick={onCloseTrainingsessionForm}
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
                    className="feather feather-x me-2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>{" "}
                  Discard
                </Button>{" "}
              </Stack>
            </Form>
          </Container>
        </EmsModalBody>
      </EmsModal>
      {/* End */}
      {/* Delete trainingsessions */}
      <Modal
        show={show.delete_trainingsession}
        onHide={closeDeleteTrainingsessionModal}
        backdrop="static"
        animation={true}
        fullscreen={true}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete training session</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            Are you sure want to delete the selected training?
            <DeleteAndDiscard
              isSubmitting={submitting}
              onDelete={deleteTrainingsession}
              onClose={closeDeleteTrainingsessionModal}
            />
          </Container>
        </Modal.Body>
      </Modal>
      {/* End */}
    </Box>
  );
}
export default TrainingSessions;