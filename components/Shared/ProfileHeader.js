import { React, useState } from "react";
import { Stack } from "react-bootstrap";
import MailIcon from "../Icons/MailIcon";
import Box from "./Box";
import ProfilePhotoComponent from "./ProfilePhotoComponent";
import TitleXl from "./TitleXl";
import CircleLoader from "./CircleLoader";
import getAbsoluteURL from "../../utils/getAbsoluteURL";
import axios from "axios";

function ProfileHeader(props) {
    const { user, token, notify } = props;
    const [profilePictureUpdate, setProfilePictureUpdate] = useState(false);
    const [upic, setUpic] = useState(user);

    const Name = (fname, mname, lname) => {
        return fname + " " + mname + " " + lname;
    }

    const dest = (str) => {
        let re = /_/gi;
        return str.replace(re, " ");
    }

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
                    setUpic(Object.assign({}, response.data.data))
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

    return (
        <Stack direction='horizontal' className='mt-4'>
            <Box className="position-relative">
                <CircleLoader
                    isLoading={profilePictureUpdate}
                    size="lg"
                    profile="profile"
                    className='lg position-absolute'
                />
                <ProfilePhotoComponent imageUrl={upic.profile_pic} user={user} onDropFiles={onDrop} size='xxxl' isShadow='no-shadow' />
            </Box>
            <Box className='ms-4 profileHeader'>
                <label className='f-16 mb-2'>EMPLOYEE</label>
                <TitleXl className='mb-2 f-500' title={Name(user.first_name, user.middle_name, user.last_name)} />
                <label className='f-16 dark-text' style={{ textTransform: 'capitalize' }}>{user?.designation?.name ? dest(user?.designation?.name) : '-'} ({user?.department?.name ? dest(user?.department?.name) : '-'})</label><br />
                <label className='f-16 mt-2'>Joined on {user.joined_date ? user.joined_date : 'unavailable'}</label><br />
                <label className='f-16 mt-2 ms-1 dark-text'><MailIcon />&nbsp; {user.work_email}</label>
            </Box>
        </Stack>
    );
}

export default ProfileHeader;
