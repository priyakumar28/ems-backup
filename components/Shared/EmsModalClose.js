import React from "react";
import CloseLgIcon from "../Icons/CloseLgIcon";


function EmsModalClose(props) {
    const {
        isClose
    } = props;

    return (
        <span className='close-modal' onClick={isClose} alt="close"><CloseLgIcon /></span>
    );
}

export default EmsModalClose;