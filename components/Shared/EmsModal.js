import React from "react";

function EmsModal(props) {
    const {
        className,
        children,
        ...otherProps
    } = props;

    return (
        <div
            className={
                "ems_Right_Modal_Popup" +
                (className ? ` ${className}` : "")
            }
            {...otherProps}
        >
            {props.children}
        </div>
    );
}

export default EmsModal;