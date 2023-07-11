import React, { useState, useEffect } from "react";
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
import AddIcon from "../Icons/AddIcon";
import DeleteIcon from "../Icons/DeleteIcon";
import GridViewIcon from "../Icons/GridViewIcon";
import ListViewIcon from "../Icons/ListViewIcon";
import SearchIcon from "../Icons/SearchIcon";
import SliderIcon from "../Icons/SliderIcon";
import Meta from "../Meta";
import Box from "../Shared/Box";
import Span from "../Shared/Span";
import SubTitle from "../Shared/SubTitle";
import Link from "next/link";
import EditIcon from "../Icons/EditIcon";
import Divider from "../Shared/Divider";
import LinkIcon from "../Icons/LinkIcon";
import PhoneInput from "react-phone-input-2";
import DatePicker from "react-datepicker";
import DeleteAndDiscard from "../Shared/DeleteAndDiscard";
import {
  getUniqueListBy,
  clientsStatusColors,
  changeDateFormat,
  ac
} from "../../lib/helpers";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import getAbsoluteURL from "../../utils/getAbsoluteURL";
import { clientdetailsSchema } from "../../lib/yupHelpers";
import ErrorMsg from "../Shared/ErrorMsg";
import FetchingWrapper from "../Shared/FetchingWrapper";
import NoResultsWrapper from "../Shared/NoResultsWrapper";
import axios from "axios";
import EmsModal from "../Shared/EmsModal";
import EmsModalHeader from "../Shared/EmsModalHeader";
import EmsModalClose from "../Shared/EmsModalClose";
import EmsModalBody from "../Shared/EmsModalBody";

const schema = yup.object().shape(clientdetailsSchema);

function Clients(props) {
  const {
    accesstoken,
    addclients,
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
    formState: { errors },
    setValue,
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const [showSaveclients, setShowSaveclients] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fetchingclients, setfetchingclients] = useState([]);
  const [allclients, setallclients] = useState([]);
  const [foundclients, setfoundclients] = useState([]);
  const [clientsId, setclientsId] = useState(false);
  const [show, setShow] = useState(false);
  const [wphone, setWphone] = useState("");
  const [FCD, setFCD] = useState("");
  useEffect(() => {
    try {
      let endpoint = getAbsoluteURL("controllers/clients");
      setfetchingclients(true);
      axios
        .get(endpoint, config)
        .then((response) => {
          setallclients(response.data.data);
          setfoundclients(response.data.data);
          setfetchingclients(false);
        })
        .catch((err) => {
          setfetchingclients(false);
        });
    } catch (err) {
      setfetchingclients(false);
    }
  }, []);
  useEffect(() => {
    let clients = clientsId ? allclients.find((x) => x.id == clientsId) : false;
    if (clients) {
      for (const property in clients) {
        if (schema._nodes.includes(property)) {
          let value = clients[property];
          if (property === "first_contact_date") {
            setFCD(new Date(value));
            setValue(property, new Date(value));
          } else if (property === "contact_number") {
            setWphone(value);
            setValue(property, value);
          } else {
            setValue(property, value);
          }
        }
      }
    }
  }, [clientsId]);
  const filter = (e) => {
    const keyword = e.target.value;
    if (keyword !== "") {
      const results = allclients.filter((client) => {
        return (
          client.id?.toLowerCase().includes(keyword.toLowerCase()) ||
          client.name?.toLowerCase().includes(keyword.toLowerCase()) ||
          client.contact_number
            ?.toLowerCase()
            .includes(keyword.toLowerCase()) ||
          client.contact_email?.toLowerCase().includes(keyword.toLowerCase()) ||
          client.company_url?.toLowerCase().includes(keyword.toLowerCase()) ||
          client.details?.toLowerCase().includes(keyword.toLowerCase()) ||
          changeDateFormat(client.first_contact_date)
            .toLowerCase()
            .includes(keyword.toLowerCase()) ||
          client.status?.toLowerCase().includes(keyword.toLowerCase())
        );
      });
      setfoundclients([...results]);
    } else {
      setfoundclients([...allclients]);
    }
  };
  const onOpenclientsForm = (id = null) => {
    setShowSaveclients(true);
    if (id) {
      setclientsId(id);
    } else {
      reset();
    }
  };
  const onCloseclientsForm = () => {
    setShowSaveclients(false);
    setclientsId(false);
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
  const closeDeleteclientsModal = () => {
    handleClose("delete_clients");
    setclientsId(false);
  };
  const closeViewclientsModal = () => {
    handleClose("view_client");
    setclientsId(false);
  };
  const deleteclients = async () => {
    let endpoint = getAbsoluteURL(`controllers/clients?id=${clientsId}`);
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
          message: response.data.message,
        });
        if (response.data.code === 200) {
          setShowSaveclients(false);
          if (clientsId) {
            let aclientsIndex = allclients.findIndex((x) => x.id == clientsId);
            allclients[aclientsIndex] = response.data.data;
            let fclientsIndex = foundclients.findIndex(
              (x) => x.id == clientsId
            );
            foundclients[fclientsIndex] = response.data.data;
          }
          setTimeout(() => {
            setallclients([...getUniqueListBy(allclients, "id")]);
            setfoundclients([...getUniqueListBy(foundclients, "id")]);
          }, 100);
          closeDeleteclientsModal();
          setclientsId(false);
        }
        setSubmitting(false);
      })
      .catch((error) => {
        let error_msg = error.message;
        if (error) {
          error_msg = error.message;
        }
        setSubmitting(false);
        notify({ success: false, message: error_msg });
      });
  };
  useEffect(() => {
    reset();
    setSubmitting(false);
  }, [addclients]);
  const onSubmitHandler = async (data) => {
    let endpoint = getAbsoluteURL("controllers/clients");
    if (clientsId) {
      endpoint = `${endpoint}?id=${clientsId}`;
    }
    // post data in axios
    setSubmitting(true);
    axios(
      Object.assign(
        {
          method: clientsId ? "PUT" : "POST",
          url: endpoint,
          data: data,
        },
        config
      )
    ).then((response) => {
        notify({
            success: response.data.code === 200,
            message: response.data.message,
        });
        if (response.data.code === 200) {
            setShowSaveclients(false);
            if (clientsId) {
                let aclientsIndex = allclients.findIndex((x) => x.id == clientsId);
                allclients[aclientsIndex] = response.data.data;
                let fclientsIndex = foundclients.findIndex(
                    (x) => x.id == clientsId
                );
                foundclients[fclientsIndex] = response.data.data;
            } else {
                allclients.unshift(response.data.data);
                foundclients.unshift(response.data.data);
            }
            setSubmitting(false);
        }
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
      <Meta title="TSMS - Clients" />
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
                <SubTitle title="Clients" />
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
                {ac(userRoles, "Create clients", loggeduseremail, admins) && (
                  <Button
                    variant="white"
                    className="ms-0 border-0"
                    onClick={() => {
                      setFCD("");
                      setWphone("");
                      reset();
                      onOpenclientsForm();
                    }}
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
              className={`table-wrapper xs-none shadow-wrapper settings ${
                !showGrid ? "" : " d-none"
              }`}
            >
              <Divider className="mb-0" />
              {ac(userRoles, "View clients", loggeduseremail, admins) ? (
                <Table>
                  <thead
                    className={` ${foundclients?.length > 0 ? "" : "d-none"} 
                ${fetchingclients ? "d-none" : ""}`}
                  >
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Contact Number</th>
                      <th>Email</th>
                      <th>Company URL</th>
                      <th>First Contacted date</th>
                      <th>Status</th>
                      <th>
                        <SliderIcon />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fetchingclients ? (
                      <FetchingWrapper
                        title="Fetching clients..."
                        className="mh-60"
                      />
                    ) : foundclients && foundclients.length > 0 ? (
                        foundclients.map((client, index) => (                      
                        <tr key={index} id={`client_${client.id}`}>
                          <td>
                            <Badge bg="light" text="dark" className="f-12">
                              {index + 1}
                            </Badge>
                          </td>
                          <td>{client.name}</td>
                          <td>{client.contact_number}</td>
                          <td>{client.contact_email}</td>
                          <td>
                            {client.company_url}
                            <Link href="https://www.google.com/">
                              <a target="_blank">
                                <LinkIcon className="ms-2 transY-1 theme" />
                              </a>
                            </Link>
                          </td>
                          <td>
                            {changeDateFormat(
                              client.first_contact_date,
                              "DD-MM-YYYY"
                            )}
                          </td>
                          <td>
                            <Badge
                              bg={clientsStatusColors[client.status]}
                              className="f-12"
                            >
                              {client.status}
                            </Badge>
                          </td>
                          <td>
                            {ac(
                              userRoles,
                              "Update clients",
                              loggeduseremail,
                              admins
                            ) && (
                              <Span
                                isClick={() => {
                                  setclientsId(client.id);
                                  onOpenclientsForm(client.id);
                                }}
                                className="square_wrapper edit ms-1"
                              >
                                <EditIcon />
                              </Span>
                            )}
                            {ac(
                              userRoles,
                              "Delete clients",
                              loggeduseremail,
                              admins
                            ) && (
                              <Span
                                isClick={() => {
                                  setclientsId(client.id);
                                  handleShow("delete_clients");
                                }}
                                className="square_wrapper delete ms-1"
                              >
                                <DeleteIcon />
                              </Span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <NoResultsWrapper
                        title="Sorry coundn't find what you're looking for!"
                        subtitle="Click the + button to add clients"
                      />
                    )}
                  </tbody>
                </Table>
              ) : (
                <Row className="justify-content-center">
                  {" "}
                  You don't have access to view clients
                </Row>
              )}
            </Box>
            <Box
              style={{ display: "none" }}
              className={`mt-3 responsive-view ${!showGrid ? "" : " d-block"}`}
            >
              {ac(userRoles, "View clients", loggeduseremail, admins) ? (
                <Box
                  className={`employee_Card_Container row-gap-15 mt-5  position-relative ${
                    foundclients?.length > 0 ? "" : "grid-remover-class"
                  }${fetchingclients ? "grid-remover-class" : ""}
                `}
                >
                  {fetchingclients ? (
                    <FetchingWrapper
                      title="Fetching Clients..."
                      className="mh-60"
                    />
                  ) : foundclients && foundclients.length > 0 ? (
                    foundclients.map((client, index) => (
                      <Box key={index} className="employee_Card">
                        <Box>
                          <Box className="project_Card_Header mb-3">
                            <h6>
                              {" " + client.name}{" "}
                              <Badge bg="light" text="dark" className="f-12">
                                {foundclients.length - index + " "}
                              </Badge>{" "}
                              <Badge
                                bg={clientsStatusColors[client.status]}
                                className="f-12"
                                >
                                {client.status}
                              </Badge>
                              <br />
                            </h6>
                            <label>{client.contact_email}</label>
                          </Box>
                          <Box className="mt-1 d-flex grid-c-gap align-items-center">
                            <p className="secondary-text-label">
                              Contact Number:{" "}
                              <Span>{client.contact_number}</Span>
                            </p>
                          </Box>
                          <Box className="mt-3 d-flex grid-c-gap align-items-center">
                            <Span>
                              <p className="secondary-text-label">
                                Company URL:
                              </p>
                              <p className="secondary-text-label dark-text">
                                {client.company_url}
                              </p>
                            </Span>
                          </Box>
                          <Box className="mt-3 d-flex grid-c-gap align-items-center">
                            <Span>
                              <p className="secondary-text-label">
                                First Contacted Date:
                              </p>
                              <p className="secondary-text-label dark-text">
                                {changeDateFormat(
                                  client.first_contact_date,
                                  "DD-MM-YYYY"
                                )}
                              </p>
                            </Span>
                          </Box>
                        </Box>
                        <Box>
                          <Divider className="mb-2 mt-3" />
                          <Box className="d-flex justify-content-end pt-2 align-items-center">
                            {ac(
                              userRoles,
                              "Update clients",
                              loggeduseremail,
                              admins
                            ) && (
                              <Span
                                isClick={() => {
                                  onOpenclientsForm(client.id)
                                  setclientsId(client)
                                }}
                                className="square_wrapper edit ms-1"
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
                              "Delete clients",
                              loggeduseremail,
                              admins
                            ) && (
                              <Span
                                isClick={() => {
                                  setclientsId(client);
                                  handleShow("delete_clients");
                                }}
                                className="square_wrapper delete ms-1"
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
                    ))
                  ) : (
                    <NoResultsWrapper
                      title="No clients found!"
                      subtitle="Click + button to add a client"
                    />
                  )}
                </Box>
              ) : (
                <Row className="justify-content-center">
                  {" "}
                  You don't have access to view clients
                </Row>
              )}
            </Box>
          </Col>
        </Row>
      </Container>
      {/* Add Client Detail */}
      <EmsModal className={`${showSaveclients ? "show fade" : ""}`}>
        <EmsModalHeader>
          <Stack direction="horizontal" className="align-items-center">
            <SubTitle title="Client" />
          </Stack>
          <EmsModalClose isClose={onCloseclientsForm} />
        </EmsModalHeader>
        <EmsModalBody className="p-sm-3 py-3">
          <Container>
            <Form onSubmit={handleSubmit(onSubmitHandler)} className="ems-form">
              <Row>
                <Box xs={12} className="form-grid 2 ems-form mt-0">
                  <Form.Group>
                    <Form.Label>
                      Name<Span className="required">*</Span>
                    </Form.Label>
                    <Form.Control {...register("name")} />
                    <ErrorMsg errorMessage={errors.name?.message} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Contact Number</Form.Label>
                    <PhoneInput
                      country={"in"}
                      value={wphone}
                      onChange={(phone) => {
                        setWphone(phone);
                        setValue("contact_number", phone);
                      }}
                    />
                    <ErrorMsg errorMessage={errors.contact_number?.message} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Mail Id</Form.Label>
                    <Form.Control
                      {...register("contact_email")}
                      placeholder="someone@somewhere.com"
                    />
                    <ErrorMsg errorMessage={errors.contact_email?.message} />
                  </Form.Group>
                </Box>
                <Box
                  xs={12}
                  sm={20}
                  md={210}
                  lg={12}
                  xl={12}
                  xxl={21}
                  className="form-grid 2 ems-form mt-4"
                >
                  <Form.Group>
                    <Form.Label>Company URL</Form.Label>
                    {clientsId ? (
                      <Form.Control value={clientsId.company_url} />
                    ) : (
                      <Form.Control
                        {...register("company_url")}
                        placeholder="www.example.com"
                      />
                    )}
                    {/* <Form.Control
                      {...register("company_url")}
                      placeholder="www.example.com"
                    /> */}
                    <ErrorMsg errorMessage={errors.company_url?.message} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label> Status</Form.Label>
                    {/* {clientsId ? (
                      <Form.Control value={clientsId.status} />
                    ) : ( */}
                      <Form.Select
                        {...register("status")}
                        aria-label="Default select example"
                      >
                        <option value={null}>Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </Form.Select>
                    {/* )} */}
                   
                    <ErrorMsg errorMessage={errors.status?.message} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label> First contacted date</Form.Label>
                    <DatePicker
                      placeholderText="MM-DD-YYYY"
                      selected={FCD}
                      value={FCD}
                      className="form-control"
                      onChange={(date) => {
                        setFCD(date);
                        setValue("first_contact_date", new Date(date));
                      }}
                      dateFormat="dd-MMM-yyyy"
                    />
                    <ErrorMsg
                      errorMessage={errors.first_contact_date?.message}
                    />
                  </Form.Group>
                </Box>
                <Col className="ems-form mt-4">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      {...register("address")}
                      className="mt-0"
                      as="textarea"
                      rows={3}
                    />
                    <ErrorMsg errorMessage={errors.address?.message} />
                  </Form.Group>
                </Col>
                <Col className="ems-form mt-4">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Details</Form.Label>
                    <Form.Control
                      {...register("details")}
                      className="mt-0"
                      as="textarea"
                      rows={3}
                    />
                    <ErrorMsg errorMessage={errors.details?.message} />
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
                <Button variant="outlineDark" onClick={onCloseclientsForm}>
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
                </Button>{" "}
              </Stack>
            </Form>
          </Container>
        </EmsModalBody>
      </EmsModal>
      {/*Add Client Detail End */}
      {/*Delete Clients */}
      <Modal
        show={show.delete_clients}
        onHide={closeDeleteclientsModal}
        backdrop="static"
        animation={true}
        fullscreen={true}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Clients</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            Are you sure want to delete the selected client?
            <DeleteAndDiscard
              isSubmitting={submitting}
              onDelete={deleteclients}
              onClose={closeDeleteclientsModal}
            />
          </Container>
        </Modal.Body>
      </Modal>
      {/* View Client Detailed */}
      <Modal
        show={show.view_client}
        onHide={closeViewclientsModal}
        backdrop="static"
        animation={true}
        fullscreen={true}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Client Details</Modal.Title>
        </Modal.Header>
      </Modal>
    </Box>
  );
}
export default Clients;