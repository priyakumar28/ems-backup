import { React, useState } from "react";
import { Stack } from "react-bootstrap";
import Box from "./Box";
import ProfilePhotoComponent from "./ProfilePhotoComponent";
import TitleXl from "./TitleXl";
import CircleLoader from "./CircleLoader";
import getAbsoluteURL from "../../utils/getAbsoluteURL";
import axios from "axios";
import { capitalizeFirstLetter } from "../../lib/helpers";

function UserProfileHeader(props) {
    const { user, token, notify, admins } = props;
    const [profilePictureUpdate, setProfilePictureUpdate] = useState(false);
    const [upic, setUpic] = useState(user);

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
        <Stack direction='horizontal' className='mt-4 flex-sm-wrap'>
            <Box className="position-relative">
                <CircleLoader
                    isLoading={profilePictureUpdate}
                    size="lg"
                    profile="profile"
                    className='lg position-absolute'
                />
                <ProfilePhotoComponent imageUrl={upic.profile_pic} user={user} admins={admins} onDropFiles={onDrop} size='xxxl' isShadow='no-shadow' />
            </Box>
            <Box className='ms-sm-4 profileHeader'>
                <TitleXl className='mb-2 f-500' title={capitalizeFirstLetter(user.username)} />
                <label className='f-16 dark-text' style={{ textTransform: 'capitalize' }}>{user.user_level}</label><br />
                <label className='f-16 mt-2'>Joined on {user.created ? user.created : ''}</label><br />
            </Box>
        </Stack>
    );
}

export default UserProfileHeader;
