import React, { useCallback } from "react";
import { useDropzone } from 'react-dropzone'
import { ac } from "../../lib/helpers";
import CameraIcon from "../Icons/CameraIcon";

function ProfilePhotoComponent(props) {
    const { imageUrl, user, onDropFiles, metaData, size, isShadow, className, admins } = props;
    const onDrop = useCallback(acceptedFiles => {
        onDropFiles(acceptedFiles, metaData);
    }, [onDropFiles, metaData])
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/jpeg,image/png,image/jpg',
        maxFiles: 1,
        init: function () {
            this.hiddenFileInput.removeAttribute('multiple');
        }
    });
    return (
        <>
            <img src={imageUrl ? imageUrl : '/images/avatar.jpg'} className={`avatar ${size ? `${size}` : ``} ${isShadow ? `${isShadow}` : ``}` + (className ? ` ${className}` : "")} />
            {ac(user.roles, "Change profile picture", user.email, admins)&&
                <div {...getRootProps()} className="avatar-upload">
                    <input {...getInputProps()} multiple={false} />
                    <CameraIcon />
                </div>
            }
        </>
    );
}

export default ProfilePhotoComponent;
