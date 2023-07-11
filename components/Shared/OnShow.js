import React from "react";
import CloseLgIcon from "../Icons/CloseLgIcon";


function OnShow(props) {
    const {isOpen} = props;
    return (
        <span className='close-modal' onClick={isOpen}><CloseLgIcon /></span>
    );
}

export default OnShow;