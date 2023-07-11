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
import { useForm } from "react-hook-form";
import { designationSchema } from "../../lib/yupHelpers";
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

const schema = yup.object().shape(designationSchema);

function Designations(props) {
  const {
    accesstoken,
    adddesignation,
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
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [showSaveDesignation, setShowSaveDesignation] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [allDesignations, setallDesignations] = useState([]);
  const [foundDesignations, setfoundDesignations] = useState([]);
  const [fetchingDesignations, setfetchingDesignations] = useState(false);
  const [designationId, setdesignationId] = useState(false);
  const [selectedDesignation, setselectedDesignation] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [show, setShow] = useState({});
  const [dep, setDep] = useState(false);

  useEffect(() => {
    try {
      let endpoint = getAbsoluteURL("controllers/designation");
      setfetchingDesignations(true);
      axios
        .get(endpoint, config)
        .then((response) => {
          console.log("in designation components", response.data.data);
          setallDesignations(response.data.data);
          setfoundDesignations(response.data.data);
          setfetchingDesignations(false);
        })
        .catch((_error) => {
          setfetchingDesignations(false);
        });
    } catch (err) {
      setfetchingDesignations(false);
    }
  }, []);

  useEffect(() => {
    try {
      let endpoint = getAbsoluteURL("controllers/department");
      axios
        .get(endpoint, config)
        .then((response) => {
          setDepartments(response.data.data);
        })
        .catch((err) => {
          console.log(err);
          setDepartments([]);
        });
    } catch (err) {
      setDepartments([]);
    }
  }, []);

  useEffect(() => {
    let designation = designationId
      ? allDesignations.find((x) => x.id == designationId)
      : false;
    setselectedDesignation(designation);
    if (designation) {
      for (const property in designation) {
        if (property === "department") {
          setValue(property, designation[property].id);
        }
        if (schema._nodes.includes(property)) {
          setValue(property, designation[property]);
        }
      }
    }
  }, [designationId]);

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = allDesignations.filter((designation) => {
        return (
          designation.id?.toLowerCase().includes(keyword.toLowerCase()) ||
          designation.name?.toLowerCase().includes(keyword.toLowerCase()) ||
          designation.code?.toLowerCase().includes(keyword.toLowerCase()) ||
          designation.description
            ?.toLowerCase()
            .includes(keyword.toLowerCase()) ||
          designation.status?.toLowerCase().includes(keyword.toLowerCase()) ||
          designation.department.name
            ?.toLowerCase()
            .includes(keyword.toLowerCase())
        );
      });
      setfoundDesignations([...results]);
    } else {
      setfoundDesignations([...allDesignations]);
    }
  };

  const onOpenDesignationForm = (id = null) => {
    setShowSaveDesignation(true);
    if (id) {
      setdesignationId(id);
    } else {
      reset();
      setdesignationId(false);
    }
  };

  const onCloseDesignationForm = () => {
    setShowSaveDesignation(false);
    setdesignationId(false);
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

  const closeDeleteDesignationModal = () => {
    handleClose("delete_designation");
    setdesignationId(false);
  };

  const deleteDesignation = async () => {
    let endpoint = getAbsoluteURL(
      `controllers/designation?id=${designationId}`
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
          let acIndex = allDesignations.findIndex((x) => x.id == designationId);
          let fcIndex = foundDesignations.findIndex(
            (x) => x.id == designationId
          );

          if (acIndex > -1) allDesignations.splice(acIndex, 1);
          if (fcIndex > -1) foundDesignations.splice(fcIndex, 1);

          setTimeout(() => {
            setallDesignations([...getUniqueListBy(allDesignations, "id")]);
            setfoundDesignations([...getUniqueListBy(foundDesignations, "id")]);
          }, 100);

          closeDeleteDesignationModal();
        }
        setSubmitting(false);
      })
      .catch((error) => {
        console.log(error.response);
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
  }, [adddesignation]);

  const onSubmitHandler = async (data) => {
    for (const property in data) {
      if (data[property] == "null") data[property] = null;
      if (typeof data[property] == "string" && data[property]?.trim() == "")
        data[property] = null;
    }
    let endpoint = getAbsoluteURL("controllers/designation");

    if (designationId) {
      endpoint = `${endpoint}?id=${designationId}`;
    }

    setSubmitting(true);
    axios(
      Object.assign(
        {
          method: designationId ? "PUT" : "POST",
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
          if (designationId) {
            let adesignationIndex = allDesignations.findIndex(
              (x) => x.id == designationId
            );
            allDesignations[adesignationIndex] = response.data.data;

            let fdesignationIndex = foundDesignations.findIndex(
              (x) => x.id == designationId
            );
            foundDesignations[fdesignationIndex] = response.data.data;
          } else {
            allDesignations.unshift(response.data.data);
            foundDesignations.unshift(response.data.data);
          }
          setTimeout(() => {
            setallDesignations([...getUniqueListBy(allDesignations, "id")]);
            setfoundDesignations([...getUniqueListBy(foundDesignations, "id")]);
          }, 100);
          onCloseDesignationForm();
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
  };

  const [showGrid, setShowGrid] = useState(false);

  function togglebtn() {
    setShowGrid(!showGrid);
  }

  return (
    <Box>
      <Meta title="EMS - Designations" />
      <Container fluid className="px-0">
        <Row>
          <Col>
            <Box
              className={`table-wrapper xs-none shadow-wrapper settings ${
                !showGrid ? "" : " d-none"
              }`}
            >
              <hr className="mb-0" />
              {ac(userRoles, "View designations", loggeduseremail, admins) ? (
                <Table>
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Name</th>
                      <th>Department</th>
                      <th>Department Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {foundDesignations.map((designation, index) => (
                      <tr key={index} id={`emp_${designation.id}`}>
                        <td>{designation.code ? designation.code : "-"}</td>
                        <td>{designation.name ? designation.name : "-"}</td>
                        <td>
                          {designation?.department?.name
                            ? designation?.department?.name
                            : "-"}
                        </td>
                        <td style={{ textAlign: "Centre" }}>
                          {designation.status ? (
                            <Badge
                              bg={
                                designation.status == "Active"
                                  ? "success"
                                  : "warning"
                              }
                              className="f-12"
                            >
                              {designation.status}
                            </Badge>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td>
                          <Span className="d-flex justify-content-end">
                            {ac(
                              userRoles,
                              "Update designations",
                              loggeduseremail,
                              admins
                            ) && (
                              <Span
                                isClick={() =>
                                  onOpenDesignationForm(designation.id)
                                }
                                className="square_wrapper edit"
                              >
                                <EditIcon />
                              </Span>
                            )}
                            {ac(
                              userRoles,
                              "Delete designations",
                              loggeduseremail,
                              admins
                            ) && (
                              <Span
                                isClick={() => {
                                  setdesignationId(designation.id);
                                  handleShow("delete_designation");
                                }}
                                className="square_wrapper delete  ms-1"
                              >
                                <DeleteIcon />
                              </Span>
                            )}
                          </Span>
                        </td>{" "}
                      </tr>
                    ))}{" "}
                    <tr>
                      <td colSpan={8} style={{ textAlign: "center" }}>
                        <Button variant="white" className="save i" onClick={() => onOpenDesignationForm()}>
                          <AddIcon />New designation{" "}
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              ) : (
                <Row className="justify-content-center">
                  {" "}
                  You don't have access to view designations
                </Row>
              )}
            </Box>
            <Box
              className={`mt-3 responsive-view ${
                !showGrid ? "d-none" : " d-block"
              }`}
            >
              {ac(userRoles, "View designations", loggeduseremail, admins) ? (
                <Box
                  className={`employee_Card_Container row-gap-15 mt-0  position-relative ${
                    foundDesignations?.length > 0 ? "" : "grid-remover-class"
                  } ${fetchingDesignations ? "grid-remover-class" : ""}`}
                >
                  {fetchingDesignations ? (
                    <FetchingWrapper
                      title="Fetching designations..."
                      className="mh-60"
                    />
                  ) : foundDesignations && foundDesignations.length > 0 ? (
                    foundDesignations.map((designation, index) => (
                      <Box key={index} className="employee_Card">
                        <Box>
                          <Box className="d-flex align-items-start justify-content-between employee_Card_Header">
                            <Box className="mb-3">
                              <SubTitle
                                title={
                                  designation.name ? designation.name : "-"
                                }
                              />
                            </Box>
                            <Box
                              className="id_And_Status_Container"
                              style={{ top: "15px" }}
                            >
                              <Badge bg="light" text="dark" className="f-12">
                                {foundDesignations.length - index}
                              </Badge>
                              <Badge bg="secondary" className=" f-12">
                                {designation.code ? designation.code : "-"}
                              </Badge>
                              <Badge bg="secondary" className=" f-12">
                                {designation?.department?.name
                                  ? designation?.department?.name
                                  : "-"}
                              </Badge>
                            </Box>
                          </Box>
                          <Box className="description-area mt-2">
                            <p className="secondary-text-label">
                              Description :{" "}
                            </p>
                            <p
                              className="secondary-text-label dark-text desc-scroll"
                              title={designation.description}
                            >
                              {designation.description
                                ? designation.description
                                : "-"}
                            </p>
                          </Box>
                          {designation.status ? (
                            <Badge
                              bg={
                                designation.status == "Active"
                                  ? "success"
                                  : "warning"
                              }
                              className="f-12"
                            >
                              {designation.status}
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
                              "Update designations",
                              loggeduseremail,
                              admins
                            ) && (
                              <Span
                                isClick={() =>
                                  onOpenDesignationForm(designation.id)
                                }
                                className="square_wrapper edit br-50"
                              >
                                <EditIcon />
                              </Span>
                            )}
                            {ac(
                              userRoles,
                              "Delete designations",
                              loggeduseremail,
                              admins
                            ) && (
                              <Span
                                isClick={() => {
                                  setdesignationId(designation.id);
                                  handleShow("delete_designation");
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
                      title="No Designations found!"
                      subtitle="Click  new  button to add designations"
                    />
                  )}
                </Box>
              ) : (
                <Row className="justify-content-center">
                  {" "}
                  You don't have access to view designations
                </Row>
              )}
            </Box>
          </Col>
        </Row>
      </Container>

      {/* Add Designation */}
      <EmsModal className={`${showSaveDesignation ? "show fade" : ""}`}>
        <EmsModalHeader>
          <Stack direction="horizontal" className="align-items-center">
            <SubTitle title="Designations" />
          </Stack>
          <EmsModalClose isClose={onCloseDesignationForm} />
        </EmsModalHeader>
        <EmsModalBody className="p-sm-3 py-3">
          <Container>
            <Form onSubmit={handleSubmit(onSubmitHandler)} className="ems-form">
              <Row>
                <Col md={12} className="form-grid mt-2">
                  <Form.Group>
                    <Form.Label>
                      Designation code <Span className="required">*</Span>
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
                      Designation name <Span className="required">*</Span>
                    </Form.Label>
                    <Form.Control placeholder="" {...register("name")} />
                    <ErrorMsg errorMessage={errors.name?.message} />
                  </Form.Group>
                  <Form.Group className="position-relative">
                    <Form.Label>Department</Form.Label>
                    {/* {selectedDesignation?.id ? (
                                            <Form.Control
                                                // readOnly
                                                disabled={true}
                                                value={selectedDesignation.department.name}
                                            />
                                        ) : ( */}
                    <Form.Select
                      {...register("department")}
                      onChange={(e) => {
                        setValue("department", e.target.value);
                      }}
                      className="form-control-select"
                    >
                      <option value={"null"}>Select Department</option>
                      {departments &&
                        departments.map(({ id, name }, index) => (
                          <option key={index} value={id}>
                            {name}
                          </option>
                        ))}
                    </Form.Select>
                    {/* )} */}
                    <ErrorMsg errorMessage={errors.department?.message} />
                  </Form.Group>
                  {/* <Form.Group className="position-relative">
                                        <Form.Label>Status</Form.Label>
                                        <Form.Select
                                            {...register("status")}
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
                <Button variant="outlineDark" onClick={onCloseDesignationForm}>
                  <CloseIcon className="me-2" /> Discard
                </Button>{" "}
              </Stack>
            </Form>
          </Container>
        </EmsModalBody>
      </EmsModal>
      {/* End */}

      {/* Delete designations */}
      <Modal
        show={show.delete_designation}
        onHide={closeDeleteDesignationModal}
        backdrop="static"
        animation={true}
        fullscreen={true}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete designation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            Are you sure want to delete the selected designation?
            <DeleteAndDiscard
              isSubmitting={submitting}
              onDelete={deleteDesignation}
              onClose={closeDeleteDesignationModal}
            />
          </Container>
        </Modal.Body>
      </Modal>
      {/* End */}
    </Box>
  );
}

export default Designations;
