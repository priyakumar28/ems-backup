import { React, useState } from "react";
import { Stack } from "react-bootstrap";
import MailIcon from "../Icons/MailIcon";
import Box from "./Box";
import ProfilePhotoComponent from "./ProfilePhotoComponent";
import TitleXl from "./TitleXl";
import CircleLoader from "./CircleLoader";
import getAbsoluteURL from "../../utils/getAbsoluteURL";
import axios from "axios";

function EmployeeProfileHeader(props) {
  const { loggedUser, token, notify } = props;
  const [profilePictureUpdate, setProfilePictureUpdate] = useState(false);
  const [upic, setUpic] = useState(loggedUser);

  const Name = (fname, mname, lname) => {
    return fname + " " + mname + " " + lname;
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
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {

        notify({ success: response.data.code === 200, message: response.data.message });
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
        console.log(error_msg);
        setProfilePictureUpdate(false);
      });
  };

  return (
    <Stack direction="horizontal" className="mt-4 flex-sm-wrap">
      <Box className="position-relative">
        <CircleLoader
          isLoading={profilePictureUpdate}
          size="lg"
          profile="profile"
          className="lg position-absolute"
        />
        <ProfilePhotoComponent
          imageUrl={upic.profile_pic}
          user={loggedUser}
          admins={admins}
          onDropFiles={onDrop}
          size="xxxl"
          isShadow="no-shadow"
        />
      </Box>
      <Box className="ms-sm-4 profileHeader">
        <label className="f-16 mb-2">EMPLOYEE</label>
        <TitleXl
          className="mb-2 f-500"
          title={Name(loggedUser.employee.first_name, loggedUser.employee.middle_name, loggedUser.employee.last_name)}
        />
        <label
          className="f-16 dark-text"
          style={{ textTransform: "capitalize" }}
        >
          {loggedUser.employee?.designation?.name ? dest(loggedUser.employee?.designation?.name) : "-"} (
          {loggedUser.employee?.department?.name ? dest(loggedUser.employee?.department?.name) : "-"})
        </label>
        <br />
        <label className="f-16 mt-2">
          Joined on {loggedUser.employee.joined_date ? loggedUser.employee.joined_date : "unavailable"}
        </label>
        <br />
        <label className="f-16 mt-2 ms-1 dark-text">
          <MailIcon />
          &nbsp; {loggedUser.employee.work_email}
        </label>
      </Box>
    </Stack>
  );
}

export default EmployeeProfileHeader;
