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
import { isValidEmailDomain, isValidEnum } from "../../lib/yupHelpers";
import { getUniqueListBy, ac } from "../../lib/helpers";
import ListViewIcon from "../Icons/ListViewIcon";
import GridViewIcon from "../Icons/GridViewIcon";
import UserPlusIcon from "../Icons/UserPlusIcon";
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
import Divider from "../Shared/Divider";
import Box from "../Shared/Box";
import ErrorMsg from "../Shared/ErrorMsg";
import DeleteAndDiscard from "../Shared/DeleteAndDiscard";

yup.addMethod(yup.mixed, "isValidEmailDomain", isValidEmailDomain);
yup.addMethod(yup.mixed, "isValidEnum", isValidEnum);

function User(props) {
  const { accesstoken, adduser, notify, userRoles, loggeduseremail, admins } =
    props;
  let config = {
    headers: {
      Authorization: `Bearer ${accesstoken}`,
    },
  };
  let schemaObj = {
    username: yup
      .string()
      .required()
      .matches(
        /^[A-Za-z0-9_.]+$/,
        "Username can only have alphabets, numbers,dot and underscores"
      )
      .max(32)
      .label("Username"),
    email: yup
      .string()
      .required()
      .email()
      .isValidEmailDomain(["bassure"])
      .label("Email"),
    user_level: yup
      .string()
      .required()
      .isValidEnum(["Admin", "Manager", "Employee", "Other"], "User level")
      .label("User level"),
  };
  // if not permission => delete schemaObj user_level
  if (!ac(userRoles, "Set user level", loggeduseremail, admins)) {
    delete schemaObj.user_level;
  }
  const schema = yup.object().shape(schemaObj);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [showSaveUser, setShowSaveUser] = useState(false);
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setselectedRoles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [allUsers, setallUsers] = useState([]);
  const [foundUsers, setfoundUsers] = useState([]);
  const [fetchingUsers, setfetchingUsers] = useState(false);
  const [userId, setuserId] = useState(false);
  const [selecteduser, setSelecteduser] = useState(false);
  const [show, setShow] = useState({});

  useEffect(() => {
    try {
      let endpoint = getAbsoluteURL("controllers/users");
      setfetchingUsers(true);
      axios
        .get(endpoint, config)
        .then((response) => {
          let a, b;
          a = response.data.data;
          b = a.filter(
            (x) =>
              x.user_level == "Admin" ||
              x.user_level == "Manager" ||
              x.user_level == "Other"
          );

          setallUsers(a);
          setfoundUsers(b);
          setfetchingUsers(false);
        })
        .catch(() => {
          setfetchingUsers(false);
        });
    } catch (err) {
      setfetchingUsers(false);
    }
  }, []);

  useEffect(() => {
    try {
      let endpoint = getAbsoluteURL("controllers/users/userroles");
      axios
        .get(endpoint, config)
        .then((response) => {
          setRoles([]);
          if (response.data.code == 200) {
            const transformed = response.data.data.map(({ id, name }) => ({
              label: name,
              value: id,
            }));
            setRoles(transformed);
          }
        })
        .catch(() => {
          setRoles([]);
        });
    } catch (err) {
      setRoles([]);
    }
  }, []);

  useEffect(() => {
    let user = userId ? allUsers.find((x) => x.id == userId) : false;
    if (user) {
      for (const property in user) {
        if (schema._nodes.includes(property)) {
          setValue(property, user[property]);
        }
      }
      let roless =
        typeof user.roles == "object" && user.roles?.length > 0
          ? user.roles.map(({ id, name }) => ({ label: name, value: id }))
          : [];
      setselectedRoles([...roless]);
    }
  }, [userId]);

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = allUsers.filter((user) => {
        return (
          user.email?.toLowerCase().includes(keyword.toLowerCase()) ||
          user.id?.toLowerCase().includes(keyword.toLowerCase()) ||
          user.user_level?.toLowerCase().includes(keyword.toLowerCase()) ||
          user.username?.toLowerCase().includes(keyword.toLowerCase())
        );
      });
      setfoundUsers([...results]);
    } else {
      setfoundUsers([...allUsers]);
    }
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

  const onOpenUserForm = (id = null) => {
    setShowSaveUser(true);
    if (id) {
      setuserId(id);
    } else {
      reset();
      setselectedRoles([]);
    }
  };

  const closeDeleteUserModal = () => {
    handleClose("delete_user");
    setuserId(false);
  };

  useEffect(() => {
    reset();
    setSubmitting(false);
  }, [adduser]);

  const [showGrid, setShowGrid] = useState(false);

  const deleteUser = async () => {
    let endpoint = getAbsoluteURL(`controllers/users?id=${userId}`);
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
          let auIndex = allUsers.findIndex((x) => x.id == userId);
          let fuIndex = foundUsers.findIndex((x) => x.id == userId);

          if (auIndex > -1) allUsers.splice(auIndex, 1);
          if (fuIndex > -1) foundUsers.splice(fuIndex, 1);

          setTimeout(() => {
            setallUsers([...getUniqueListBy(allUsers, "id")]);
            setfoundUsers([...getUniqueListBy(foundUsers, "id")]);
          }, 100);

          closeDeleteUserModal();
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

  const viewRolesAndPermissions = (roless) => {
    if (typeof roless == "object" && roless?.length > 0) {
      return roless.map((x) => x.name).join(", ");
    } else {
      return "No roles assigned yet";
    }
  };

  const onSubmitHandler = async (data) => {
    let endpoint = getAbsoluteURL("controllers/users");
    if (userId) {
      endpoint = `${endpoint}?id=${userId}`;
    }
    data["user_roles"] = selectedRoles.map((role) => role.value);
    // post data in axios

    setSubmitting(true);
    axios(
      Object.assign(
        {
          method: userId ? "PUT" : "POST",
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
          setShowSaveUser(false);
          if (userId) {
            let userIndex = allUsers.findIndex((x) => x.id == userId);
            allUsers[userIndex] = response.data.data;

            let fuserIndex = foundUsers.findIndex((x) => x.id == userId);
            foundUsers[fuserIndex] = response.data.data;
          } else {
            allUsers.unshift(response.data.data);
            foundUsers.unshift(response.data.data);
          }

          setTimeout(() => {
            setallUsers([...getUniqueListBy(allUsers, "id")]);
            setfoundUsers([...getUniqueListBy(foundUsers, "id")]);
          }, 100);
          setuserId(false);
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

  function togglebtn() {
    setShowGrid(!showGrid);
  }

  return (
    <Box className="p-3 ">
      <Meta title="EMS - Users" />
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
                <SubTitle title="Users" />
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
                      ac(userRoles, "Create users", loggeduseremail, admins)
                    ) {
                      onOpenUserForm();
                    } else {
                      notify({
                        success: false,
                        message: "You don't have permission",
                      });
                    }
                  }}
                  className="ms-0 border-0"
                >
                  <UserPlusIcon />
                </Button>{" "}
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
              <Table>
                <thead
                  className={` ${foundUsers?.length > 0 ? "" : "d-none"} ${
                    fetchingUsers ? "d-none" : ""
                  }`}
                >
                  <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Mail ID</th>
                    <th>User level</th>
                    <th>User roles</th>
                    <th>
                      <SliderIcon />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fetchingUsers ? (
                    <FetchingWrapper
                      title="Fetching users..."
                      className="mh-60"
                    />
                  ) : foundUsers && foundUsers.length > 0 ? (
                    foundUsers.map((user, index) => (
                      <tr key={index} id={`emp_${user.id}`}>
                        <td>
                          <Badge bg="light" text="dark" className="f-12">
                            {index + 1}
                          </Badge>
                        </td>
                        <td>
                          <Box className="d-flex align-items-center">
                            <Box className="position-relative">
                              <img
                                src={
                                  user.profile_pic
                                    ? user.profile_pic
                                    : "/images/avatar.jpg"
                                }
                                alt={user.username}
                                className="avatar no-shadow xs me-2"
                              />
                            </Box>
                            <Span>
                              <SubTitle
                                className="dark-text"
                                title={user.username}
                              />
                            </Span>
                          </Box>
                        </td>
                        <td>
                          <Span className="elipsis-td" title={user.email}>
                            {user.email}
                          </Span>
                        </td>
                        <td>{user.user_level}</td>
                        <td>{viewRolesAndPermissions(user.roles)}</td>
                        <td>
                          <Span
                            isClick={() => {
                              if (
                                ac(
                                  userRoles,
                                  "Update users",
                                  loggeduseremail,
                                  admins
                                )
                              ) {
                                onOpenUserForm(user.id);
                              } else {
                                notify({
                                  success: false,
                                  message: "You don't have permission",
                                });
                              }
                            }}
                            className="square_wrapper edit"
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
                                  "Delete users",
                                  loggeduseremail,
                                  admins
                                )
                              ) {
                                setuserId(user.id);
                                setSelecteduser(user);
                                handleShow("delete_user");
                              } else {
                                notify({
                                  success: false,
                                  message: "You don't have permission",
                                });
                              }
                            }}
                            className="square_wrapper delete  ms-1"
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
                        </td>
                      </tr>
                    ))
                  ) : (
                    <NoResultsWrapper
                      title="No Users found!"
                      subtitle="Click new button to add users"
                    />
                  )}
                </tbody>
              </Table>
            </Box>
            <Box
              style={{ display: "none" }}
              className={`mt-4 responsive-view ${!showGrid ? "" : " d-block"}`}
            >
              <Box
                className={`employee_Card_Container  position-relative ${
                  foundUsers?.length > 0 ? "" : "grid-remover-class"
                } ${fetchingUsers ? "grid-remover-class" : ""}`}
              >
                {fetchingUsers ? (
                  <FetchingWrapper
                    title="Fetching users..."
                    className="mh-60"
                  />
                ) : foundUsers && foundUsers.length > 0 ? (
                  foundUsers.map((user, index) => (
                    <Box key={index} className="employee_Card">
                      <Box>
                        <Box className="avatar absolute">
                          <img
                            src={
                              user.profile_pic
                                ? user.profile_pic
                                : "/images/avatar.jpg"
                            }
                            alt={user.username}
                            className="avatar card-avatar"
                          />
                        </Box>
                        <Box className="d-flex align-items-start justify-content-between employee_Card_Header mt-3 mt-md-4">
                          <Box>
                            <SubTitle title={user.username} />
                            <p className="secondary-text-label mt-1">
                              {user.email}
                            </p>
                            <Box className="mt-3">
                              <p className="secondary-text-label">
                                User level :{" "}
                                <Span className=" text-dark">
                                  {user.user_level}
                                </Span>
                              </p>
                              <p className="secondary-text-label">
                                User role :{" "}
                                <Span className=" text-dark">
                                  {viewRolesAndPermissions(user.roles)}
                                </Span>
                              </p>
                            </Box>
                          </Box>
                          <Box className="id_And_Status_Container">
                            <Badge bg="light" text="dark">
                              {foundUsers.length - index}
                            </Badge>
                          </Box>
                        </Box>
                      </Box>
                      <Box>
                        <Divider className="my-2" />
                        <Box className="d-flex justify-content-end pt-2 align-items-center">
                          <Box className="d-flex">
                            <Span
                              isClick={() => {
                                if (
                                  ac(
                                    userRoles,
                                    "Update users",
                                    loggeduseremail,
                                    admins
                                  )
                                ) {
                                  onOpenUserForm(user.id);
                                  setSelecteduser(user);
                                } else {
                                  notify({
                                    success: false,
                                    message: "You don't have permission",
                                  });
                                }
                              }}
                              className="square_wrapper edit me-2 br-50"
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
                                    "Delete users",
                                    loggeduseremail,
                                    admins
                                  )
                                ) {
                                  setuserId(user.id);
                                  setSelecteduser(user);
                                  handleShow("delete_user");
                                } else {
                                  notify({
                                    success: false,
                                    message: "You don't have permission",
                                  });
                                }
                              }}
                              className="square_wrapper delete br-50"
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
                    </Box>
                  ))
                ) : (
                  <NoResultsWrapper
                    title="No Users found!"
                    subtitle="Click new button to add users"
                  />
                )}
              </Box>
            </Box>
          </Col>
        </Row>
      </Container>

      {/* Add User */}
      <EmsModal className={`${showSaveUser ? "show fade" : ""}`}>
        <EmsModalHeader>
          <Stack direction="horizontal" className="align-items-center">
            <SubTitle title="Users" />
          </Stack>
          <EmsModalClose
            isClose={() => {
              setShowSaveUser(false);
              setuserId(false);
            }}
          />
        </EmsModalHeader>
        <EmsModalBody className="p-sm-3 py-3">
          <Form onSubmit={handleSubmit(onSubmitHandler)} className="ems-form ">
            <Container>
              <Row>
                <Col xs={12} className="form-grid-2">
                  <Form.Group>
                    <Form.Label>
                      User Name <Span className="required">*</Span>
                    </Form.Label>
                    <Form.Control placeholder="" {...register("username")} />
                    <ErrorMsg errorMessage={errors.username?.message} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      Email <Span className="required">*</Span>
                    </Form.Label>
                    {userId ? (
                      <Form.Control
                        readOnly
                        defaultValue={selecteduser.email}
                        {...register("email")}
                      />
                    ) : (
                      <Form.Control {...register("email")} placeholder="" />
                    )}
                    <ErrorMsg errorMessage={errors.email?.message} />
                  </Form.Group>
                </Col>
                <Col xs={12} className="form-grid-2 mt-2">
                  {ac(userRoles, "Set user level", loggeduseremail, admins) && (
                    <Form.Group className="position-relative">
                      <Form.Label>
                        User Level <Span className="required">*</Span>
                      </Form.Label>
                      <Form.Select
                        {...register("user_level")}
                        className="form-control select"
                      >
                        <option>Select User Level</option>
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Other">Other</option>
                      </Form.Select>

                      <ErrorMsg errorMessage={errors.user_level?.message} />
                    </Form.Group>
                  )}
                  {ac(userRoles, "Set user level", loggeduseremail, admins) && (
                    <Form.Group>
                      <Form.Label>User Roles</Form.Label>
                      <Select
                        closeMenuOnSelect={false}
                        isMulti
                        value={selectedRoles}
                        onChange={setselectedRoles}
                        options={roles}
                        noOptionsMessage={() => "No roles found!"}
                      />
                    </Form.Group>
                  )}
                </Col>
              </Row>
            </Container>
            <Container>
              <Stack
                direction="horizontal"
                className="mt-4 justify-content-end"
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
                  onClick={() => {
                    setShowSaveUser(false);
                    setuserId(false);
                  }}
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
            </Container>
          </Form>
        </EmsModalBody>
      </EmsModal>

      {/* Delete user */}
      <Modal
        show={show.delete_user}
        onHide={closeDeleteUserModal}
        backdrop="static"
        animation={true}
        fullscreen={true}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            Are you sure want to delete the selected user?
            <DeleteAndDiscard
              isSubmitting={submitting}
              onDelete={deleteUser}
              onClose={closeDeleteUserModal}
            />
          </Container>
        </Modal.Body>
      </Modal>
      {/* End */}
    </Box>
  );
}

export default User;
