import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Form,
  Table,
  Badge,
  Modal,
  Stack,
  Accordion,
} from "react-bootstrap";
import getAbsoluteURL from "../../utils/getAbsoluteURL";
import { ac, getUniqueListBy } from "../../lib/helpers";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import _ from "lodash";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import ListViewIcon from "../Icons/ListViewIcon";
import GridViewIcon from "../Icons/GridViewIcon";
import SliderIcon from "../Icons/SliderIcon";
import SaveIcon from "../Icons/SaveIcon";
import CloseIcon from "../Icons/CloseIcon";
import Meta from "../Meta";
import Box from "../Shared/Box";
import DataSetContainer from "../Shared/DataSetContainer";
import SearchIcon from "../Icons/SearchIcon";
import NoResultsWrapper from "../Shared/NoResultsWrapper";
import FetchingWrapper from "../Shared/FetchingWrapper";
import NoWrap from "../Shared/NoWrap";
import EmsModal from "../Shared/EmsModal";
import EmsModalHeader from "../Shared/EmsModalHeader";
import EmsModalClose from "../Shared/EmsModalClose";
import EmsModalBody from "../Shared/EmsModalBody";
import SubTitle from "../Shared/SubTitle";
import Divider from "../Shared/Divider";
import Span from "../Shared/Span";
import DeleteAndDiscard from "../Shared/DeleteAndDiscard";

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Z\s]+$/, "Please enter valid name")
    .required()
    .max(32)
    .label("Role name"),
});
function Roles(props) {
  const {
    accesstoken,
    adduserrole,
    notify,
    userRoles,
    loggeduseremail,
    admins,
  } = props;
  const [allroles, setAllroles] = useState([]);
  const [foundRoles, setFoundRoles] = useState([]);
  const [modules, setModules] = useState([]);
  const [selectedModules, setselectedModules] = useState([]);
  const [permittedModules, setpermittedModules] = useState([]);
  const [roleid, setRoleid] = useState(false);
  const [isCheckAll, setisCheckAll] = useState({});
  const [isCheckperm, setisCheckPerm] = useState({});
  const [fetchingusersroles, setfetchingUsersroles] = useState(false);
  const [showAddUserRoles, setShowAddUserRoles] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [show, setShow] = useState({});
  const [pmodules, setPmodules] = useState([]);
  const [stat, setStat] = useState(false);
  const [dup, setDup] = useState(false);
  let config = {
    headers: {
      Authorization: `Bearer ${accesstoken}`,
    },
  };
  useEffect(() => {
    try {
      let endpoint = getAbsoluteURL("controllers/users/userroles");
      setfetchingUsersroles(true);
      axios
        .get(endpoint, config)
        .then((response) => {
          setAllroles(response.data.data);
          setFoundRoles(response.data.data);
          setfetchingUsersroles(false);
        })
        .catch((_error) => {
          setfetchingUsersroles(false);
        });
    } catch (err) {
      setfetchingUsersroles(false);
    }
  }, []);
  useEffect(() => {
    try {
      let endpoint = getAbsoluteURL("controllers/users/modules");
      axios
        .get(endpoint, config)
        .then((response) => {
          if (response?.data?.data && typeof response.data.data === "object") {
            const groupedModules = _.groupBy(
              response.data.data,
              (module) => module.menu
            );
            let moduless = [];
            let modulesToHide = ["Employee project management", "Project management", "Client management", "Timesheet management"];
            for (const moduleName in groupedModules) {
              if (!modulesToHide.includes(moduleName)) {
                moduless.push([
                  moduleName,
                  _.orderBy(groupedModules[moduleName], ["mod_order"], ["asc"]),
                ]);
              }
            }
            setModules([...moduless]);
          }
        })
        .catch((_error) => {
          setModules(false);
        });
    } catch (err) {
      setModules(false);
    }
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(schema) });
  useEffect(() => {
    let roleObj = roleid ? allroles.find((x) => x.id == roleid) : false;
    let selectedModuless = [];
    let permitedModuless = [];
    let permModules = [];
    if (roleObj) {
      for (const property in roleObj) {
        if (schema._nodes.includes(property)) {
          setValue(property, roleObj[property]);
        }
      }
      if (
        typeof roleObj.allocatedModules == "object" &&
        roleObj.allocatedModules?.length > 0
      ) {
        for (let mod in roleObj.allocatedModules) {
          let module = roleObj.allocatedModules[mod];
          selectedModuless.push(module.id);
        }
        const groupModules = _.groupBy(
          roleObj.allocatedModules,
          (module) => module.menu
        );
        for (const moduleName in groupModules) {
          permModules.push([
            moduleName,
            _.orderBy(groupModules[moduleName], ["mod_order"], ["asc"]),
          ]);
        }
      }
      if (typeof roleObj.modules == "object" && roleObj.modules?.length > 0) {
        for (let mod in roleObj.modules) {
          let module = roleObj.modules[mod];
          permitedModuless.push(module.id);
        }
      }
    }
    for (const element of modules) {
      const name = element[0];
      let moduleIds = element[1].map((x) => x.id);
      if (allelementsExists(selectedModuless, moduleIds)) {
        isCheckAll[name] = true;
      } else {
        delete isCheckAll[name];
      }
    }
    for (const element of permModules) {
      const name = element[0];
      let moduleids = element[1].map((x) => x.id);
      if (allelementsExists(permitedModuless, moduleids)) {
        isCheckperm[name] = true;
      } else {
        delete isCheckperm[name];
      }
    }
    setisCheckAll({ ...isCheckAll });
    setselectedModules([...selectedModuless]);
    setisCheckPerm({ ...isCheckperm });
    setpermittedModules([...permitedModuless]);
    setPmodules([...permModules]);
  }, [roleid]);
  const filter = (e) => {
    const keyword = e.target.value;
    if (keyword !== "") {
      const results = allroles?.filter((role) => {
        return (
          role.name?.toLowerCase().includes(keyword.toLowerCase()) ||
          role?.id.toLowerCase().includes(keyword.toLowerCase())
        );
      });
      setFoundRoles([...results]);
    } else {
      setFoundRoles([...allroles]);
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
    setShowAddUserRoles(true);
    if (id) {
      setRoleid(id);
    } else {
      reset();
      setRoleid(false);
      setselectedModules([]);
      setpermittedModules([]);
    }
  };
  const onCloseUserForm = () => {
    setShowAddUserRoles(false);
    setRoleid(false);
    reset();
    setselectedModules([]);
    setpermittedModules([]);
  };
  const onCloseUserForm1 = () => {
    setShowAddUserRoles(false);
    setRoleid(false);
    reset();
    setpermittedModules([]);
  };
  // Check if a1 contain all element of a2
  const allelementsExists = (a1, a2) =>
    a2.filter((e) => a1.indexOf(e) !== -1).length === a2.length;
  const handleSelectAll = (e) => {
    const { checked, name } = e.target;
    let sms = modules.find((a) => a[0] === name);
    let newArray = [];
    if (sms && sms?.length > 0) {
      let selectedModuleIds = sms[1].map((x) => x.id);
      if (checked) {
        newArray = selectedModules.concat(selectedModuleIds);
      } else {
        newArray = selectedModules.filter(
          (x) => selectedModuleIds.indexOf(x) < 0
        );
      }
      if (allelementsExists(newArray, selectedModuleIds)) {
        isCheckAll[name] = true;
      } else {
        delete isCheckAll[name];
      }
    }
    setisCheckAll({ ...isCheckAll });
    setselectedModules([...newArray]);
  };
  const handleClick = (e) => {
    const { id, checked, name } = e.target;
    let newArray = selectedModules;
    if (checked) {
      newArray.push(id);
    } else {
      newArray = selectedModules.filter((x) => x != id);
    }
    let sms = modules.find((a) => a[0] === name);
    let selectedModuleIds = sms[1].map((x) => x.id);
    if (allelementsExists(newArray, selectedModuleIds)) {
      isCheckAll[name] = true;
    } else {
      delete isCheckAll[name];
    }
    setisCheckAll({ ...isCheckAll });
    setselectedModules([...newArray]);
  };
  const handleSelectAlltwo = (e) => {
    const { checked, name } = e.target;
    let sms = modules.find((a) => a[0] === name);
    let newArray = [];
    if (sms && sms?.length > 0) {
      let permittedModuleIds = sms[1].map((x) => x.id);
      if (checked) {
        newArray = permittedModules.concat(permittedModuleIds);
      } else {
        newArray = permittedModules.filter(
          (x) => permittedModuleIds.indexOf(x) < 0
        );
      }
      if (allelementsExists(newArray, permittedModuleIds)) {
        isCheckperm[name] = true;
      } else {
        delete isCheckperm[name];
      }
    }
    setisCheckPerm({ ...isCheckperm });
    setpermittedModules([...newArray]);
  };
  const handleClicktwo = (e) => {
    const { id, checked, name } = e.target;
    let newArray = permittedModules;
    if (checked) {
      newArray.push(id);
    } else {
      newArray = permittedModules.filter((ee) => ee != id);
    }
    let sms = pmodules.find((a) => a[0] === name);
    let permittedModuleIds = sms[1].map((x) => x.id);
    if (allelementsExists(newArray, permittedModuleIds)) {
      isCheckperm[name] = true;
    } else {
      delete isCheckperm[name];
    }
    setisCheckPerm({ ...isCheckperm });
    setpermittedModules([...newArray]);
  };
  useEffect(() => {
    reset();
    setSubmitting(false);
  }, [adduserrole]);
  const closeDeleteRoleModal = () => {
    handleClose("delete_role");
    setRoleid(false);
  };
  const deleteRole = async () => {
    let endpoint = getAbsoluteURL(`controllers/users/userroles?id=${roleid}`);
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
          let arIndex = allroles.findIndex((x) => x.id == roleid);
          let frIndex = foundRoles.findIndex((x) => x.id == roleid);
          if (arIndex > -1) allroles.splice(arIndex, 1);
          if (frIndex > -1) foundRoles.splice(frIndex, 1);
          setTimeout(() => {
            setAllroles([...getUniqueListBy(allroles, "id")]);
            setFoundRoles([...getUniqueListBy(foundRoles, "id")]);
          }, 100);
          closeDeleteRoleModal();
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

  const onSubmitHandler = async (data) => {
    if (!dup) {
      let a = new Set(selectedModules);
      let b = [];
      a.forEach((value) => b.push(value));
      data["mod_arr"] = b;
    } else {
      let a = new Set(permittedModules);
      let b = [];
      a.forEach((value) => b.push(value));
      data["modules"] = b;
    }
    if (roleid) {
      data["id"] = roleid;
    } 
    console.log("ddddd", data);
    let endpoint = getAbsoluteURL("controllers/users/userroles");
    setSubmitting(true);
    axios(
      Object.assign(
        {
          method: roleid ? "PUT" : "POST",
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
          if (roleid) {
            let aroleIndex = allroles.findIndex((x) => x.id == roleid);
            allroles[aroleIndex] = response.data.data;
            let froleIndex = foundRoles.findIndex((x) => x.id == roleid);
            foundRoles[froleIndex] = response.data.data;
          } else {
            allroles.unshift(response.data.data);
            foundRoles.unshift(response.data.data);
          }
          setTimeout(() => {
            setAllroles([...getUniqueListBy(allroles, "id")]);
            setFoundRoles([...getUniqueListBy(foundRoles, "id")]);
          }, 100);
          onCloseUserForm();
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
    <Box className="p-3 ">
      <Meta title="EMS - Roles and Permissions" />
      <Container fluid className=" px-0">
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
                <SubTitle title="Roles & Permissions" />
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
                {ac(userRoles, "Create roles", loggeduseremail, admins) && (
                  <Button
                    variant="white"
                    onClick={() => {
                      setStat(false);
                      onOpenUserForm();
                    }}
                    className="ms-0"
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
                      className="feather feather-plus"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
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
              {ac(userRoles, "View roles", loggeduseremail, admins) ? (
                <Table className="v-top">
                  <thead
                    className={` ${foundRoles?.length > 0 ? "" : "d-none"} ${
                      fetchingusersroles ? "grid-remover-class-table" : ""
                    }`}
                  >
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Permissions</th>
                      <th>
                        <SliderIcon />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fetchingusersroles ? (
                      <FetchingWrapper title="Fetching roles..." />
                    ) : foundRoles && foundRoles.length > 0 ? (
                      foundRoles.map((role, index) => (
                        <tr key={index} id={`emp_${role.id}`}>
                          <td>
                            <Badge bg="light" text="dark" className="f-12">
                              {index + 1}
                            </Badge>
                          </td>
                          <td>{role.name}</td>
                          <td>
                            {/* {(typeof role.modules == 'object' && role.modules?.length > 0) ? */}
                            <Span
                              isClick={() => {
                                {
                                  if (
                                    ac(
                                      userRoles,
                                      "View roles",
                                      loggeduseremail,
                                      admins
                                    )
                                  ) {
                                    setStat(true);
                                    setDup(true);
                                    onOpenUserForm(role.id);
                                  }
                                  // }
                                  else {
                                    notify({
                                      success: false,
                                      message: "You don't have permission",
                                    });
                                  }
                                }
                              }}
                              className="view"
                            >
                              {" "}
                              View/Edit permissions
                            </Span>
                          </td>
                          <td>
                            <NoWrap>
                              {ac(
                                userRoles,
                                "Update roles",
                                loggeduseremail,
                                admins
                              ) && (
                                <Span
                                  isClick={() => {
                                    setStat(false);
                                    onOpenUserForm(role.id);
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
                              )}
                              {ac(
                                userRoles,
                                "Delete roles",
                                loggeduseremail,
                                admins
                              ) && (
                                <Span
                                  isClick={() => {
                                    setRoleid(role.id);
                                    handleShow("delete_role");
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
                              )}
                            </NoWrap>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <NoResultsWrapper
                        title="No results found!"
                        subtitle="Click new button to add roles & permissions"
                      />
                    )}
                  </tbody>
                </Table>
              ) : (
                "You don't have permission to view"
              )}
            </Box>
            <Box
              style={{ display: "none" }}
              className={`mt-3 responsive-view ${!showGrid ? "" : " d-block"}`}
            >
              <Box
                className={`employee_Card_Container row-gap-15 mt-0  position-relative ${
                  foundRoles?.length > 0 ? "" : "grid-remover-class"
                } ${fetchingusersroles ? "grid-remover-class" : ""}`}
              >
                {fetchingusersroles ? (
                  <FetchingWrapper title="Fetching roles..." />
                ) : foundRoles && foundRoles.length > 0 ? (
                  foundRoles.map((role, index) => (
                    <Box key={index} className="employee_Card">
                      <Box>
                        <Box className="d-flex align-items-start justify-content-between employee_Card_Header">
                          <Box>
                            <SubTitle title={role.name} />
                            <p
                              className="secondary-text-label"
                              onClick={() => {
                                if (
                                  ac(userRoles, "View roles", loggeduseremail, admins)
                                ) {
                                  onOpenUserForm(role.id);
                                }
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              {typeof role.modules == "object" &&
                              role.modules?.length > 0 ? (
                                <Span
                                  isClick={() => {
                                    if (
                                      ac(
                                        userRoles,
                                        "View roles",
                                        loggeduseremail,
                                        admins
                                      )
                                    ) {
                                      onOpenUserForm(role.id);
                                    } else {
                                      notify({
                                        success: false,
                                        message: "You don't have permission",
                                      });
                                    }
                                  }}
                                  className="view"
                                >
                                  {" "}
                                  View/Edit permissions
                                </Span>
                              ) : (
                                <>No permissions assigned</>
                              )}
                            </p>
                          </Box>
                          <Box
                            className="id_And_Status_Container"
                            style={{ top: "12px" }}
                          >
                            <Badge bg="light" text="dark" className="f-12">
                              {foundRoles.length - index}
                            </Badge>
                          </Box>
                        </Box>
                      </Box>
                      <Box>
                        <Divider className="mb-2 mt-3" />
                        <Box className="d-flex justify-content-end pt-2 align-items-center">
                          <Box className="d-flex">
                            <Span
                              isClick={() => {
                                if (
                                  ac(
                                    userRoles,
                                    "Update roles",
                                    loggeduseremail,
                                    admins
                                  )
                                ) {
                                  onOpenUserForm(role.id);
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
                                    "Delete roles",
                                    loggeduseremail,
                                    admins
                                  )
                                ) {
                                  setRoleid(role.id);
                                  handleShow("delete_role");
                                } else {
                                  notify({
                                    success: false,
                                    message: "You don't have permission",
                                  });
                                }
                              }}
                              className="square_wrapper delete br-50 ms-2"
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
                    title="No results found!"
                    subtitle="Click new button to add roles & permissions"
                  />
                )}
              </Box>
            </Box>
          </Col>
        </Row>
      </Container>

      {/* Add user Roles */}

      <EmsModal className={`${showAddUserRoles ? "show fade" : ""}`}>
        <EmsModalHeader>
          <Stack direction="horizontal" className="align-items-center">
            {stat ? (
              <SubTitle title="Roles & Permissions" />
            ) : (
              <SubTitle title="Roles & Modules" />
            )}
          </Stack>
          <EmsModalClose
            isClose={() => {
              onCloseUserForm();
              setDup(false);
            }}
          />
        </EmsModalHeader>
        <EmsModalBody className="p-sm-3 py-3">
          {!stat ? (
            <Form onSubmit={handleSubmit(onSubmitHandler)} className="role">
              <DataSetContainer className="lg">
                <Container>
                  <Box className="form-grid ems-form">
                    <Form.Group>
                      <Form.Label>Role name</Form.Label>
                      <Form.Control
                        type="text"
                        autoFocus
                        {...register("name")}
                      />
                      <Span className="error-msg">{errors.name?.message}</Span>
                    </Form.Group>
                    {roleid && (
                      <Form.Group>
                        <Form.Label>
                          Roles <span className="required">*</span>
                        </Form.Label>
                        <Form.Select
                          value={roleid}
                          className="form-control"
                          onChange={(e) => {
                            setRoleid(
                              isNaN(e.target.value) ? false : e.target.value
                            );
                          }}
                        >
                          {foundRoles &&
                            foundRoles.map(({ id, name }, index) => (
                              <option key={index} value={id}>
                                {name}
                              </option>
                            ))}
                        </Form.Select>
                      </Form.Group>
                    )}
                  </Box>
                  {modules &&
                    typeof modules === "object" &&
                    modules.map((module, mNindex) => (
                      <Accordion
                        key={mNindex}
                        defaultActiveKey={module[0]}
                        className={`role-accordian ${
                          mNindex > 0 ? "mt-3" : "mt-4"
                        }`}
                      >
                        <Accordion.Item eventKey={module[0]}>
                          <Accordion.Header>{module[0]}</Accordion.Header>
                          <Accordion.Body>
                            <Form.Check
                              inline
                              label={"All"}
                              name={module[0]}
                              type="checkbox"
                              id={module[0]}
                              onChange={handleSelectAll}
                              checked={isCheckAll.hasOwnProperty(module[0])}
                              disabled={
                                !ac(
                                  userRoles,
                                  "Set permissions for roles",
                                  loggeduseremail,
                                  admins
                                )
                              }
                            />
                            {module.length > 0 &&
                              typeof module[1] === "object" &&
                              module[1].map(
                                ({ id, name }, mindex) => (
                                  <Form.Check
                                    key={mindex}
                                    inline
                                    label={name}
                                    name={module[0]}
                                    type="checkbox"
                                    id={id}
                                    onChange={handleClick}
                                    checked={selectedModules.includes(id)}
                                    disabled={
                                      !ac(
                                        userRoles,
                                        "Set permissions for roles",
                                        loggeduseremail,
                                        admins
                                      )
                                    }
                                  />
                                )
                              )}
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    ))}
                </Container>
              </DataSetContainer>
              <Container>
                <Stack
                  direction="horizontal"
                  className="pt-3 mt-1 justify-content-end"
                >
                  <Button
                    type="submit"
                    disabled={submitting}
                    variant="save"
                    className="save"
                  >
                    <SaveIcon />{" "}
                    <Span className="ms-2">
                      {submitting ? "Saving..." : "Save"}
                    </Span>
                  </Button>
                  <Button variant="outlineDark" onClick={onCloseUserForm}>
                    <CloseIcon /> <Span className="ms-2">Discard</Span>
                  </Button>
                </Stack>
              </Container>
            </Form>
          ) : (
            <Form onSubmit={handleSubmit(onSubmitHandler)} className="role">
              <DataSetContainer className="lg">
                <Container>
                  <Box className="form-grid ems-form">
                    <Form.Group>
                      <Form.Label>Role name</Form.Label>
                      <Form.Control
                        type="text"
                        autoFocus
                        {...register("name")}
                        disabled="true"
                      />
                      <Span className="error-msg">{errors.name?.message}</Span>
                    </Form.Group>
                  </Box>
                  {pmodules &&
                    typeof pmodules === "object" &&
                    pmodules.map((module, mNindex) => (
                      <Accordion
                        key={mNindex}
                        defaultActiveKey={module[0]}
                        className={`role-accordian ${
                          mNindex > 0 ? "mt-3" : "mt-4"
                        }`}
                      >
                        <Accordion.Item eventKey={module[0]}>
                          <Accordion.Header>{module[0]}</Accordion.Header>
                          <Accordion.Body>
                            {module[1].length > 1 && (
                              <Form.Check
                                inline
                                label={"All"}
                                name={module[0]}
                                type="checkbox"
                                id={module[0]}
                                onChange={handleSelectAlltwo}
                                checked={isCheckperm.hasOwnProperty(module[0])}
                                disabled={
                                  !ac(
                                    userRoles,
                                    "Set permissions for roles",
                                    loggeduseremail,
                                    admins
                                  )
                                }
                              />
                            )}
                            {module.length > 0 &&
                              typeof module[1] === "object" &&
                              module[1].map(
                                ({ id, name }, mindex) => (
                                  <Form.Check
                                    key={mindex}
                                    inline
                                    label={name}
                                    name={module[0]}
                                    type="checkbox"
                                    id={id}
                                    onChange={handleClicktwo}
                                    checked={permittedModules.includes(id)}
                                    disabled={
                                      !ac(
                                        userRoles,
                                        "Set permissions for roles",
                                        loggeduseremail,
                                        admins
                                      )
                                    }
                                  />
                                )
                              )}
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    ))}
                </Container>
              </DataSetContainer>
              {pmodules.length > 0 ? (
                <Container>
                  <Stack
                    direction="horizontal"
                    className="pt-3 mt-1 justify-content-end"
                  >
                    <Button
                      type="submit"
                      disabled={submitting}
                      variant="save"
                      className="save"
                    >
                      <SaveIcon />{" "}
                      <Span className="ms-2">
                        {submitting ? "Saving..." : "Save"}
                      </Span>
                    </Button>
                    <Button
                      variant="outlineDark"
                      onClick={() => {
                        onCloseUserForm1();
                        setDup(false);
                      }}
                    >
                      <CloseIcon /> <Span className="ms-2">Discard</Span>
                    </Button>
                  </Stack>
                </Container>
              ) : (
                <Container>
                  <Stack
                    direction="horizontal"
                    className="pt-3 mt-1 justify-content-center"
                  >
                    <Row>No Permissions have been assigned</Row>
                  </Stack>
                </Container>
              )}
            </Form>
          )}
        </EmsModalBody>
      </EmsModal>
      {/* Delete user Roles */}
      <Modal
        show={show.delete_role}
        onHide={closeDeleteRoleModal}
        backdrop="static"
        animation={true}
        fullscreen={true}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            Are you sure want to delete the selected role?
            <DeleteAndDiscard
              isSubmitting={submitting}
              onDelete={deleteRole}
              onClose={closeDeleteRoleModal}
            />
          </Container>
        </Modal.Body>
      </Modal>
      {/* End */}
    </Box>
  );
}
export default Roles;
