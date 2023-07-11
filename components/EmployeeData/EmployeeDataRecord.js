import React, { useState,useEffect } from "react";
import { Badge, Container, Accordion, Stack } from "react-bootstrap";
import EmergencyContactDetails from "./EmployeeDataRecord/EmergencyContactDetails";
import EmployeeBasicDetail from "./EmployeeDataRecord/EmployeeBasicDetail";
import Documents from "./EmployeeDataRecord/Documents";
import BankDetails from "./EmployeeDataRecord/BankDetails";
import Educations from "./EmployeeDataRecord/Educations";
import Skills from "./EmployeeDataRecord/SkillsAndCertification";
import EmploymentHistory from "./EmployeeDataRecord/EmploymentHistory";
import TrainingDetail from "./EmployeeDataRecord/TrainingDetail";
import getAbsoluteURL from "../../utils/getAbsoluteURL";
import {
  getStatusColor,
  ac
} from "../../lib/helpers";
import axios from "axios";
import NomineeDetails from "./EmployeeDataRecord/NomineeDetails";
import UserIcon from "../Icons/UserIcon";
import UsersIcon from "../Icons/UsersIcon";
import PhoneIcon from "../Icons/PhoneIcon";
import DocumentIcon from "../Icons/DocumentIcon";
import CreditCardIcon from "../Icons/CreditCardIcon";
import BookIcon from "../Icons/BookIcon";
import CodeIcon from "../Icons/CodeIcon";
import ActivityIcon from "../Icons/ActivityIcon";
import BookOpenIcon from "../Icons/BookOpenIcon";
import DataSetContainer from "../Shared/DataSetContainer";
import Box from "../Shared/Box";
import CircleLoader from "../Shared/CircleLoader";
import ProfilePhotoComponent from "../Shared/ProfilePhotoComponent";
import EmsModal from "../Shared/EmsModal";
import EmsModalHeader from "../Shared/EmsModalHeader";
import EmsModalClose from "../Shared/EmsModalClose";
import Span from "../Shared/Span";
import EmsModalBody from "../Shared/EmsModalBody";
import P from "../Shared/P";

function EmployeeDataRecord(props) {
  const {
    selectedEmployee,
    accesstoken,
    employeeUpdated,
    notify,
    showEDR,
    setshowEDR,
    setemployeeId,
    userRoles,
    loggeduseremail,
    admins,
    user
  } = props;


  const [profilePictureUpdate, setProfilePictureUpdate] = useState(false);
  const onDrop = (acceptedFiles, selectedEmployeee) => {
    let formData = new FormData();
    formData.append("profile_pic", acceptedFiles[0]);
    let endPoint = getAbsoluteURL(
      `controllers/employees/profilePicUpdate?id=${selectedEmployeee?.id}`
    );
    setProfilePictureUpdate(true);
    axios({
      method: "PUT",
      url: endPoint,
      data: formData,
      headers: {
        Authorization: `Bearer ${accesstoken}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        // handle success
        if (response.status === 200) {
          employeeUpdated(response.data.data);
        }
        notify({
          success: response.status === 200,
          message: response.data.message,
        });
        setProfilePictureUpdate(false);
      })
      .catch(() => {
        notify({
          success: false,
          message: "Error in updating profile picture",
        });
        setProfilePictureUpdate(false);
      });
  };
  const closeMenuRight = (e) => {
    e.preventDefault();
    document.body.classList.remove("hidden");
    setshowEDR(false);
    setemployeeId(false);
  };
  return (
    <EmsModal className={`${showEDR ? "show fade" : ""}`}>
      <EmsModalHeader>
        <Stack direction="horizontal" className="align-items-center">
          <Box className={`position-relative `}>
            <CircleLoader
              isLoading={profilePictureUpdate}
              size="xs"
              profile="profile"
            />
            <ProfilePhotoComponent
              imageUrl={selectedEmployee.profile_pic}
              onDropFiles={onDrop}
              metaData={selectedEmployee}
              user={user}
              admins={admins}
              size="lg"
              isShadow="no-shadow"
            />
          </Box>
          <Span className="ms-2 ms-sm-3">
            <h6
              className="mb-0"
              style={{ lineHeight: "1", alignItems: "center", display: "flex" }}
            >
              {`${selectedEmployee.first_name} ${selectedEmployee.last_name}`}
              <Badge bg="secondary" className="ms-2">
                {selectedEmployee.employee_id}
              </Badge>
              <Badge
                bg={getStatusColor(selectedEmployee.status)}
                className="ms-2"
              >
                {selectedEmployee.status}
              </Badge>
            </h6>
            <P className="secondary-text-label mb-0">
              {selectedEmployee?.department?.name} -{" "}
              <br className="d-sm-none" />{" "}
              {selectedEmployee?.designation?.name}
            </P>
          </Span>
        </Stack>
        <EmsModalClose isClose={closeMenuRight} />
      </EmsModalHeader>
      {showEDR && (
        <EmsModalBody className="p-sm-3 py-3">
          <DataSetContainer className="mt-1">
            <Container>
              <Accordion>
                <Accordion.Item eventKey="employee_detail">
                  <Accordion.Header>
                    <UserIcon /> &nbsp; Basic Detail
                  </Accordion.Header>
                  <Accordion.Body className="position-relative">
                    <EmployeeBasicDetail {...props} />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="NomineeDetail">
                  <Accordion.Header>
                    <UsersIcon /> &nbsp; Nominee Details{" "}
                  </Accordion.Header>
                  <Accordion.Body className="position-relative">
                    {ac(userRoles, "View nominee details", loggeduseremail, admins) ? <NomineeDetails {...props} /> : "You don\'t have permission to view"}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="EmergencyContact">
                  <Accordion.Header>
                    <PhoneIcon /> &nbsp; Emergency Contacts
                  </Accordion.Header>
                  <Accordion.Body className="position-relative">
                    {ac(userRoles, "View emergency contacts", loggeduseremail, admins) ? <EmergencyContactDetails {...props} /> : "You don\'t have permission to view"}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="documents">
                  <Accordion.Header>
                    <DocumentIcon /> &nbsp; Documents
                  </Accordion.Header>
                  <Accordion.Body className="position-relative">
                    {ac(userRoles, "View documents", loggeduseremail, admins) ? <Documents {...props} /> : "You don\'t have permission to view"}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="bank-details">
                  <Accordion.Header>
                    <CreditCardIcon /> &nbsp; Bank Details
                  </Accordion.Header>
                  <Accordion.Body className="position-relative">
                    {ac(userRoles, "View bank details", loggeduseremail, admins) ? <BankDetails {...props} /> : "You don\'t have permission to view"}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="educations">
                  <Accordion.Header>
                    <BookIcon />
                    &nbsp; Educations
                  </Accordion.Header>
                  <Accordion.Body>
                    {ac(userRoles, "View educations", loggeduseremail, admins) ? <Educations {...props} /> : "You don\'t have permission to view"}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="skills">
                  <Accordion.Header>
                    <CodeIcon /> &nbsp; Skills & Certifications
                  </Accordion.Header>
                  <Accordion.Body className="position-relative">
                    {ac(userRoles, "View skills & certifications", loggeduseremail, admins) ? <Skills {...props} /> : "You don\'t have permission to view"}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="employment-history">
                  <Accordion.Header>
                    <ActivityIcon /> &nbsp; Employment history{" "}
                  </Accordion.Header>
                  <Accordion.Body>
                    {ac(userRoles, "View employment history", loggeduseremail, admins) ? <EmploymentHistory {...props} /> : "You don\'t have permission to view"}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                  <Accordion.Header>
                    <BookOpenIcon /> &nbsp; Trainings
                  </Accordion.Header>
                  <Accordion.Body>
                    {ac(userRoles, "View trainings", loggeduseremail, admins) ? <TrainingDetail {...props} /> : "You don\'t have permission to view"}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Container>
          </DataSetContainer>
        </EmsModalBody>
      )}
    </EmsModal>
  );
}

export default EmployeeDataRecord;
