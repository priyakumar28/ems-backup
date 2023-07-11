import React, { useState, useEffect } from "react";
import { Container, Stack, Tab, Row, Col, Nav } from "react-bootstrap";
import EmployeeBasicDetail from "../EmployeeData/EmployeeDataRecord/EmployeeBasicDetail";
import MailIcon from "../Icons/MailIcon";
import UserIcon from "../Icons/UserIcon";
import UsersIcon from "../Icons/UsersIcon";
import PhoneIcon from "../Icons/PhoneIcon";
import DocumentIcon from "../Icons/DocumentIcon";
import CreditCardIcon from "../Icons/CreditCardIcon";
import BookIcon from "../Icons/BookIcon";
import NomineeDetail from "../EmployeeData/EmployeeDataRecord/NomineeDetails";
import EmergencyContactDetails from "../EmployeeData/EmployeeDataRecord/EmergencyContactDetails";
import Documents from "../EmployeeData/EmployeeDataRecord/Documents";
import BankDetails from "../EmployeeData/EmployeeDataRecord/BankDetails";
import Educations from "../EmployeeData/EmployeeDataRecord/Educations";
import Skills from "../EmployeeData/EmployeeDataRecord/SkillsAndCertification";
import EmploymentHistory from "../EmployeeData/EmployeeDataRecord/EmploymentHistory";
import CodeIcon from "../Icons/CodeIcon";
import TrainingDetail from "../EmployeeData/EmployeeDataRecord/TrainingDetail";
import Divider from "../Shared/Divider";
import SubTitle from "../Shared/SubTitle";
import Box from "../Shared/Box";
import TitleXl from "../Shared/TitleXl";
import ProfilePhotoComponent from "../Shared/ProfilePhotoComponent";
import getAbsoluteURL from "../../utils/getAbsoluteURL";
import axios from "axios";
import CircleLoader from "../Shared/CircleLoader";

function MyProfile(props) {
  const {
    accesstoken,
    notify,
    loggeduseremail,
    userAvailable,
    userRoles,
    admins,
  } = props;
  const [employeeDetails, setemployeeDetails] = useState(false);
  const [rms] = useState([]);
  const [profilePictureUpdate, setProfilePictureUpdate] = useState(false);
  const [upic, setUpic] = useState("");
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  useEffect(() => {
    try {
      let endpoint = getAbsoluteURL(`controllers/users/userroles`);
      axios
        .get(endpoint, config)
        .then((response) => {
          if (response.data.code == 200) {
            const transformed = response.data.data.map(({ id, name }) => ({
              value: id,
              label: name,
            }));
            setRoles(transformed);
          } else {
            setRoles([]);
          }
        })
        .catch((error) => {});
    } catch (err) {}
    try {
      let endpoint = getAbsoluteURL(`controllers/department`);
      axios
        .get(endpoint, config)
        .then((response) => {
          if (response.data.code == 200) {
            setDepartments(response.data.data);
          } else {
            setDepartments([]);
          }
        })
        .catch((error) => {});
    } catch (err) {}
    try {
      let endpoint = getAbsoluteURL(`controllers/designation`);
      axios
        .get(endpoint, config)
        .then((response) => {
          if (response.data.code == 200) {
            setDesignations(response.data.data);
          } else {
            setDesignations([]);
          }
        })
        .catch((error) => {});
    } catch (err) {}
  }, []);
  const employeeUpdated = (employeeObj) => {
    setemployeeDetails(Object.assign({}, employeeObj));
  };
  const Name = (fname, mname, lname) => {
    let full_name = "";
    if (typeof fname == "string" && fname.length > 0) full_name += fname;
    if (typeof mname == "string" && mname.length > 0) full_name += " " + mname;
    if (typeof lname == "string" && lname.length > 0) full_name += " " + lname;
    return full_name;
  };
  const dest = (str) => {
    let re = /_/gi;
    return str.replace(re, " ");
  };
  const onDrop = async (acceptedFiles) => {
    let endPoint = getAbsoluteURL(
      "controllers/users/currentUserUpdate?update_type=profile_pic"
    );
    let formData = new FormData();
    formData.append("profile_pic", acceptedFiles[0]);
    setProfilePictureUpdate(true);
    await axios({
      method: "PUT",
      url: endPoint,
      data: formData,
      headers: {
        Authorization: `Bearer ${accesstoken}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        notify({
          success: response.data.code === 200,
          message: response.data.message,
        });
        if (response.data.code === 200) {
          setUpic(Object.assign({}, response.data.data));
        }

        setProfilePictureUpdate(false);
      })
      .catch((error) => {
        //handle error
        let error_msg = "Something went wrong";
        if (error.response) {
          if (error.response.data) {
            error_msg = error.response.data.message;
          }
        }
        notify({ success: false, message: error_msg });
        setProfilePictureUpdate(false);
      });
  };

  let config = {
    headers: {
      Authorization: `Bearer ${accesstoken}`,
    },
  };

  useEffect(() => {
    if (!employeeDetails) {
      try {
        let ep = getAbsoluteURL(`controllers/users/checkUserAvailability`);
        axios
          .get(ep, config)
          .then((response) => {
            let emp = response.data.data;
            if (typeof emp === "object") {
              setemployeeDetails(emp?.employee);
            }
          })
          .catch(() => {
            notify({ success: false, message: "Error in getting employee" });
          });
      } catch (error) {
        notify({ success: false, message: "Something went wrong" });
      }
    }
  }, [employeeDetails]);
  return (
    <>
      <Container>
        <Row className="mb-1">
          <Col sm={12}>
            <Stack direction="horizontal" className="mt-4">
              <Box className="position-relative">
                <CircleLoader
                  isLoading={profilePictureUpdate}
                  size="lg"
                  profile="profile"
                />
                <ProfilePhotoComponent
                  imageUrl={upic ? upic.profile_pic : employeeDetails.profile_pic}
                  size="xxxl"
                  isShadow="no-shadow"
                  onDropFiles={onDrop}
                  user={userAvailable}
                  admins={admins}
                />
              </Box>
              <Box className="ms-4 profileHeader">
                <label className="f-16 mb-2">EMPLOYEE</label>
                <TitleXl
                  className="mb-2 f-500"
                  title={Name(
                    employeeDetails.first_name,
                    employeeDetails.middle_name,
                    employeeDetails.last_name
                  )}
                />
                <label
                  className="f-16 dark-text"
                  style={{ textTransform: "capitalize" }}
                >
                  {employeeDetails?.designation?.name
                    ? dest(employeeDetails?.designation?.name)
                    : "-"}{" "}
                  (
                  {employeeDetails?.department?.name
                    ? dest(employeeDetails?.department?.name)
                    : "-"}
                  )
                </label>
                <br />
                <label className="f-16 mt-2">
                  Joined on {employeeDetails?.joined_date}
                </label>
                <br />
                <label className="f-16 mt-2 ms-1 dark-text">
                  <MailIcon /> {employeeDetails?.work_email} &nbsp;{" "}
                </label>
              </Box>
            </Stack>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Divider className="my-4" />
          </Col>
        </Row>
        <Row className="employee-data">
          <Col sm={12}>
            <Tab.Container id="left-tabs-example" defaultActiveKey="pi">
              <Row>
                <Col xs={2} md={3}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="pi">
                        <span className="d-inline d-md-none">
                          <UserIcon />
                        </span>{" "}
                        <span className="d-none d-md-inline">
                          Personal Info
                        </span>
                      </Nav.Link>
                    </Nav.Item>
                    {/* <Nav.Item>
                      <Nav.Link eventKey="nd">
                        <span className="d-inline d-md-none">
                          <UsersIcon />
                        </span>{" "}
                        <span className="d-none d-md-inline">
                          Nominee Detail
                        </span>
                      </Nav.Link>
                    </Nav.Item> */}
                    <Nav.Item>
                      <Nav.Link eventKey="ec">
                        <span className="d-inline d-md-none">
                          <PhoneIcon />
                        </span>{" "}
                        <span className="d-none d-md-inline">
                          Emergency Contacts
                        </span>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="doc">
                        <span className="d-inline d-md-none">
                          <DocumentIcon />{" "}
                        </span>{" "}
                        <span className="d-none d-md-inline">Documents</span>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="bd">
                        <span className="d-inline d-md-none">
                          <CreditCardIcon />{" "}
                        </span>{" "}
                        <span className="d-none d-md-inline">Bank Details</span>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="edu">
                        <span className="d-inline d-md-none">
                          <BookIcon />{" "}
                        </span>{" "}
                        <span className="d-none d-md-inline">Education</span>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="skill">
                        <span className="d-inline d-md-none">
                          <CodeIcon />{" "}
                        </span>{" "}
                        <span className="d-none d-md-inline">
                          Skills & Cerification
                        </span>
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                      <Nav.Link eventKey="employement_history">
                        <span className="d-inline d-md-none">
                          <CodeIcon />{" "}
                        </span>{" "}
                        <span className="d-none d-md-inline">
                          Employment History
                        </span>
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                      <Nav.Link eventKey="training">
                        <span className="d-inline d-md-none">
                          <CodeIcon />{" "}
                        </span>{" "}
                        <span className="d-none d-md-inline">
                          Training Detail
                        </span>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col xs={10} md={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="pi" className="position-relative">
                      <SubTitle
                        className="d-block d-md-none mb-4"
                        title="Personal Info"
                      />
                      <EmployeeBasicDetail
                        selectedEmployee={employeeDetails}
                        accesstoken={accesstoken}
                        employeeUpdated={employeeUpdated}
                        notify={notify}
                        roles={roles}
                        userRoles={userRoles}
                        loggeduseremail={loggeduseremail}
                        admins={admins}
                        designations={designations}
                        departments={departments}
                        user={userAvailable}
                      />
                    </Tab.Pane>
                    {/* <Tab.Pane eventKey="nd">
                      <SubTitle
                        className="d-block d-md-none mb-4"
                        title="Nominee Detail"
                      />
                      <NomineeDetail
                        selectedEmployee={employeeDetails}
                        accesstoken={accesstoken}
                        rms={rms}
                        employeeUpdated={employeeUpdated}
                        notify={notify}
                        loggeduseremail={loggeduseremail}
                        admins={admins}
                        user={userAvailable}
                      />
                    </Tab.Pane> */}
                    <Tab.Pane eventKey="ec">
                      <SubTitle
                        className="d-block d-md-none mb-4"
                        title="Emergency Contacts"
                      />
                      <EmergencyContactDetails
                        selectedEmployee={employeeDetails}
                        accesstoken={accesstoken}
                        rms={rms}
                        employeeUpdated={employeeUpdated}
                        notify={notify}
                        loggeduseremail={loggeduseremail}
                        userRoles={userRoles}
                        admins={admins}
                        user={userAvailable}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="doc">
                      <SubTitle
                        className="d-block d-md-none mb-4"
                        title="Documents"
                      />
                      <Documents
                        selectedEmployee={employeeDetails}
                        accesstoken={accesstoken}
                        rms={rms}
                        employeeUpdated={employeeUpdated}
                        notify={notify}
                        admins={admins}
                        loggeduseremail={loggeduseremail}
                        user={userAvailable}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="bd">
                      <SubTitle
                        className="d-block d-md-none mb-4"
                        title="Bank Details"
                      />
                      <BankDetails
                        selectedEmployee={employeeDetails}
                        accesstoken={accesstoken}
                        rms={rms}
                        employeeUpdated={employeeUpdated}
                        notify={notify}
                        userRoles={userRoles}
                        admins={admins}
                        loggeduseremail={loggeduseremail}
                        user={userAvailable}
                        
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="edu">
                      <SubTitle
                        className="d-block d-md-none mb-4"
                        title="Education"
                      />
                      <Educations
                        selectedEmployee={employeeDetails}
                        accesstoken={accesstoken}
                        rms={rms}
                        employeeUpdated={employeeUpdated}
                        notify={notify}
                        loggeduseremail={loggeduseremail}
                        admins={admins}
                        user={userAvailable}
                      />
                    </Tab.Pane>

                    <Tab.Pane eventKey="skill">
                      <SubTitle
                        className="d-block d-md-none mb-4"
                        title="Skills & Cerification"
                      />
                      <Skills
                        selectedEmployee={employeeDetails}
                        accesstoken={accesstoken}
                        rms={rms}
                        employeeUpdated={employeeUpdated}
                        notify={notify}
                        admins={admins}
                        loggeduseremail={loggeduseremail}
                        user={userAvailable}
                      />
                    </Tab.Pane>

                    <Tab.Pane eventKey="employement_history">
                      <SubTitle
                        classname="d-block d-md-none mb-4"
                        title=""
                      />
                      <EmploymentHistory
                        selectedEmployee={employeeDetails}
                        accesstoken={accesstoken}
                        rms={rms}
                        employeeUpdated={employeeUpdated}
                        notify={notify}
                        loggeduseremail={loggeduseremail}
                        user={userAvailable}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="training">
                      <SubTitle
                        className="d-block d-md-none mb-4"
                        title="Training Detail"
                      />
                      <TrainingDetail
                        selectedEmployee={employeeDetails}
                        accesstoken={accesstoken}
                        rms={rms}
                        employeeUpdated={employeeUpdated}
                        notify={notify}
                        admins={admins}
                        loggeduseremail={loggeduseremail}
                        user={userAvailable}
                      />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MyProfile;
