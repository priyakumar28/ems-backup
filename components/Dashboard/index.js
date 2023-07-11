import React, { useEffect, useState } from "react";
import { Container, Row, Col, Stack } from "react-bootstrap";
import PhoneIcon from "../Icons/PhoneIcon";
import MailIcon from "../Icons/MailIcon";
import Box from "../Shared/Box";
import getAbsoluteURL from "../../utils/getAbsoluteURL";
import axios from "axios";
// import Chart from "./Chart";
// import Statistics from "./Statistics";
// import Divider from "../Shared/Divider";
// import { defaultsDeep } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { ac, capitalizeFirstLetter } from "../../lib/helpers";

function Dashboard(props) {
  const {
    userAvailable: loggedinuser,
    accesstoken,
    userRoles,
    loggeduseremail,
    admins,
  } = props;


  let config = {
    headers: {
      Authorization: `Bearer ${accesstoken}`,
    },
  };
  const Name = (fname, mname, lname) => {
    let full_name = "";
    if (typeof fname == "string" && fname.length > 0) full_name += fname;
    if (typeof mname == "string" && mname.length > 0) full_name += " " + mname;
    if (typeof lname == "string" && lname.length > 0) full_name += " " + lname;
    return full_name;
  };
  const [DD, setDD] = useState([]);

  const router = useRouter();
  useEffect(() => {
    try {
      let endpoint = getAbsoluteURL("controllers/dashboardData");
      axios.get(endpoint, config).then((response) => {
        // let e = [];
        // response?.data?.data?.map((x) => {
        //     if (x.employee.id === loggedinuser.employee.id && x.project.status === "Active") {
        //         e.push(x)
        //     }
        // })
        let d = response.data.data;
        setDD(d);
      });
    } catch (err) {
      notify({ success: false, message: "Something went wrong" });
    }
  }, []);
  const getDepartment = (department) => {
    return department ? department.name : "-";
  };
  const getDesignation = (designation) => {
    return designation ? designation.name : "-";
  };
  return (
    <>
      <Container fluid className="dashboard py-2 px-3 max-1920">
        <Row>
          <Col md={12}>
            <h6 className="m-0 header-text">
              Welcome{" "}
              {loggedinuser.user_level === "Employee" ? (
                <>
                  {loggedinuser.employee?.first_name}&nbsp;
                  {loggedinuser.employee?.last_name}
                </>
              ) : (
                capitalizeFirstLetter(
                  loggedinuser.username?.replace(/[^a-zA-Z ]/g, " ")
                )
              )}
              ,
            </h6>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={3} lg={4}>
            {loggedinuser.user_level === "Employee" ? (
              <Box className="card p-4 bg-light">
                <Box className="avatar absolute">
                  <img
                    src={
                      loggedinuser.employee?.profile_pic
                        ? loggedinuser.employee?.profile_pic
                        : "/images/avatar.jpg"
                    }
                    className="avatar card-avatar"
                  />
                </Box>
                <Box className="id_And_Status_Container">
                  <span className="badge text-dark">
                    {loggedinuser.employee?.employee_id}
                  </span>
                  <span className="badge bg-active_state f-12 f-400">
                    {loggedinuser.employee?.status}
                  </span>
                </Box>
                <Box>
                  <h5 className="mb-1 mt-2">
                    {Name(
                      loggedinuser.employee?.first_name,
                      loggedinuser.employee?.middle_name,
                      loggedinuser.employee?.last_name
                    )}{" "}
                  </h5>
                  <p className=" secondary-text-label mb-3">
                    {getDepartment(loggedinuser?.employee?.department)}{" "}
                    {getDesignation(loggedinuser?.employee?.designation)}
                  </p>
                  <label className="d-inline-flex align-items-center">
                    {" "}
                    <span className=" circle-wrapper red me-2">
                      <MailIcon />
                    </span>
                    {loggedinuser.employee?.work_email}
                  </label>
                  <label className="d-inline-flex align-items-center">
                    {" "}
                    <span className=" circle-wrapper blue me-2 ms-4">
                      <PhoneIcon />
                    </span>
                    {loggedinuser.employee?.work_phone}
                  </label>
                </Box>
              </Box>
            ) : (
              <Box className="card p-4 bg-light">
                <Box className="avatar absolute">
                  <img
                    src={
                      loggedinuser.profile_pic
                        ? loggedinuser.profile_pic
                        : "/images/avatar.jpg"
                    }
                    className="avatar card-avatar"
                  />
                </Box>
                <Box>
                  <h5 className="mb-1 mt-2">
                    {capitalizeFirstLetter(loggedinuser.username)?.replace(
                      /[^a-zA-Z ]/g,
                      " "
                    )}{" "}
                  </h5>
                  <p className=" secondary-text-label mb-3">
                    {loggedinuser.user_level}
                  </p>
                  <label className="d-inline-flex align-items-center">
                    {" "}
                    <span className=" circle-wrapper red me-2">
                      <MailIcon />
                    </span>
                    {loggedinuser.email}
                  </label>
                </Box>
              </Box>
            )}
          </Col>
          {/* {ac(userRoles, "View projects", loggeduseremail, admins)  && <Col md={3} lg={4}>
                    <Link href="/settings/projects"  ><a>
                        <Box className="card flex p-4 mt-3 mt-lg-0">
                            <Box>
                                <label className="f-15">Active Projects</label>
                                <h2 className='mt-5'>{DD.projects_count}</h2>
                            </Box>
                            <Box>
                                <img src='/images/projects.svg' className='card-img' />
                            </Box>
                            </Box>
                            </a></Link>
                    </Col>} */}
          {/* { ac(userRoles, "View clients", loggeduseremail, admins) &&
                        <Col md={3} lg={4}>
                            <Link href="/settings/clients"  >
                                <Box className="card flex pointer p-4 mt-3 mt-lg-0" >
                                    <Box>
                                        <label className="f-15">Active Clients</label>
                                        <h2 className='mt-5'>{DD.clients_count}</h2>
                                    </Box>
                                    <Box>
                                        <img src='/images/clients.svg' className='card-img' />
                                    </Box>
                                </Box>
                            </a></Link>
                        </Col>} */}
          {ac(userRoles, "View courses", loggeduseremail, admins) && (
            <Col md={3} lg={4}>
              <Link href="/settings/courses">
                <Box className="card flex pointer p-4 mt-3 mt-lg-0">
                  <Box>
                    <label class="f-15">Active Courses</label>
                    <h2 className="mt-5">{DD.courses_count}</h2>
                  </Box>
                  <Box>
                    <img src="/images/courses.svg" className="card-img" />
                  </Box>
                </Box>
              </Link>
            </Col>
          )}
          {ac(userRoles, "View roles", loggeduseremail, admins) && (
            <Col md={3} lg={4}>
              <Link href="/settings/roles">
                <Box className="card flex pointer p-4 mt-3 mt-lg-0">
                  <Box>
                    <label class="f-15">Active Roles</label>
                    <h2 className="mt-5">{DD.roles_count}</h2>
                  </Box>
                  <Box>
                    <img src="/images/roles.svg" className="card-img" />
                  </Box>
                </Box>
              </Link>
            </Col>
          )}
          {ac(userRoles, "View employees", loggeduseremail, admins) && (
            <Col md={3} lg={4}>
              <Link href="/resource-pool/employees?status=Active">
                <Box className="card flex pointer p-4 mt-3 mt-lg-0">
                  <Box>
                    <label class="f-15">Active Employees</label>
                    <h2 className="mt-5">{DD.emp_count}</h2>
                  </Box>
                  <Box>
                    <img src="/images/employees.svg" className="card-img" />
                  </Box>
                </Box>
              </Link>
            </Col>
          )}
          {ac(userRoles, "View users", loggeduseremail, admins) && (
            <Col md={3} lg={4}>
              <Link href="/settings/user">
                <Box className="card flex pointer p-4 mt-3 mt-lg-0">
                  <Box>
                    <label class="f-15">Active Users</label>
                    <h2 className="mt-5">{DD.user_count}</h2>
                  </Box>
                  <Box>
                    <img src="/images/users.svg" className="card-img" />
                  </Box>
                </Box>
              </Link>
            </Col>
          )}
          {loggedinuser.user_level === "Super Admin" && (
            <Col md={3} lg={4}>
              <Link href="/settings/departments">
                <Box className="card flex pointer p-4 mt-3 mt-lg-0">
                  <Box>
                    <label class="f-15">Departments</label>
                    <h2 className="mt-5">{DD.dep_count}</h2>
                  </Box>
                  <Box>
                    <img src="/images/department.svg" className="card-img" />
                  </Box>
                </Box>
              </Link>
            </Col>
          )}
          {loggedinuser.user_level === "Super Admin" && (
            <Col md={3} lg={4}>
              <Link href="/settings/designations">
                <Box className="card flex pointer p-4 mt-3 mt-lg-0">
                  <Box>
                    <label class="f-15">Designations</label>
                    <h2 className="mt-5">{DD.desig_count}</h2>
                  </Box>
                  <Box>
                    <img src="/images/designation.svg" className="card-img" />
                  </Box>
                </Box>
              </Link>
            </Col>
          )}
        </Row>
        {/* {loggedinuser.user_level === "Employee" && (
          <Row>
            <Col md={6} className="mt-3">
              <Chart />
            </Col>
            <Col md={6}>
              <Statistics />
            </Col>
          </Row>
        )} */}
      </Container>
    </>
  );
}
export default Dashboard;
