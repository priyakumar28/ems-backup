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
import Select from "react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import getAbsoluteURL from "../../utils/getAbsoluteURL";
import axios from "axios";
import { useForm } from "react-hook-form";
import { courseSchema } from "../../lib/yupHelpers";
import { getUniqueListBy, thousandsFormat, ac } from "../../lib/helpers";
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
import PhoneInput from "react-phone-input-2";
import DeleteAndDiscard from "../Shared/DeleteAndDiscard";
const schema = yup.object().shape(courseSchema);
function Courses(props) {
  const { accesstoken, addcourse, notify, userRoles, loggeduseremail, admins } =
    props;
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
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [showSaveCourse, setShowSaveCourse] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [allCourses, setallCourses] = useState([]);
  const [foundCourses, setfoundCourses] = useState([]);
  const [coordinators, setCoordinators] = useState([]);
  const [selectedCoordinator, setselectedCoordinator] = useState([]);
  const [fetchingCourses, setfetchingCourses] = useState(false);
  const [courseId, setcourseId] = useState(false);
  const [tphone, setTphone] = useState("");
  const [show, setShow] = useState({});
  useEffect(() => {
    try {
      let endpoint = getAbsoluteURL("controllers/employees");
      axios
        .get(endpoint, config)
        .then((response) => {
          if (response.data.code == 200) {
            const transformed = response.data.data.map(
              ({ id, work_email }) => ({ label: work_email, value: id })
            );
            setCoordinators(transformed);
          }
        })
        .catch((error) => {
         // setCoordinators([]);
        });
    } catch (err) {
    }
  }, []);
  useEffect(() => {
    try {
      let endpoint = getAbsoluteURL("controllers/courses");
      setfetchingCourses(true);
      axios
        .get(endpoint, config)
        .then((response) => {
          setallCourses(response.data.data);
          setfoundCourses(response.data.data);
          setfetchingCourses(false);
        })
        .catch((_error) => {
          setfetchingCourses(false);
        });
    } catch (err) {
      setfetchingCourses(false);
    }
  }, []);
  useEffect(() => {
    let course = courseId ? allCourses.find((x) => x.id == courseId) : false;
    if (course) {
      for (const property in course) {
        if (schema._nodes.includes(property)) {
          setValue(property, course[property]);
          if (property == "coordinator") {
            let coordinator = coordinators?.find(
              (x) => x.label == course[property]
            );
            if (coordinator)
              setselectedCoordinator(Object.assign({}, coordinator));
          }
      }
    }}
  }, [courseId]);
  const filter = (e) => {
    const keyword = e.target.value;
    if (keyword !== "") {
      const results = allCourses.filter((course) => {
        return (
          course.id?.toLowerCase().includes(keyword.toLowerCase()) ||
          course.name?.toLowerCase().includes(keyword.toLowerCase()) ||
          course.code?.toLowerCase().includes(keyword.toLowerCase()) ||
          course.coordinator?.toLowerCase().includes(keyword.toLowerCase()) ||
          course.description?.toLowerCase().includes(keyword.toLowerCase()) ||
          course.trainer_level?.toLowerCase().includes(keyword.toLowerCase()) ||
          course.trainer?.toLowerCase().includes(keyword.toLowerCase()) ||
          course.contact_number
            ?.toLowerCase()
            .includes(keyword.toLowerCase()) ||
          course.contact_mail?.toLowerCase().includes(keyword.toLowerCase()) ||
          course.trainer_info?.toLowerCase().includes(keyword.toLowerCase()) ||
          course.status?.toLowerCase().includes(keyword.toLowerCase()) ||
          course.paymenttype?.toLowerCase().includes(keyword.toLowerCase())
        );
      });
      setfoundCourses([...results]);
    } else {
      setfoundCourses([...allCourses]);
    }
  };
  const onOpenCourseForm = (id = null) => {
    setShowSaveCourse(true);
    if (id) {
      setcourseId(id);
    } else {
      reset();
      setcourseId(false);
      setselectedCoordinator({});
    }
  };
  const onCloseCourseForm = () => {
    setShowSaveCourse(false);
    setcourseId(false);
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
  const closeDeleteCourseModal = () => {
    handleClose("delete_course");
    setcourseId(false);
  };
  const deleteCourse = async () => {
    let endpoint = getAbsoluteURL(`controllers/courses?id=${courseId}`);
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
          let acIndex = allCourses.findIndex((x) => x.id == courseId);
          let fcIndex = foundCourses.findIndex((x) => x.id == courseId);
          if (acIndex > -1) allCourses.splice(acIndex, 1);
          if (fcIndex > -1) foundCourses.splice(fcIndex, 1);
          setTimeout(() => {
            setallCourses([...getUniqueListBy(allCourses, "id")]);
            setfoundCourses([...getUniqueListBy(foundCourses, "id")]);
          }, 100);
          closeDeleteCourseModal();
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
  }, [addcourse]);
  const onSubmitHandler = async (data) => {
    for (const property in data) {
      if (data[property] == "null") data[property] = null;
      if (typeof data[property] == "string" && data[property]?.trim() == "")
        data[property] = null;
    }
    let endpoint = getAbsoluteURL("controllers/courses");
    if (courseId) {
      endpoint = `${endpoint}?id=${courseId}`;
    }
    if (typeof selectedCoordinator == "object")
      data["coordinator"] = selectedCoordinator.value;
    setSubmitting(true);
    axios(
      Object.assign(
        {
          method: courseId ? "PUT" : "POST",
          url: endpoint,
          data: data,
        },
        config
      )
    )
      .then((response) => {
        console.log("sarath",response)
        notify({
          success: response.data.code === 200,
          message: response.data.message,
        });
        if (response.data.code === 200) {
          if (courseId) {
            let acourseIndex = allCourses.findIndex((x) => x.id == courseId);
            allCourses[acourseIndex] = response.data.data;
            let fcourseIndex = foundCourses.findIndex((x) => x.id == courseId);
            foundCourses[fcourseIndex] = response.data.data;
          } else {
            allCourses.unshift(response.data.data);
            foundCourses.unshift(response.data.data);
          }
          setTimeout(() => {
            setallCourses([...getUniqueListBy(allCourses, "id")]);
            setfoundCourses([...getUniqueListBy(foundCourses, "id")]);
          }, 100);
          onCloseCourseForm();
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
      <Meta title="EMS - Courses" />
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
                <SubTitle title="Courses" />
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
                {ac(userRoles, "Create courses", loggeduseremail, admins) && (
                  <Button
                    variant="white"
                    onClick={() => onOpenCourseForm()}
                    className="ms-0 border-0"
                  >
                    <AddIcon />
                  </Button>
                )}
              </Span>
            </Box>
          </Col>
        </Row>
        <Row>
          <Col>
            <Box
              className={`table-wrapper xs-none shadow-wrapper settings ${
                !showGrid ? "" : " d-none"
              }`}
            >
              <hr className="mb-0" />
              {ac(userRoles, "View courses", loggeduseremail, admins) ? (
                <Table>
                  <thead
                    className={` ${foundCourses?.length > 0 ? "" : "d-none"} ${
                      fetchingCourses ? "d-none" : ""
                    }`}
                  >
                    <tr>
                      <th>#</th>
                      <th>Course Code</th>
                      <th>Course Name</th>
                      {/* <th>Description</th> */}
                      <th>Coordinator</th>
                      <th>Trainer From</th>
                      <th>Trainer</th>
                      <th>Contact Number</th>
                      <th>Email Id</th>
                      <th>Trainer information</th>
                      {/* <th>Payment type</th> */}
                      {/* <th>Cost</th> */}
                      <th>Cost Code</th>
                      <th style={{ textAlign: "right" }}>Status</th>
                      <th>
                        <SliderIcon />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fetchingCourses ? (
                      <FetchingWrapper
                        title="Fetching courses..."
                        className="mh-60"
                      />
                    ) : foundCourses && foundCourses.length > 0 ? (
                      foundCourses.map((course, index) => (
                        <tr key={index} id={`emp_${course.id}`}>
                          <td>
                            <Badge bg="light" text="dark" className="f-12">
                              {index + 1}
                            </Badge>
                          </td>
                          <td>{course.code ? course.code : "-"}</td>
                          <td>{course.name ? course.name : "-"}</td>
                          {/* <td>
                            <Span
                              className="elipsis-td"
                              title={
                                course.description ? course.description : "-"
                              }
                            >
                              {course.description ? course.description : "-"}
                            </Span>
                          </td> */}
                          <td>
                            {course.coordinator ? course.coordinator : "-"}
                          </td>
                          <td>{course.trainer_from}</td>
                          <td>{course.trainer ? course.trainer : "-"}</td>
                          <td>
                            {course.contact_number ? course.contact_number : "-"}
                          </td>
                          <td>
                            {course.contact_mail ? course.contact_mail : "-"}
                          </td>
                          <td>
                            {course.trainer_info ? course.trainer_info : "-"}
                          </td>
                          {/* <td>
                            {course.paymenttype ? course.paymenttype : "-"}
                          </td> */}
                          {/* <td>
                            {course.cost
                              ? thousandsFormat(course.cost, course.currency)
                              : "-"}
                          </td> */}
                          <td>{course.cost_code ? course.cost_code : "-"}</td>
                          <td style={{ textAlign: "right" }}>
                            {course.status ? (
                              <Badge
                                bg={
                                  course.status == "Active"
                                    ? "success"
                                    : "warning"
                                }
                                className="f-12"
                              >
                                {course.status}
                              </Badge>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td>
                            <Span className="d-flex justify-content-end">
                              {ac(
                                userRoles,
                                "Update courses",
                                loggeduseremail,
                                admins
                              ) && (
                                <Span
                                  isClick={() => onOpenCourseForm(course.id)}
                                  className="square_wrapper edit"
                                >
                                  <EditIcon />
                                </Span>
                              )}
                              {ac(
                                userRoles,
                                "Delete courses",
                                loggeduseremail,
                                admins
                              ) && (
                                <Span
                                  isClick={() => {
                                    setcourseId(course.id);
                                    handleShow("delete_course");
                                  }}
                                  className="square_wrapper delete  ms-1"
                                >
                                  <DeleteIcon />
                                </Span>
                              )}
                            </Span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <NoResultsWrapper
                        title="No Courses found!"
                        subtitle="Click  new  button to add certifications"
                      />
                    )}
                  </tbody>
                </Table>
              ) : (
                <Row className="justify-content-center">
                  {" "}
                  You don't have access to view courses
                </Row>
              )}
            </Box>
            <Box
              className={`mt-3 responsive-view ${
                !showGrid ? "d-none" : " d-block"
              }`}
            >
              {ac(userRoles, "View courses", loggeduseremail, admins) ? (
                <Box
                  className={`employee_Card_Container row-gap-15 mt-0  position-relative ${
                    foundCourses?.length > 0 ? "" : "grid-remover-class"
                  } ${fetchingCourses ? "grid-remover-class" : ""}`}
                >
                  {fetchingCourses ? (
                    <FetchingWrapper
                      title="Fetching courses..."
                      className="mh-60"
                    />
                  ) : foundCourses && foundCourses.length > 0 ? (
                    foundCourses.map((course, index) => (
                      <Box key={index} className="employee_Card">
                        <Box>
                          <Box className="d-flex align-items-start justify-content-between employee_Card_Header">
                            <Box className="mb-3">
                              <SubTitle
                                title={course.name ? course.name : "-"}
                              />
                            </Box>
                            <Box
                              className="id_And_Status_Container"
                              style={{ top: "15px" }}
                            >
                              <Badge bg="light" text="dark" className="f-12">
                                {foundCourses.length - index}
                              </Badge>
                              <Badge bg="secondary" className=" f-12">
                                {course.code ? course.code : "-"}
                              </Badge>
                              {course.status ? (
                                <Badge
                                  bg={
                                    course.status == "Active"
                                      ? "success"
                                      : "warning"
                                  }
                                  className="f-12"
                                >
                                  {course.status}
                                </Badge>
                              ) : (
                                "-"
                              )}
                            </Box>
                          </Box>
                          <Box className="description-area mt-2">
                            <p className="secondary-text-label">
                              Description :{" "}
                            </p>
                            <p
                              className="secondary-text-label dark-text desc-scroll"
                              title={course.description}
                            >
                              {course.description ? course.description : "-"}
                            </p>
                          </Box>
                          <Box className="mt-3 d-flex grid-c-gap align-items-center">
                            <Span>
                              <p className="secondary-text-label">
                                Coordinator :{" "}
                              </p>
                              <p className="secondary-text-label dark-text">
                                {course.coordinator ? course.coordinator : "-"}
                              </p>
                            </Span>
                            <Span className="secondary-text-label">|</Span>
                            
                            <Span>
                              <p className="secondary-text-label">Trainer : </p>
                              <p className="secondary-text-label dark-text">
                                {course.trainer ? course.trainer : "-"} -{" "}
                                
                                {course.trainer_info
                                  ? course.trainer_info
                                  : "Not defined"}
                              </p>
                            </Span>
                            <Box className="mt-1 d-flex grid-c-gap align-items-center">
                               <p className="secondary-text-label">
                              Contact Number:{" "}
                              <Span>{course.contact_number}</Span>
                               </p>
                          </Box>
                          <label>{course.contact_mail}</label>
                          </Box>

                          {/* <Box className="mt-3 d-flex grid-c-gap align-items-center">
                            <Span>
                              <p className="secondary-text-label">
                                Payment type :{" "}
                              </p>
                              <p className="secondary-text-label dark-text">
                                {course.paymenttype ? course.paymenttype : "-"}
                              </p>
                            </Span>
                            <Span className="secondary-text-label">|</Span>
                            <Span>
                              <p className="secondary-text-label">Cost : </p>
                              <p className="secondary-text-label dark-text">
                                {course.cost
                                  ? thousandsFormat(
                                      course.cost,
                                      course.currency
                                    )
                                  : "-"}
                              </p>
                            </Span>
                          </Box> */}
                        </Box>
                        <Box>
                          <hr className="mb-2 mt-3" />
                          <Box className="d-flex justify-content-end pt-2 align-items-center">
                            {ac(
                              userRoles,
                              "Update courses",
                              loggeduseremail,
                              admins
                            ) && (
                              <Span
                                isClick={() => onOpenCourseForm(course.id)}
                                className="square_wrapper edit br-50"
                              >
                                <EditIcon />
                              </Span>
                            )}
                            {ac(
                              userRoles,
                              "Delete courses",
                              loggeduseremail,
                              admins
                            ) && (
                              <Span
                                isClick={() => {
                                  setcourseId(course.id);
                                  handleShow("delete_course");
                                }}
                                className="square_wrapper delete  ms-1 br-50"
                              >
                                <DeleteIcon />
                              </Span>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <NoResultsWrapper
                      title="No Courses found!"
                      subtitle="Click  new  button to add certifications"
                    />
                  )}
                </Box>
              ) : (
                <Row className="justify-content-center">
                  {" "}
                  You don't have access to view courses
                </Row>
              )}
            </Box>
          </Col>
        </Row>
      </Container>
      {/* Add Course */}
      <EmsModal className={`${showSaveCourse ? "show fade" : ""}`}>
        <EmsModalHeader>
          <Stack direction="horizontal" className="align-items-center">
            <SubTitle title="Courses" />
          </Stack>
          <EmsModalClose isClose={onCloseCourseForm} />
        </EmsModalHeader>
        <EmsModalBody className="p-sm-3 py-3">
          <Container>
            <Form onSubmit={handleSubmit(onSubmitHandler)} className="ems-form">
              <Row>
                <Col md={12} className="form-grid mt-2">
                  <Form.Group>
                    <Form.Label>
                      Code <Span className="required">*</Span>
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
                      Course Name <Span className="required">*</Span>
                    </Form.Label>
                    <Form.Control placeholder="" {...register("name")} />
                    <ErrorMsg errorMessage={errors.name?.message} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Coordinator</Form.Label>
                    <Select
                      {...register("coordinator")}
                      isClearable={true}
                      defaultValue={{}}
                      closeMenuOnSelect={false}
                      value={selectedCoordinator}
                      onChange={setselectedCoordinator}
                      options={coordinators}
                      noOptionsMessage={() => "No coordinator found!"}
                    />
                    <ErrorMsg errorMessage={errors.coordinator?.message} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Trainer From </Form.Label>
                    <Form.Select
                      {...register("trainer_from")}
                      className="form-control select"
                    >
                      <option value="null">Select Option</option>
                      <option value="Internal">Internal</option>
                      <option value="External">External</option>
                    </Form.Select>
                    <ErrorMsg errorMessage={errors.trainer_from?.message} />

                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Trainer name </Form.Label>
                    <Form.Control placeholder="" {...register("trainer")} />
                    <ErrorMsg errorMessage={errors.trainer?.message} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Contact Number</Form.Label>
                    <PhoneInput
                    country={"in"}
                    value={tphone}
                    onChange={(phone)=>{
                      setTphone(phone);
                      setValue("contact_number",phone);
                    }} />
                    <ErrorMsg errorMessage={errors.contact_number?.message} />
                  </Form.Group>
                  <Form.Group className="position-relative">
                      <Form.Label>Mail Id</Form.Label>
                      <Form.Control 
                      {...register("contact_mail")}
                      placeholder=""
                      />
                      <ErrorMsg errorMessage={errors.contact_mail?.message} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Trainer information </Form.Label>
                    <Form.Control
                      placeholder=""
                      {...register("trainer_info")}
                    />
                    <ErrorMsg errorMessage={errors.trainer_info?.message} />
                  </Form.Group>
                  
                  {/* <Form.Group className="position-relative">
                    <Form.Label>Payment type</Form.Label>
                    <Form.Select
                      {...register("paymenttype")}
                      className="form-control select"
                    >
                      <option value="Company Sponsored">
                        Company Sponsored
                      </option>
                      <option value="Paid by Employee">Paid by Employee</option>
                    </Form.Select>
                    <ErrorMsg errorMessage={errors.paymenttype?.message} />
                  </Form.Group> */}
                   <Form.Group>
                    <Form.Label> Cost Code </Form.Label>
                    <Form.Control
                      placeholder=""
                      {...register("cost_code")}
                      onChange={(e) => {
                        let value = e.target.value?.toUpperCase();
                        setValue("cost_code", value);
                      }}
                    />
                    <ErrorMsg errorMessage={errors.cost_code?.message} />
                  </Form.Group>
                  {/* <Form.Group>
                    <Form.Label>Cost </Form.Label>
                    <Form.Control
                      placeholder=""
                      {...register("cost")}
                      onChange={(e) => {
                        let value = e.target.value?.replace(/[^0-9.]/g, "");
                        setValue("cost", value);
                      }}
                    />
                    <ErrorMsg errorMessage={errors.cost?.message} />
                  </Form.Group> */}
                  <Form.Group className="position-relative">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      {...register("status")}
                      className="form-control select"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </Form.Select>
                    <ErrorMsg errorMessage={errors.status?.message} />
                  </Form.Group>
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
                <Button variant="outlineDark" onClick={onCloseCourseForm}>
                  <CloseIcon className="me-2" /> Discard
                </Button>{" "}
              </Stack>
            </Form>
          </Container>
        </EmsModalBody>
      </EmsModal>
      {/* End */}
      {/* Delete courses */}
      <Modal
        show={show.delete_course}
        onHide={closeDeleteCourseModal}
        backdrop="static"
        animation={true}
        fullscreen={true}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            Are you sure want to delete the selected course?
            <DeleteAndDiscard
              isSubmitting={submitting}
              onDelete={deleteCourse}
              onClose={closeDeleteCourseModal}
            />
          </Container>
        </Modal.Body>
      </Modal>
      {/* End */}
    </Box>
  );
}
export default Courses;